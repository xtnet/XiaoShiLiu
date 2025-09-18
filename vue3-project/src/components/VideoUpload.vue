<template>
  <div class="video-upload">
    <div class="upload-area" @click="!isUploading && triggerFileInput()"
      :class="{ 'drag-over': isDragOver, 'uploading': isUploading, 'has-video': videoData }"
      @dragover.prevent="!isUploading && (isDragOver = true)" @dragleave.prevent="isDragOver = false"
      @drop.prevent="!isUploading && handleFileDrop($event)">

      <input ref="fileInput" type="file" accept="video/*" @change="handleFileSelect" style="display: none"
        :disabled="isUploading" />

      <!-- 视频上传成功状态 -->
      <div v-if="videoData && !isUploading" class="video-success">
        <div class="video-info">
          <p class="video-name">{{ videoData.name }}</p>
          <p class="video-size">{{ formatFileSize(videoData.size) }}</p>
          <div class="success-text">
            <div class="success-icon">
              <SvgIcon name="tick" width="14" height="14" />
            </div>
            上传成功
          </div>
        </div>
        <button @click.stop="removeVideo" class="remove-btn">
          <SvgIcon name="delete" />
        </button>
      </div>

      <!-- 上传占位符 -->
      <div v-else-if="!isUploading" class="upload-placeholder">
        <SvgIcon name="publish" class="upload-icon" />
        <p>添加视频</p>
        <p class="upload-hint">支持 MP4、MOV、AVI 格式</p>
        <p class="upload-hint">文件大小不超过100MB</p>
        <p class="drag-hint">或拖拽视频到此处</p>
      </div>

      <!-- 上传进度 -->
      <div v-if="isUploading" class="upload-progress">
        <div class="progress-bar">
          <div class="progress-fill" :style="{ width: uploadProgress + '%' }"></div>
        </div>
        <p class="progress-text">{{ Math.floor(uploadProgress) }}%</p>
      </div>
    </div>

    <div v-if="error" class="error-message">
      {{ error }}
    </div>

    <div class="upload-tips">
      <p>• 支持 MP4、MOV、AVI 格式</p>
      <p>• 文件大小不超过100MB</p>
      <p>• 建议视频时长不超过5分钟</p>
    </div>

    <MessageToast v-if="showToast" :message="toastMessage" :type="toastType" @close="handleToastClose" />
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import SvgIcon from './SvgIcon.vue'
import MessageToast from './MessageToast.vue'
import { videoApi } from '@/api/video.js'
import { generateVideoThumbnail, blobToFile, generateThumbnailFilename } from '@/utils/videoThumbnail.js'

const props = defineProps({
  modelValue: {
    type: String,
    default: ''
  },
  maxSize: {
    type: Number,
    default: 100 * 1024 * 1024 // 100MB
  }
})

const emit = defineEmits(['update:modelValue', 'error'])

// 响应式数据
const fileInput = ref(null)
const videoData = ref(null)
const isUploading = ref(false)
const uploadProgress = ref(0)
const isDragOver = ref(false)
const error = ref('')
const showToast = ref(false)
const toastMessage = ref('')
const toastType = ref('success')

// 监听外部值变化
watch(() => props.modelValue, (newValue) => {
  if (!newValue && videoData.value) {
    // 外部清空了值，重置组件
    videoData.value = null
    error.value = ''
  } else if (newValue && !videoData.value) {
    // 外部设置了值，但组件没有数据，可能是从外部加载的视频
    videoData.value = {
      preview: newValue,
      url: newValue,
      uploaded: true,
      name: '已上传的视频',
      size: 0
    }
  }
})

// 触发文件选择
const triggerFileInput = () => {
  if (fileInput.value) {
    fileInput.value.click()
  }
}

// 处理文件选择
const handleFileSelect = (event) => {
  const files = event.target.files
  if (files && files.length > 0) {
    handleFile(files[0])
  }
}

// 处理文件拖拽
const handleFileDrop = (event) => {
  isDragOver.value = false
  const files = event.dataTransfer.files
  if (files && files.length > 0) {
    handleFile(files[0])
  }
}

// 验证视频文件
const validateVideoFile = (file) => {
  // 验证文件类型
  if (!file.type.startsWith('video/')) {
    return { valid: false, message: '请选择视频文件' }
  }

  // 验证文件大小
  if (file.size > props.maxSize) {
    return { valid: false, message: `文件大小不能超过${formatFileSize(props.maxSize)}` }
  }

  return { valid: true }
}

// 处理文件
const handleFile = async (file) => {
  if (!file) return

  // 验证文件
  const validation = validateVideoFile(file)
  if (!validation.valid) {
    error.value = validation.message
    emit('error', validation.message)
    return
  }

  // 创建预览
  const preview = URL.createObjectURL(file)
  
  videoData.value = {
    file: file,
    preview: preview,
    name: file.name,
    size: file.size,
    uploaded: false,
    url: null,
    thumbnail: null, // 缩略图数据
    thumbnailDataUrl: null // 缩略图预览URL
  }

  // 清空错误
  error.value = ''
  
  // 传递文件名作为modelValue（字符串类型）
  emit('update:modelValue', file.name)
  showMessage('视频文件已选择，正在生成缩略图...', 'info')
  
  // 生成缩略图
  await generateThumbnail(file)
}

// 生成视频缩略图
const generateThumbnail = async (file) => {
  try {
    console.log('🎬 开始生成视频缩略图:', file.name)
    
    const result = await generateVideoThumbnail(file, {
      width: 640,
      height: 360,
      quality: 0.8,
      seekTime: 1
    })
    
    if (result.success && videoData.value) {
      // 将Blob转换为File对象
      const thumbnailFile = blobToFile(result.blob, generateThumbnailFilename(file.name))
      
      videoData.value.thumbnail = thumbnailFile
      videoData.value.thumbnailDataUrl = result.dataUrl
      
      console.log('✅ 视频缩略图生成成功')
      showMessage('缩略图生成成功，点击发布按钮后将上传', 'success')
    } else {
      console.warn('⚠️ 视频缩略图生成失败:', result.error)
      showMessage('缩略图生成失败，但不影响视频上传', 'warning')
    }
  } catch (error) {
    console.error('❌ 生成视频缩略图异常:', error)
    showMessage('缩略图生成异常，但不影响视频上传', 'warning')
  }
}

// 开始上传过程
const startUpload = async () => {
  if (!videoData.value || !videoData.value.file) {
    return { success: false, message: '没有视频文件' }
  }

  isUploading.value = true
  uploadProgress.value = 0

  try {
    // 传递缩略图文件（如果有的话）
    const result = await videoApi.uploadVideo(
      videoData.value.file, 
      (progress) => {
        uploadProgress.value = progress
      },
      videoData.value.thumbnail // 传递缩略图
    )

    if (result.success) {
      isUploading.value = false
      if (videoData.value) {
        videoData.value.uploaded = true
        videoData.value.url = result.data.url
        videoData.value.coverUrl = result.data.coverUrl
        emit('update:modelValue', videoData.value.url)
        showMessage('视频上传成功', 'success')
        return result // 返回上传结果
      }
    } else {
      isUploading.value = false
      error.value = result.message || '视频上传失败'
      emit('error', error.value)
      showMessage(error.value, 'error')
      return result // 返回失败结果
    }
  } catch (err) {
    console.error('视频上传失败:', err)
    isUploading.value = false
    error.value = '视频上传失败，请重试'
    emit('error', error.value)
    showMessage(error.value, 'error')
    return { success: false, message: '视频上传失败，请重试' }
  }
}

// 移除视频
const removeVideo = () => {
  if (videoData.value && videoData.value.preview) {
    URL.revokeObjectURL(videoData.value.preview)
  }
  videoData.value = null
  error.value = ''
  uploadProgress.value = 0
  emit('update:modelValue', '')

  if (fileInput.value) {
    fileInput.value.value = ''
  }
}

// 格式化文件大小
const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 B'
  const k = 1024
  const sizes = ['B', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

// 显示消息提示
const showMessage = (message, type = 'success') => {
  toastMessage.value = message
  toastType.value = type
  showToast.value = true
}

// 关闭消息提示
const handleToastClose = () => {
  showToast.value = false
}

// 获取视频数据
const getVideoData = () => {
  return videoData.value
}

// 重置组件
const reset = () => {
  removeVideo()
}

// 暴露方法给父组件
defineExpose({
  getVideoData,
  reset,
  removeVideo,
  startUpload
})
</script>

<style scoped>
.video-upload {
  width: 100%;
}

.upload-area {
  width: 100%;
  min-height: 200px;
  border: 2px dashed var(--border-color-primary);
  border-radius: 8px;
  background: var(--bg-color-primary);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
  position: relative;
  overflow: hidden;
}

.upload-area:hover {
  border-color: var(--primary-color);
  background: var(--bg-color-secondary);
}

.upload-area.drag-over {
  border-color: var(--primary-color);
  background: var(--bg-color-secondary);
  transform: scale(1.02);
}


.upload-area.has-video {
  min-height: 100px;
  cursor: default;
  border: none;
  background: transparent;
}

.upload-area.has-video:hover {
  border: none;
  background: transparent;
}

.video-upload:has(.upload-area.has-video) .upload-tips {
  display: none;
}

.video-success {
  width: 90%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px;
  background: var(--bg-color-secondary);
  border-radius: 4px;
  border: 1px solid var(--success-color);
}

.success-icon {
  width: 16px;
  height: 16px;
  background: #2abc3b;
  border-radius: 50%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: white;
  margin-right: 6px;
  vertical-align: middle;
}

.video-info {
  margin-left: 20px;
  flex: 1;
  color: var(--text-color-primary);
}

.video-name {
  font-size: 14px;
  font-weight: 500;
  margin: 0 0 4px 0;
  word-break: break-all;
}

.video-size {
  font-size: 12px;
  margin: 0 0 4px 0;
  color: var(--text-color-secondary);
}

.success-text {
  font-size: 12px;
  margin: 0;
  color: var(--success-color);
  font-weight: 500;
  display: flex;
  align-items: center;
}

.remove-btn {
  background: var(--bg-color-primary);
  border: 1px solid var(--border-color-primary);
  border-radius: 50%;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
  color: var(--text-color-secondary);
  margin-right: 20px;
  flex-shrink: 0;
}

.remove-btn:hover {
  background: var(--primary-color);
  border-color: var(--primary-color);
  color: white;
}

.upload-placeholder {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: var(--text-color-secondary);
}

.upload-placeholder .upload-icon {
  width: 40px;
  height: 40px;
}

.upload-placeholder p {
  margin: 4px 0;
  font-size: 14px;
}

.upload-hint {
  font-size: 12px;
  color: var(--text-color-tertiary);
}

.drag-hint {
  font-size: 12px;
  color: var(--text-color-quaternary);
  margin-top: 8px;
}

.upload-progress {
  position: absolute;
  bottom: 20px;
  left: 20px;
  right: 20px;
  text-align: center;
}

.progress-bar {
  width: 100%;
  height: 4px;
  background: var(--bg-color-tertiary);
  border-radius: 2px;
  overflow: hidden;
  margin-bottom: 8px;
}

.progress-fill {
  height: 100%;
  background: var(--primary-color);
  transition: width 0.2s ease;
}

.progress-text {
  font-size: 12px;
  color: var(--text-color-secondary);
  margin: 0;
}

.error-message {
  color: var(--danger-color);
  font-size: 12px;
  margin-top: 8px;
}

.upload-tips {
  font-size: 12px;
  color: var(--text-color-secondary);
  line-height: 1.4;
  margin-top: 8px;
}

.upload-tips p {
  margin: 2px 0;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
}

/* 响应式设计 */
@media (max-width: 768px) {
  .upload-area {
    min-height: 150px;
  }

  .upload-area.has-video {
    min-height: 100px;
  }

  .video-player {
    max-height: 180px;
  }

}
</style>
