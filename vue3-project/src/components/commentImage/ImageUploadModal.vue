<template>
  <div v-if="visible" class="image-upload-modal-overlay" v-click-outside.mousedown="closeModal"
    v-escape-key="closeModal">
    <div class="image-upload-modal" @mousedown.stop @wheel.stop>
      <div class="image-upload-header">
        <h4>上传图片</h4>
        <button @click="closeModal" class="close-btn">
          <SvgIcon name="close" width="16" height="16" />
        </button>
      </div>

      <div class="image-upload-content">
        <div class="multi-image-upload">
          <div class="upload-grid">
            <!-- 已选择的图片 -->
            <div v-for="(imageItem, index) in localImages" :key="imageItem.id" class="image-item">
              <div class="image-preview">
                <img :src="imageItem.preview" alt="预览图片" />
                <div class="image-overlay">
                  <div class="image-actions">
                    <button @click="removeImage(index)" class="action-btn remove-btn">
                      <SvgIcon name="delete" />
                    </button>
                  </div>
                  <div class="image-index">{{ index + 1 }}</div>
                </div>
              </div>
            </div>

            <!-- 添加图片按钮 -->
            <div v-if="confirmedImages.length + localImages.length < maxImages" class="upload-item" @click="triggerFileInput()"
              :class="{ 'uploading': isUploading }">
              <input ref="fileInput" type="file" accept="image/*" multiple @change="handleFileSelect" style="display: none" />
              <div class="upload-placeholder">
                <SvgIcon name="publish" class="upload-icon" :class="{ 'uploading': isUploading }" />
                <p>{{ isUploading ? '处理中...' : '添加图片' }}</p>
                <p class="upload-hint">已有{{ confirmedImages.length }}张，当前{{ localImages.length }}张，还能上传{{ maxImages - confirmedImages.length - localImages.length }}张</p>
              </div>
            </div>
          </div>

          <div v-if="error" class="error-message">
            {{ error }}
          </div>

          <div class="upload-tips">
            <p>• 最多上传{{ maxImages }}张图片（已确认{{ confirmedImages.length }}张）</p>
            <p>• 支持 JPG、PNG 格式</p>
            <p>• 单张图片不超过5MB</p>
            <p v-if="localImages.length > 0">• 当前选择{{ localImages.length }}张，点击确认上传后才会显示在预览区域</p>
          </div>
        </div>
      </div>

      <div class="image-upload-footer">
        <button @click="closeModal" class="cancel-btn">
          取消
        </button>
        <button @click="confirmUpload" class="confirm-btn" :disabled="localImages.length === 0">
          确认上传{{ localImages.length > 0 ? `(${localImages.length}张)` : '' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import SvgIcon from '@/components/SvgIcon.vue'
import { useScrollLock } from '@/composables/useScrollLock'

const props = defineProps({
  visible: {
    type: Boolean,
    default: false
  },
  modelValue: {
    type: Array,
    default: () => []
  }
})

const emit = defineEmits(['close', 'confirm', 'update:modelValue'])

// 防滚动穿透
const { lock, unlock } = useScrollLock()

// 本地图片数据和状态
const localImages = ref([]) // 临时选择的图片（仅在模态框中显示）
const confirmedImages = ref([]) // 已确认的图片（显示在预览区域）
const fileInput = ref(null)
const error = ref('')
const isUploading = ref(false)
const maxImages = 9

// 监听props变化，同步已确认的图片数据
watch(() => props.modelValue, (newValue) => {
  confirmedImages.value = [...newValue]
}, { immediate: true })

// 监听visible变化，清空临时图片并重新同步数据
watch(() => props.visible, (newValue) => {
  if (newValue) {
    // 每次打开时重新同步已确认的图片数据
    confirmedImages.value = [...props.modelValue]
    // 清空临时图片
    localImages.value = []
    lock()
  } else {
    unlock()
  }
})



// 生成唯一ID
const generateId = () => {
  return Date.now() + Math.random().toString(36).substr(2, 9)
}

// 触发文件选择
const triggerFileInput = () => {
  if (fileInput.value) {
    fileInput.value.click()
  }
}

// 处理文件选择
const handleFileSelect = async (event) => {
  const files = Array.from(event.target.files)
  if (files.length === 0) return

  await processFiles(files)
  // 清空input值，允许重复选择同一文件
  event.target.value = ''
}

// 处理文件
const processFiles = async (files) => {
  error.value = ''
  isUploading.value = true

  try {
    const validFiles = []
    
    for (const file of files) {
      // 检查文件类型
      if (!file.type.startsWith('image/')) {
        error.value = '只能上传图片文件'
        continue
      }
      
      // 检查文件大小 (5MB)
      if (file.size > 5 * 1024 * 1024) {
        error.value = '图片大小不能超过5MB'
        continue
      }
      
      // 检查数量限制（已确认的图片 + 临时图片 + 当前处理的图片）
      const totalCount = confirmedImages.value.length + localImages.value.length + validFiles.length
      if (totalCount >= maxImages) {
        error.value = `最多只能上传${maxImages}张图片，当前已有${confirmedImages.value.length}张`
        break
      }
      
      validFiles.push(file)
    }

    // 为有效文件创建预览
    for (const file of validFiles) {
      const preview = await fileToBase64(file)
      const imageItem = {
        id: generateId(),
        file: file,
        preview: preview,
        uploaded: false,
        url: ''
      }
      localImages.value.push(imageItem)
    }

    // 临时图片不需要通知父组件
  } catch (err) {
    console.error('处理文件失败:', err)
    error.value = '处理文件失败: ' + err.message
  } finally {
    isUploading.value = false
  }
}

// 将文件转换为base64
const fileToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(reader.result)
    reader.onerror = reject
    reader.readAsDataURL(file)
  })
}

// 删除临时图片
const removeImage = (index) => {
  localImages.value.splice(index, 1)
}

// 关闭模态框
const closeModal = () => {
  emit('close')
}

// 确认上传
const confirmUpload = () => {
  // 将临时图片合并到已确认图片中
  const allImages = [...confirmedImages.value, ...localImages.value]
  emit('confirm', allImages)
  // 清空临时图片
  localImages.value = []
  closeModal()
}
</script>

<style scoped>
.image-upload-modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 20px;
}

.image-upload-modal {
  background: var(--bg-color-primary);
  border-radius: 12px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
  width: 100%;
  max-width: 600px;
  max-height: 80vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.image-upload-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 24px;
  border-bottom: 1px solid var(--border-color-primary);
  background: var(--bg-color-primary);
}

.image-upload-header h4 {
  margin: 0;
  font-size: 18px;
  font-weight: 600;
  color: var(--text-color-primary);
}

.close-btn {
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--text-color-secondary);
  transition: all 0.2s ease;
}

.close-btn:hover {
  background: var(--bg-color-secondary);
  color: var(--text-color-primary);
}

.image-upload-content {
  flex: 1;
  padding: 24px;
  overflow-y: auto;
}

.image-upload-footer {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 10px;
  padding: 20px 24px;
  border-top: 1px solid var(--border-color-primary);
  background: var(--bg-color-primary);
}

.cancel-btn,
.confirm-btn {
  padding: 8px 16px;
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  text-decoration: none;
}

.cancel-btn {
  background-color: transparent;
  color: var(--text-color-secondary);
  border: 1px solid var(--border-color-primary);
}

.cancel-btn:hover {
  background-color: var(--bg-color-secondary);
}

.confirm-btn {
  background-color: var(--primary-color);
  color: white;
  border: none;
}

.confirm-btn:hover:not(:disabled) {
  background-color: var(--primary-color-dark);
}

.confirm-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* MultiImageUpload 样式 */
.multi-image-upload {
  width: 100%;
}

.upload-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  gap: 10px;
  margin-bottom: 10px;
}

.image-item,
.upload-item {
  aspect-ratio: 1;
  border-radius: 8px;
  overflow: hidden;
  position: relative;
}

.image-preview {
  width: 100%;
  height: 100%;
  position: relative;
}

.image-preview img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  pointer-events: none;
}

.image-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 8px;
  opacity: 0;
  transition: opacity 0.2s ease;
}

.image-preview:hover .image-overlay {
  opacity: 1;
}

.image-actions {
  display: flex;
  gap: 8px;
  align-self: flex-end;
}

.action-btn {
  background: rgba(255, 255, 255, 0.814);
  border: none;
  border-radius: 50%;
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
  opacity: 0.5;
}

.remove-btn:hover:not(:disabled) {
  opacity: 1;
}

.action-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  background-color: rgba(255, 255, 255, 0.3);
}

.action-btn svg {
  width: 12px;
  height: 12px;
}

.image-index {
  background: rgba(0, 0, 0, 0.534);
  color: white;
  border-radius: 12px;
  padding: 4px 8px;
  font-size: 12px;
  font-weight: bold;
  align-self: flex-start;
}

.upload-item {
  border: 2px dashed var(--border-color-primary);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
  background: var(--bg-color-primary);
}

.upload-item:hover {
  border-color: var(--primary-color);
}

.upload-item.uploading {
  border-color: var(--primary-color);
  background-color: rgba(255, 71, 87, 0.05);
  cursor: not-allowed;
  opacity: 0.7;
}

.upload-icon.uploading {
  animation: spin 1s linear infinite;
  color: var(--primary-color);
}

.upload-placeholder {
  text-align: center;
  color: var(--text-color-secondary);
}

.upload-icon {
  width: 24px;
  height: 24px;
  margin-bottom: 5px;
  color: var(--text-color-secondary);
}

.upload-placeholder p {
  margin: 2px 0;
  font-size: 12px;
}

.upload-hint {
  color: var(--text-color-secondary);
  font-size: 10px !important;
}

.error-message {
  color: var(--primary-color);
  font-size: 12px;
  margin-bottom: 10px;
}

.upload-tips {
  font-size: 12px;
  color: var(--text-color-secondary);
  line-height: 1.4;
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
  .image-upload-modal-overlay {
    padding: 10px;
  }
  
  .image-upload-modal {
    max-height: 90vh;
  }
  
  .image-upload-header,
  .image-upload-footer {
    padding: 16px 20px;
  }
  
  .image-upload-content {
    padding: 20px;
  }
  
  .image-overlay {
    pointer-events: none;
  }
  
  .image-overlay .action-btn {
    pointer-events: auto;
  }
  
  .upload-grid {
    user-select: none;
  }
}
</style>