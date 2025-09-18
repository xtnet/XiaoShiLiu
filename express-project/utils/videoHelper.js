const ffmpeg = require('fluent-ffmpeg');
const path = require('path');
const fs = require('fs').promises;
const { uploadImage } = require('./uploadHelper');

// 设置FFmpeg路径（Windows环境）
try {
  // 尝试设置FFmpeg和FFprobe的路径
  // 如果系统PATH中有FFmpeg，这些设置可能不是必需的
  // 但为了确保兼容性，我们尝试常见的安装路径
  
  // 常见的FFmpeg安装路径
  const possiblePaths = [
    'C:\\ffmpeg\\bin\\ffmpeg.exe',
    'C:\\Program Files\\ffmpeg\\bin\\ffmpeg.exe',
    'ffmpeg' // 系统PATH中的FFmpeg
  ];
  
  const possibleProbePaths = [
    'C:\\ffmpeg\\bin\\ffprobe.exe',
    'C:\\Program Files\\ffmpeg\\bin\\ffprobe.exe',
    'ffprobe' // 系统PATH中的FFprobe
  ];
  
  // 设置FFmpeg路径
  ffmpeg.setFfmpegPath('ffmpeg');
  ffmpeg.setFfprobePath('ffprobe');
  
  console.log('FFmpeg 路径已设置');
} catch (error) {
  console.warn('FFmpeg 路径设置失败:', error.message);
}

// 检查FFmpeg是否可用
let ffmpegAvailable = false;

// 初始化时检查FFmpeg
async function checkFFmpegAvailability() {
  try {
    await new Promise((resolve, reject) => {
      // 使用一个简单的命令来测试ffprobe是否可用
      ffmpeg.ffprobe('-version', (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
    ffmpegAvailable = true;
    console.log('FFmpeg 可用');
  } catch (error) {
    ffmpegAvailable = false;
    console.warn('FFmpeg 不可用，视频缩略图功能将被禁用:', error.message);
  }
}

// 启动时检查FFmpeg
checkFFmpegAvailability();

/**
 * 从视频文件中提取第一帧作为封面图片
 * @param {Buffer} videoBuffer - 视频文件缓冲区
 * @param {string} originalFilename - 原始文件名
 * @returns {Promise<{success: boolean, coverUrl?: string, message?: string}>}
 */
async function extractVideoThumbnail(videoBuffer, originalFilename) {
  // 如果FFmpeg不可用，返回默认封面或跳过缩略图生成
  if (!ffmpegAvailable) {
    console.warn('FFmpeg 不可用，跳过视频缩略图提取');
    return {
      success: false,
      message: 'FFmpeg 不可用，无法生成视频缩略图',
      coverUrl: null // 可以设置一个默认的视频封面URL
    };
  }

  const tempDir = path.join(__dirname, '../temp');
  const videoId = Date.now() + '_' + Math.random().toString(36).substr(2, 9);
  const tempVideoPath = path.join(tempDir, `${videoId}.mp4`);
  const tempThumbnailPath = path.join(tempDir, `${videoId}_thumbnail.jpg`);

  try {
    // 确保临时目录存在
    await fs.mkdir(tempDir, { recursive: true });

    // 将视频缓冲区写入临时文件
    await fs.writeFile(tempVideoPath, videoBuffer);

    // 使用ffmpeg提取第一帧
    await new Promise((resolve, reject) => {
      ffmpeg(tempVideoPath)
        .screenshots({
          count: 1,
          folder: tempDir,
          filename: `${videoId}_thumbnail.jpg`,
          size: '640x360'
        })
        .on('end', resolve)
        .on('error', reject);
    });

    // 读取生成的缩略图
    const thumbnailBuffer = await fs.readFile(tempThumbnailPath);
    
    // 生成缩略图文件名
    const thumbnailFilename = originalFilename.replace(/\.[^/.]+$/, '_thumbnail.jpg');
    
    // 上传缩略图到图床
    const uploadResult = await uploadImage(thumbnailBuffer, thumbnailFilename, 'image/jpeg');

    // 清理临时文件
    try {
      await fs.unlink(tempVideoPath);
      await fs.unlink(tempThumbnailPath);
    } catch (cleanupError) {
      console.warn('清理临时文件失败:', cleanupError);
    }

    if (uploadResult.success) {
      return {
        success: true,
        coverUrl: uploadResult.url
      };
    } else {
      return {
        success: false,
        message: '封面图片上传失败: ' + uploadResult.message
      };
    }

  } catch (error) {
    console.error('视频缩略图提取失败:', error);
    
    // 清理临时文件
    try {
      await fs.unlink(tempVideoPath);
      await fs.unlink(tempThumbnailPath);
    } catch (cleanupError) {
      // 忽略清理错误
    }

    return {
      success: false,
      message: '视频缩略图提取失败: ' + error.message
    };
  }
}

/**
 * 获取视频时长
 * @param {Buffer} videoBuffer - 视频文件缓冲区
 * @returns {Promise<{success: boolean, duration?: number, message?: string}>}
 */
async function getVideoDuration(videoBuffer) {
  // 如果FFmpeg不可用，返回失败但不影响视频上传
  if (!ffmpegAvailable) {
    console.warn('FFmpeg 不可用，跳过视频时长获取');
    return {
      success: false,
      message: 'FFmpeg 不可用，无法获取视频时长'
    };
  }

  const tempDir = path.join(__dirname, '../temp');
  const videoId = Date.now() + '_' + Math.random().toString(36).substr(2, 9);
  const tempVideoPath = path.join(tempDir, `${videoId}.mp4`);

  try {
    // 确保临时目录存在
    await fs.mkdir(tempDir, { recursive: true });

    // 将视频缓冲区写入临时文件
    await fs.writeFile(tempVideoPath, videoBuffer);

    // 获取视频信息
    const duration = await new Promise((resolve, reject) => {
      ffmpeg.ffprobe(tempVideoPath, (err, metadata) => {
        if (err) {
          reject(err);
        } else {
          resolve(metadata.format.duration);
        }
      });
    });

    // 清理临时文件
    try {
      await fs.unlink(tempVideoPath);
    } catch (cleanupError) {
      console.warn('清理临时文件失败:', cleanupError);
    }

    return {
      success: true,
      duration: Math.round(duration)
    };

  } catch (error) {
    console.error('获取视频时长失败:', error);
    
    // 清理临时文件
    try {
      await fs.unlink(tempVideoPath);
    } catch (cleanupError) {
      // 忽略清理错误
    }

    return {
      success: false,
      message: '获取视频时长失败: ' + error.message
    };
  }
}

module.exports = {
  extractVideoThumbnail,
  getVideoDuration
};