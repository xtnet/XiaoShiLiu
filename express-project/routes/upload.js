const express = require('express');
const router = express.Router();
const { HTTP_STATUS, RESPONSE_CODES } = require('../constants');
const multer = require('multer');
const { authenticateToken } = require('../middleware/auth');
const { uploadFile, uploadVideo } = require('../utils/uploadHelper');
const config = require('../config/config');

// 将如 '10mb' 转换为字节
function parseSizeToBytes(sizeStr) {
  if (typeof sizeStr === 'number') return sizeStr;
  if (!sizeStr || typeof sizeStr !== 'string') return undefined;
  const match = sizeStr.toLowerCase().match(/^(\d+(?:\.\d+)?)(b|kb|mb|gb)?$/);
  if (!match) return undefined;
  const value = parseFloat(match[1]);
  const unit = match[2] || 'b';
  const map = { b: 1, kb: 1024, mb: 1024 * 1024, gb: 1024 * 1024 * 1024 };
  return Math.floor(value * (map[unit] || 1));
}

// 配置 multer 内存存储（与本地保存配合使用）
const storage = multer.memoryStorage();

// 文件过滤器 - 图片（依据集中配置）
const imageFileFilter = (req, file, cb) => {
  const allowedTypes = config.upload.image.allowedTypes || [];
  if (allowedTypes.length > 0 ? allowedTypes.includes(file.mimetype) : file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('只允许上传图片文件'), false);
  }
};

// 文件过滤器 - 视频（依据集中配置）
const videoFileFilter = (req, file, cb) => {
  const allowedTypes = config.upload.video.allowedTypes || [];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('只允许上传视频文件'), false);
  }
};

// 配置 multer - 图片
const upload = multer({
  storage: storage,
  fileFilter: imageFileFilter,
  limits: {
    fileSize: parseSizeToBytes(config.upload.image.maxSize) || 5 * 1024 * 1024
  }
});

// 配置 multer - 视频
// 混合文件过滤器（支持视频和图片）
const mixedFileFilter = (req, file, cb) => {
  if (file.fieldname === 'file') {
    // 视频文件验证
    if (config.upload.video.allowedTypes?.includes(file.mimetype) || file.mimetype.startsWith('video/')) {
      cb(null, true);
    } else {
      cb(new Error('只支持视频文件'), false);
    }
  } else if (file.fieldname === 'thumbnail') {
    // 缩略图文件验证
    if (config.upload.image.allowedTypes?.includes(file.mimetype) || file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('缩略图只支持图片文件'), false);
    }
  } else {
    cb(new Error('不支持的文件字段'), false);
  }
};

const videoUpload = multer({
  storage: storage,
  fileFilter: mixedFileFilter, // 使用混合文件过滤器
  limits: {
    fileSize: parseSizeToBytes(config.upload.video.maxSize) || 100 * 1024 * 1024
  }
});

// 单图片上传
router.post('/single', authenticateToken, upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(HTTP_STATUS.BAD_REQUEST).json({ code: RESPONSE_CODES.VALIDATION_ERROR, message: '没有上传文件' });
    }

    // 使用统一上传函数（本地保存）
    const result = await uploadFile(
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
      res.status(HTTP_STATUS.BAD_REQUEST).json({ code: RESPONSE_CODES.VALIDATION_ERROR, message: result.message || '上传失败' });
    }
  } catch (error) {
    console.error('单图片上传失败:', error);
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ code: RESPONSE_CODES.ERROR, message: '上传失败' });
  }
});

// 多图片上传
router.post('/multiple', authenticateToken, upload.array('files', config.upload.image.maxCount || 9), async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(HTTP_STATUS.BAD_REQUEST).json({ 
        success: false, 
        data: null, 
        message: '没有上传文件' 
      });
    }

    const uploadResults = [];
    const errors = [];

    for (const file of req.files) {
      const result = await uploadFile(
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
      } else {
        errors.push({ file: file.originalname, error: result.message });
      }
    }

    if (uploadResults.length === 0) {
      return res.status(HTTP_STATUS.BAD_REQUEST).json({ 
        success: false, 
        data: null, 
        message: '所有图片上传失败' 
      });
    }

    // 记录用户上传操作日志
    console.log(`多图片上传成功 - 用户ID: ${req.user.id}, 文件数量: ${uploadResults.length}`);

    res.json({
      success: true,
      data: {
        uploaded: uploadResults,
        errors,
        total: req.files.length,
        successCount: uploadResults.length,
        errorCount: errors.length
      },
      message: errors.length === 0 ? '所有图片上传成功' : `${uploadResults.length}张上传成功，${errors.length}张失败`
    });
  } catch (error) {
    console.error('多图片上传失败:', error);
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ 
      success: false, 
      data: null, 
      message: '上传失败' 
    });
  }
});

// 单视频上传
router.post('/video', authenticateToken, videoUpload.fields([
  { name: 'file', maxCount: 1 },
  { name: 'thumbnail', maxCount: 1 }
]), async (req, res) => {
  try {
    if (!req.files || !req.files.file || !req.files.file[0]) {
      return res.status(HTTP_STATUS.BAD_REQUEST).json({ 
        code: RESPONSE_CODES.VALIDATION_ERROR, 
        message: '没有上传视频文件' 
      });
    }

    const videoFile = req.files.file[0];
    const thumbnailFile = req.files.thumbnail ? req.files.thumbnail[0] : null;

    console.log(`视频上传开始 - 用户ID: ${req.user.id}, 视频文件: ${videoFile.originalname}`);
    if (thumbnailFile) {
      console.log(`包含前端生成的缩略图: ${thumbnailFile.originalname}`);
    }

    // 上传视频文件
    const uploadResult = await uploadVideo(
      videoFile.buffer,
      videoFile.originalname,
      videoFile.mimetype
    );

    if (!uploadResult.success) {
      return res.status(HTTP_STATUS.BAD_REQUEST).json({ 
        code: RESPONSE_CODES.VALIDATION_ERROR, 
        message: uploadResult.message || '视频上传失败' 
      });
    }

    let coverUrl = null;

    // 优先使用前端生成的缩略图
    if (thumbnailFile) {
      try {
        console.log('使用前端生成的缩略图');
        const thumbnailUploadResult = await uploadFile(
          thumbnailFile.buffer,
          thumbnailFile.originalname,
          thumbnailFile.mimetype
        );
        
        if (thumbnailUploadResult.success) {
          coverUrl = thumbnailUploadResult.url;
          console.log('前端缩略图上传成功:', coverUrl);
        } else {
          console.warn('前端缩略图上传失败:', thumbnailUploadResult.message);
        }
      } catch (error) {
        console.warn('前端缩略图处理失败:', error.message);
      }
    }


    // 记录用户上传操作日志
    console.log(`视频上传成功 - 用户ID: ${req.user.id}, 文件名: ${videoFile.originalname}, 缩略图: ${coverUrl ? '有' : '无'}`);

    res.json({
      code: RESPONSE_CODES.SUCCESS,
      message: '上传成功',
      data: {
        originalname: videoFile.originalname,
        size: videoFile.size,
        url: uploadResult.url,
        filePath: uploadResult.filePath,
        coverUrl: coverUrl
      }
    });
  } catch (error) {
    console.error('视频上传失败:', error);
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ 
      code: RESPONSE_CODES.ERROR, 
      message: '上传失败' 
    });
  }
});

// 提示：如有文件删除需求，请实现对应的本地删除逻辑

// 错误处理中间件
router.use((error, req, res, next) => {
  if (error instanceof multer.MulterError) {
    if (error.code === 'LIMIT_FILE_SIZE') {
      return res.status(HTTP_STATUS.BAD_REQUEST).json({ code: RESPONSE_CODES.VALIDATION_ERROR, message: '文件大小超过限制' });
    }
    if (error.code === 'LIMIT_UNEXPECTED_FILE') { // 原本使用LIMIT_FILE_COUNT
      return res.status(HTTP_STATUS.BAD_REQUEST).json({ code: RESPONSE_CODES.VALIDATION_ERROR, message: '文件数量超过限制' });
    }
  }

  if (error.message === '只允许上传图片文件' || error.message === '只允许上传视频文件') {
    return res.status(HTTP_STATUS.BAD_REQUEST).json({ code: RESPONSE_CODES.VALIDATION_ERROR, message: error.message });
  }

  console.error('文件上传错误:', error);
  res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ code: RESPONSE_CODES.ERROR, message: '文件上传失败' });
});

module.exports = router;