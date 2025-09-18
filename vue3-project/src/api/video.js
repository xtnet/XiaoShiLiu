import request from './request.js'
import apiConfig from '@/config/api.js'

/**
 * 视频上传API
 */
export const videoApi = {
  /**
   * 上传单个视频文件
   * @param {File} file - 视频文件
   * @param {Function} onProgress - 上传进度回调
   * @param {File} thumbnail - 缩略图文件（可选）
   * @returns {Promise} 上传结果
   */
  async uploadVideo(file, onProgress, thumbnail = null) {
    const formData = new FormData()
    formData.append('file', file)
    
    // 如果有缩略图，一起上传
    if (thumbnail) {
      formData.append('thumbnail', thumbnail)
      console.log('包含缩略图文件:', thumbnail.name)
    }

    try {
      const response = await request.post('/upload/video', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        timeout: 300000, // 5分钟超时，适应大视频文件
        onUploadProgress: (progressEvent) => {
          if (onProgress && progressEvent.total) {
            const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total)
            onProgress(progress)
          }
        }
      })

      console.log('🔍 视频上传API原始响应:', response)
      console.log('🔍 响应success类型:', typeof response.success, '值:', response.success)
      
      if (response.success) {
        console.log('✅ 视频上传API成功响应:', response)
        return {
          success: true,
          data: response.data
        }
      } else {
        console.error('❌ 视频上传API失败响应:', response)
        return {
          success: false,
          message: response.message || '视频上传失败'
        }
      }
    } catch (error) {
      console.error('视频上传失败:', error)
      return {
        success: false,
        message: error.response?.data?.message || error.message || '视频上传失败'
      }
    }
  },

  /**
   * 验证视频文件
   * @param {File} file - 视频文件
   * @returns {Object} 验证结果
   */
  validateVideoFile(file) {
    const maxSize = apiConfig.upload.video?.maxFileSize || 100 * 1024 * 1024 // 100MB
    const allowedTypes = apiConfig.upload.video?.allowedTypes || [
      'video/mp4', 
      'video/avi', 
      'video/mov', 
      'video/wmv', 
      'video/flv', 
      'video/webm'
    ]

    // 检查文件类型
    if (!file.type.startsWith('video/')) {
      return {
        valid: false,
        message: '请选择视频文件'
      }
    }

    // 检查具体的视频格式
    if (!allowedTypes.includes(file.type)) {
      return {
        valid: false,
        message: '不支持的视频格式，请选择 MP4、AVI、MOV、WMV、FLV 或 WebM 格式'
      }
    }

    // 检查文件大小
    if (file.size > maxSize) {
      return {
        valid: false,
        message: `文件大小不能超过 ${this.formatFileSize(maxSize)}`
      }
    }

    return {
      valid: true,
      message: '文件验证通过'
    }
  },

  /**
   * 格式化文件大小
   * @param {number} bytes - 字节数
   * @returns {string} 格式化后的文件大小
   */
  formatFileSize(bytes) {
    if (bytes === 0) return '0 B'
    const k = 1024
    const sizes = ['B', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  },

  /**
   * 创建视频预览
   * @param {File} file - 视频文件
   * @returns {string} 预览URL
   */
  createVideoPreview(file) {
    return URL.createObjectURL(file)
  },

  /**
   * 释放视频预览资源
   * @param {string} url - 预览URL
   */
  revokeVideoPreview(url) {
    if (url && url.startsWith('blob:')) {
      URL.revokeObjectURL(url)
    }
  }
}

export default videoApi