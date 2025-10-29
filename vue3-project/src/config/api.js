// API配置文件

// 解析是否使用真实API
const useRealApi = String(import.meta.env.VITE_USE_REAL_API || '').toLowerCase() === 'true'
// 根据配置决定 baseURL（当不开启真实API时，强制走相对路径以便使用代理）
const resolvedBaseURL = useRealApi ? (import.meta.env.VITE_API_BASE_URL || '/api') : '/api'

// 从环境变量读取上传限制（提供默认值）
const imageMaxSize = Number(import.meta.env.VITE_IMAGE_MAX_SIZE_MB || 5) * 1024 * 1024
const imageMaxCount = Number(import.meta.env.VITE_IMAGE_MAX_COUNT || 9)
const videoMaxSize = Number(import.meta.env.VITE_VIDEO_MAX_SIZE_MB || 100) * 1024 * 1024
const videoMaxCount = Number(import.meta.env.VITE_VIDEO_MAX_COUNT || 1)

export const apiConfig = {
  // 后端API基础URL - 使用环境变量或默认值
  baseURL: resolvedBaseURL,

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
      maxFileSize: imageMaxSize, // 单位MB
      allowedTypes: ['image/jpeg', 'image/png', 'image/webp'],
      maxCount: imageMaxCount // 最多上传数量
    },
    // 视频上传配置
    video: {
      maxFileSize: videoMaxSize, // 单位MB
      allowedTypes: ['video/mp4', 'video/avi', 'video/mov', 'video/wmv', 'video/flv', 'video/webm'],
      maxCount: videoMaxCount // 最多上传数量
    }
  }
}


// 说明：
// - 当 VITE_USE_REAL_API=false 时，所有请求将使用相对路径 "/api"，
//   在开发环境走 Vite devServer 代理，在生产环境由 Nginx 反向代理到后端。
// - 当 VITE_USE_REAL_API=true 时，使用 VITE_API_BASE_URL（若未配置则回退到 "/api"）。

export default apiConfig

