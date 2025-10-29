const fs = require('fs');
const path = require('path');
const { HTTP_STATUS, RESPONSE_CODES } = require('../constants');
const config = require('../config/config');
const crypto = require('crypto');

/**
 * 保存图片文件到本地
 * @param {Buffer} fileBuffer - 文件缓冲区
 * @param {string} filename - 文件名
 * @returns {Promise<{success: boolean, url?: string, message?: string}>}
 */
async function saveImageToLocal(fileBuffer, filename) {
  try {
    // 确保上传目录存在
    const uploadDir = path.join(process.cwd(), config.upload.image.local.uploadDir);
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    // 计算MD5并构造目标文件名（md5.扩展名）
    const ext = (path.extname(filename) || '').toLowerCase();
    const hash = crypto.createHash('md5').update(fileBuffer).digest('hex');

    // 去重：若已存在相同MD5的文件（任意扩展名），直接复用
    const existing = fs.readdirSync(uploadDir).find(f => f.startsWith(`${hash}.`));
    const finalFilename = existing || `${hash}${ext}`;
    const filePath = path.join(uploadDir, finalFilename);

    // 若不存在则写入
    if (!existing) {
      fs.writeFileSync(filePath, fileBuffer);
    }

    // 返回访问URL
    const url = `${config.upload.image.local.baseUrl}/${config.upload.image.local.uploadDir}/${finalFilename}`;
    return {
      success: true,
      url: url
    };
  } catch (error) {
    console.error('❌ 图片本地保存失败:', error.message);
    return {
      success: false,
      message: error.message || '图片本地保存失败'
    };
  }
}

/**
 * 保存视频文件到本地
 * @param {Buffer} fileBuffer - 文件缓冲区
 * @param {string} filename - 文件名
 * @returns {Promise<{success: boolean, url?: string, message?: string}>}
 */
async function saveVideoToLocal(fileBuffer, filename) {
  try {
    // 确保上传目录存在
    const uploadDir = path.join(process.cwd(), config.upload.video.local.uploadDir);
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    // 计算MD5并构造目标文件名（md5.扩展名）
    const ext = (path.extname(filename) || '').toLowerCase();
    const hash = crypto.createHash('md5').update(fileBuffer).digest('hex');

    // 去重：若已存在相同MD5的文件（任意扩展名），直接复用
    const existing = fs.readdirSync(uploadDir).find(f => f.startsWith(`${hash}.`));
    const finalFilename = existing || `${hash}${ext}`;
    const filePath = path.join(uploadDir, finalFilename);

    // 若不存在则写入
    if (!existing) {
      fs.writeFileSync(filePath, fileBuffer);
    }

    // 返回访问URL和文件路径
    const url = `${config.upload.video.local.baseUrl}/${config.upload.video.local.uploadDir}/${finalFilename}`;
    return {
      success: true,
      url: url,
      filePath: filePath
    };
  } catch (error) {
    console.error('❌ 视频本地保存失败:', error.message);
    return {
      success: false,
      message: error.message || '视频本地保存失败'
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
/**
 * 上传图片文件
 * @param {Buffer} fileBuffer - 文件缓冲区
 * @param {string} filename - 文件名
 * @param {string} mimetype - 文件MIME类型
 * @returns {Promise<{success: boolean, url?: string, message?: string}>}
 */
async function uploadImage(fileBuffer, filename, mimetype) {
  return await saveImageToLocal(fileBuffer, filename);
}

/**
 * 上传视频文件
 * @param {Buffer} fileBuffer - 文件缓冲区
 * @param {string} filename - 文件名
 * @param {string} mimetype - 文件MIME类型
 * @returns {Promise<{success: boolean, url?: string, filePath?: string, message?: string}>}
 */
async function uploadVideo(fileBuffer, filename, mimetype) {
  return await saveVideoToLocal(fileBuffer, filename);
}

// 保持向后兼容的旧函数
async function uploadFile(fileBuffer, filename, mimetype) {
  // 根据文件类型判断是图片还是视频
  if (mimetype.startsWith('image/')) {
    return await uploadImage(fileBuffer, filename, mimetype);
  } else if (mimetype.startsWith('video/')) {
    return await uploadVideo(fileBuffer, filename, mimetype);
  } else {
    return {
      success: false,
      message: '不支持的文件类型'
    };
  }
}


module.exports = {
  saveImageToLocal,
  saveVideoToLocal,
  uploadImage,
  uploadVideo,
  uploadFile,
  adminAuth
};