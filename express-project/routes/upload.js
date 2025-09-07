const express = require('express');
const router = express.Router();
const { HTTP_STATUS, RESPONSE_CODES } = require('../constants');
const multer = require('multer');
const { authenticateToken } = require('../middleware/auth');
const { uploadToImageHost, uploadBase64ToImageHost } = require('../utils/uploadHelper');

// 配置 multer 内存存储（用于云端图床）
const storage = multer.memoryStorage();

// 文件过滤器
const fileFilter = (req, file, cb) => {
  // 检查文件类型
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('只允许上传图片文件'), false);
  }
};

// 配置 multer
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB 限制
  }
});

// 单图片上传到图床
router.post('/single', authenticateToken, upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(HTTP_STATUS.BAD_REQUEST).json({ code: RESPONSE_CODES.VALIDATION_ERROR, message: '没有上传文件' });
    }

    // 直接使用图床上传函数（传入buffer数据）
    const result = await uploadToImageHost(
      req.file.buffer,
      req.file.originalname,
      req.file.mimetype
    );

    if (result.success) {
      // 记录用户上传操作日志
      console.log(`单图片上传成功 - 用户ID: ${req.user.id}, 文件名: ${req.file.originalname}`);

      res.json({
        code: RESPONSE_CODES.SUCCESS,
        message: '上传成功',
        data: {
          originalname: req.file.originalname,
          size: req.file.size,
          url: result.url
        }
      });
    } else {
      res.status(HTTP_STATUS.BAD_REQUEST).json({ code: RESPONSE_CODES.VALIDATION_ERROR, message: result.message || '图床上传失败' });
    }
  } catch (error) {
    console.error('单图片上传失败:', error);
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ code: RESPONSE_CODES.ERROR, message: '上传失败' });
  }
});

// 多图片上传到图床
router.post('/multiple', authenticateToken, upload.array('files', 9), async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(HTTP_STATUS.BAD_REQUEST).json({ code: RESPONSE_CODES.VALIDATION_ERROR, message: '没有上传文件' });
    }

    const uploadResults = [];
    
    for (const file of req.files) {
      const result = await uploadToImageHost(
        file.buffer,
        file.originalname,
        file.mimetype
      );
      
      if (result.success) {
        uploadResults.push({
          originalname: file.originalname,
          size: file.size,
          url: result.url
        });
      }
    }

    if (uploadResults.length === 0) {
      return res.status(HTTP_STATUS.BAD_REQUEST).json({ code: RESPONSE_CODES.VALIDATION_ERROR, message: '所有图片上传失败' });
    }

    // 记录用户上传操作日志
    console.log(`多图片上传成功 - 用户ID: ${req.user.id}, 文件数量: ${uploadResults.length}`);

    res.json({
      code: RESPONSE_CODES.SUCCESS,
      message: '上传成功',
      data: uploadResults
    });
  } catch (error) {
    console.error('多图片上传失败:', error);
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ code: RESPONSE_CODES.ERROR, message: '上传失败' });
  }
});

// Base64图片上传到图床
router.post('/base64', authenticateToken, async (req, res) => {
  try {
    const { images } = req.body;

    if (!images || !Array.isArray(images) || images.length === 0) {
      return res.status(HTTP_STATUS.BAD_REQUEST).json({ code: RESPONSE_CODES.VALIDATION_ERROR, message: '没有提供图片数据' });
    }

    const uploadResults = [];
    let processedCount = 0;

    for (const base64Data of images) {
      processedCount++;

      // 使用通用上传函数
      const result = await uploadBase64ToImageHost(base64Data);

      if (result.success) {
        uploadResults.push(result.url);
      }
    }

    if (uploadResults.length === 0) {
      return res.status(HTTP_STATUS.BAD_REQUEST).json({ code: RESPONSE_CODES.VALIDATION_ERROR, message: '所有图片上传失败' });
    }

    // 记录用户上传操作日志
    console.log(`Base64图片上传成功 - 用户ID: ${req.user.id}, 上传数量: ${uploadResults.length}`);

    res.json({
      code: RESPONSE_CODES.SUCCESS,
      message: '上传成功',
      data: {
        urls: uploadResults,
        count: uploadResults.length
      }
    });
  } catch (error) {
    console.error('Base64图片上传失败:', error);
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ code: RESPONSE_CODES.ERROR, message: '上传失败' });
  }
});

// 注意：使用云端图床后，文件删除由图床服务商管理

// 错误处理中间件
router.use((error, req, res, next) => {
  if (error instanceof multer.MulterError) {
    if (error.code === 'LIMIT_FILE_SIZE') {
      return res.status(HTTP_STATUS.BAD_REQUEST).json({ code: RESPONSE_CODES.VALIDATION_ERROR, message: '文件大小超过限制（5MB）' });
    }
    if (error.code === 'LIMIT_FILE_COUNT') {
      return res.status(HTTP_STATUS.BAD_REQUEST).json({ code: RESPONSE_CODES.VALIDATION_ERROR, message: '文件数量超过限制（9个）' });
    }
  }

  if (error.message === '只允许上传图片文件') {
    return res.status(HTTP_STATUS.BAD_REQUEST).json({ code: RESPONSE_CODES.VALIDATION_ERROR, message: error.message });
  }

  console.error('图片上传错误:', error);
  res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ code: RESPONSE_CODES.ERROR, message: '图片上传失败' });
});

module.exports = router;