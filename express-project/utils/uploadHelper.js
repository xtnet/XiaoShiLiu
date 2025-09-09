const axios = require('axios');
const https = require('https');
const fs = require('fs');
const path = require('path');
const { HTTP_STATUS, RESPONSE_CODES } = require('../constants');
const config = require('../config/config');
const crypto = require('crypto');

/**
 * 保存文件到本地
 * @param {Buffer} fileBuffer - 文件缓冲区
 * @param {string} filename - 文件名
 * @returns {Promise<{success: boolean, url?: string, message?: string}>}
 */
async function saveToLocal(fileBuffer, filename) {
  try {
    // 确保上传目录存在
    const uploadDir = path.join(process.cwd(), config.upload.local.uploadDir);
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    // 生成唯一文件名
    const ext = path.extname(filename);
    const hash = crypto.createHash('md5').update(fileBuffer).digest('hex');
    const uniqueFilename = `${Date.now()}_${hash}${ext}`;
    const filePath = path.join(uploadDir, uniqueFilename);

    // 保存文件
    fs.writeFileSync(filePath, fileBuffer);

    // 返回访问URL
    const url = `${config.upload.local.baseUrl}/${config.upload.local.uploadDir}/${uniqueFilename}`;
    return {
      success: true,
      url: url
    };
  } catch (error) {
    console.error('❌ 本地保存失败:', error.message);
    return {
      success: false,
      message: error.message || '本地保存失败'
    };
  }
}

/**
 * 上传文件到图床
 * @param {Buffer} fileBuffer - 文件缓冲区
 * @param {string} filename - 文件名
 * @param {string} mimetype - 文件MIME类型
 * @returns {Promise<{success: boolean, url?: string, message?: string}>}
 */
async function uploadToImageHost(fileBuffer, filename, mimetype) {
  try {
    // 构建multipart/form-data请求体
    const boundary = `----formdata-${Date.now()}`;

    const formDataBody = Buffer.concat([
      Buffer.from(`--${boundary}\r\n`),
      Buffer.from(`Content-Disposition: form-data; name="file"; filename="${filename}"\r\n`),
      Buffer.from(`Content-Type: ${mimetype}\r\n\r\n`),
      fileBuffer,
      Buffer.from(`\r\n--${boundary}--\r\n`)
    ]);

    // 上传到图床
    const response = await axios.post(config.upload.imagehost.apiUrl, formDataBody, {
      headers: {
        'Content-Type': `multipart/form-data; boundary=${boundary}`,
        'Content-Length': formDataBody.length
      },
      timeout: config.upload.imagehost.timeout,
      httpsAgent: new https.Agent({
        rejectUnauthorized: false
      })
    });

    if (response.data && response.data.errno === 0 && response.data.data && response.data.data.url) {
      const imageUrl = response.data.data.url.trim().replace(/\`/g, '').replace(/\s+/g, '');
      return {
        success: true,
        url: imageUrl
      };
    } else {
      console.log('❌ 图床返回错误:', response.data);
      return {
        success: false,
        message: '图床上传失败'
      };
    }
  } catch (error) {
    console.error('❌ 图床上传失败:', error.message);
    return {
      success: false,
      message: error.message || '图床上传失败'
    };
  }
}

/**
 * 从base64数据上传到图床
 * @param {string} base64Data - base64格式的图片数据
 * @returns {Promise<{success: boolean, url?: string, message?: string}>}
 */
async function uploadBase64ToImageHost(base64Data) {
  try {
    // 验证base64格式
    if (!base64Data || typeof base64Data !== 'string' || !base64Data.startsWith('data:image/')) {
      return {
        success: false,
        message: '无效的base64数据'
      };
    }

    // 解析base64数据
    const matches = base64Data.match(/^data:image\/([a-zA-Z]+);base64,(.+)$/);
    if (!matches) {
      return {
        success: false,
        message: 'base64格式不正确'
      };
    }

    const imageType = matches[1];
    const imageBuffer = Buffer.from(matches[2], 'base64');

    // 检查文件大小（5MB限制）
    if (imageBuffer.length > 5 * 1024 * 1024) {
      return {
        success: false,
        message: '图片大小超过5MB限制'
      };
    }

    const filename = `image_${Date.now()}_${Math.random().toString(36).substr(2, 9)}.${imageType}`;
    const mimetype = `image/${imageType}`;

    return await uploadToImageHost(imageBuffer, filename, mimetype);
  } catch (error) {
    console.error('❌ Base64图片上传失败:', error.message);
    return {
      success: false,
      message: error.message || 'Base64图片上传失败'
    };
  }
}

/**
 * 从文件路径上传到图床
 * @param {string} filePath - 文件路径
 * @param {string} originalname - 原始文件名
 * @param {string} mimetype - 文件MIME类型
 * @param {boolean} deleteAfterUpload - 上传后是否删除本地文件
 * @returns {Promise<{success: boolean, url?: string, message?: string}>}
 */
async function uploadFileToImageHost(filePath, originalname, mimetype, deleteAfterUpload = true) {
  try {
    // 读取文件
    const fileBuffer = fs.readFileSync(filePath);
    const filename = originalname || path.basename(filePath);

    const result = await uploadToImageHost(fileBuffer, filename, mimetype);

    // 上传成功后删除本地文件
    if (result.success && deleteAfterUpload && fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    return result;
  } catch (error) {
    console.error('❌ 图片上传失败:', error.message);
    // 确保删除临时文件
    if (deleteAfterUpload && fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
    return {
      success: false,
      message: error.message || '图片上传失败'
    };
  }
}

/**
 * 管理员权限验证中间件
 * @param {Object} req - 请求对象
 * @param {Object} res - 响应对象
 * @param {Function} next - 下一个中间件函数
 */
function adminAuth(req, res, next) {
  const { authenticateToken } = require('../middleware/auth');

  authenticateToken(req, res, (err) => {
    if (err) {
      return res.status(HTTP_STATUS.UNAUTHORIZED).json({
        code: RESPONSE_CODES.UNAUTHORIZED,
        message: '认证失败'
      });
    }

    if (!req.user.type || req.user.type !== 'admin') {
      return res.status(HTTP_STATUS.FORBIDDEN).json({
        code: RESPONSE_CODES.FORBIDDEN,
        message: '权限不足，需要管理员权限'
      });
    }

    next();
  });
}

/**
 * 统一上传接口 - 根据配置选择上传策略
 * @param {Buffer} fileBuffer - 文件缓冲区
 * @param {string} filename - 文件名
 * @param {string} mimetype - 文件MIME类型
 * @returns {Promise<{success: boolean, url?: string, message?: string}>}
 */
async function uploadFile(fileBuffer, filename, mimetype) {
  const strategy = config.upload.strategy;
  
  if (strategy === 'local') {
    return await saveToLocal(fileBuffer, filename);
  } else if (strategy === 'imagehost') {
    return await uploadToImageHost(fileBuffer, filename, mimetype);
  } else {
    return {
      success: false,
      message: '未知的上传策略'
    };
  }
}

/**
 * 统一base64上传接口
 * @param {string} base64Data - base64格式的图片数据
 * @returns {Promise<{success: boolean, url?: string, message?: string}>}
 */
async function uploadBase64(base64Data) {
  try {
    // 验证base64格式
    if (!base64Data || typeof base64Data !== 'string' || !base64Data.startsWith('data:image/')) {
      return {
        success: false,
        message: '无效的base64数据'
      };
    }

    // 解析base64数据
    const matches = base64Data.match(/^data:image\/([a-zA-Z]+);base64,(.+)$/);
    if (!matches) {
      return {
        success: false,
        message: 'base64格式不正确'
      };
    }

    const imageType = matches[1];
    const imageBuffer = Buffer.from(matches[2], 'base64');

    // 检查文件大小（5MB限制）
    if (imageBuffer.length > 5 * 1024 * 1024) {
      return {
        success: false,
        message: '图片大小超过5MB限制'
      };
    }

    const filename = `image_${Date.now()}_${Math.random().toString(36).substr(2, 9)}.${imageType}`;
    const mimetype = `image/${imageType}`;

    return await uploadFile(imageBuffer, filename, mimetype);
  } catch (error) {
    console.error('❌ base64上传失败:', error.message);
    return {
      success: false,
      message: error.message || 'base64上传失败'
    };
  }
}

module.exports = {
  uploadToImageHost,
  uploadBase64ToImageHost,
  uploadFileToImageHost,
  saveToLocal,
  uploadFile,
  uploadBase64,
  adminAuth
};