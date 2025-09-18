// API配置文件
export const apiConfig = {
  // 后端API基础URL - 使用环境变量或默认值
  baseURL: import.meta.env.VITE_API_BASE_URL || '/api',

  // 请求超时时间（毫秒）
  timeout: 60000, // 增加到60秒，适应多图片上传场景

  // 默认请求头
  defaultHeaders: {
    'Content-Type': 'application/json'
  },

  // 分页配置
  pagination: {
    defaultPageSize: 20,
    maxPageSize: 100
  },

  // 上传配置
  upload: {
    // 图片上传配置
    image: {
      maxFileSize: 10 * 1024 * 1024, // 10MB
      allowedTypes: ['image/jpeg', 'image/png', 'image/webp'],
      maxCount: 9 // 最多上传9张图片
    },
    // 视频上传配置
    video: {
      maxFileSize: 100 * 1024 * 1024, // 100MB
      allowedTypes: ['video/mp4', 'video/avi', 'video/mov', 'video/wmv', 'video/flv', 'video/webm'],
      maxCount: 1 // 最多上传1个视频
    }
  }
}

export default apiConfig