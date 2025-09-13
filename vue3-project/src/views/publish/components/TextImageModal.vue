<template>
  <div v-if="visible" class="text-image-modal-overlay" @mousedown="handleOverlayMouseDown">
    <div class="text-image-modal" @click.stop>
      <div class="modal-header">
        <h3 class="modal-title">文字配图</h3>
        <button class="close-btn" @click="$emit('close')">
          <SvgIcon name="close" width="20" height="20" />
        </button>
      </div>

      <div class="modal-body">
        <!-- 预览图片区域 -->
        <div class="preview-section">
          <div class="preview-container">
            <div v-if="!previewImage" class="preview-placeholder">
              <SvgIcon name="imgNote" width="48" height="48" />
              <p>{{ placeholderText }}</p>
            </div>
            <img v-else :src="previewImage" class="preview-image" alt="生成的图片" />
            <!-- 隐藏的canvas用于生成图片 -->
            <canvas ref="previewCanvas" class="hidden-canvas" width="400" height="600" style="display: none;"></canvas>
          </div>
        </div>

        <!-- 输入框和emoji选择器 -->
        <div class="input-section">
          <div class="content-input-wrapper">
            <ContentEditableInput ref="textInputRef" v-model="inputText" placeholder="输入文字内容..."
              :input-class="'content-textarea'" :max-length="200" />
            <div class="content-actions">
              <button class="emoji-btn" @click="toggleEmojiPanel">
                <SvgIcon name="emoji" class="emoji-icon" width="20" height="20" />
              </button>
            </div>
          </div>

          <!-- Emoji选择器 -->
          <div v-if="showEmojiPanel" class="emoji-panel-overlay" @click="closeEmojiPanel">
            <div class="emoji-panel" @click.stop>
              <EmojiPicker @select="handleEmojiSelect" @close="closeEmojiPanel" />
            </div>
          </div>
        </div>

        <!-- 模版选择区域 -->
        <div class="template-section">
          <h4 class="section-title">选择模版</h4>
          <div class="template-scroll-container">
            <div class="template-list">
              <div v-for="template in templates" :key="template.id" class="template-item"
                :class="{ active: selectedTemplate?.id === template.id }" @click="selectTemplate(template)">
                <img :src="template.src" :alt="template.name" class="template-image" />
                <span class="template-name">{{ template.name }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="modal-footer">
        <button class="cancel-btn" @click="$emit('close')">取消</button>
        <button class="upload-btn" @click="handleUpload" :disabled="!previewImage">上传</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch, nextTick } from 'vue'
import SvgIcon from '@/components/SvgIcon.vue'
import ContentEditableInput from '@/components/ContentEditableInput.vue'
import EmojiPicker from '@/components/EmojiPicker.vue'

const props = defineProps({
  visible: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['close', 'generate'])

const textInputRef = ref(null)
const previewCanvas = ref(null)
const inputText = ref('')
const showEmojiPanel = ref(false)
const selectedTemplate = ref(null)
const previewImage = ref('')
const templates = ref([])

// 动态加载frames文件夹中的所有图片
const loadTemplates = async () => {
  try {
    // 使用Vite的glob导入功能动态加载frames文件夹中的所有图片
    const frameModules = import.meta.glob('/src/assets/frames/*.(jpg|jpeg|png|gif|webp)', { eager: true })

    const templateList = []
    let index = 1

    for (const path in frameModules) {
      const module = frameModules[path]
      templateList.push({
        id: index,
        name: `模版${index}`,
        src: module.default || path
      })
      index++
    }

    templates.value = templateList
  } catch (error) {
    console.error('加载模版失败:', error)
  }
}

// 处理文字换行，限制最多6行，每行最多7个字符
const processText = (text) => {
  if (!text) return []

  // 过滤掉contentEditable产生的<br>标签，转换为换行符
  text = text.replace(/<br\s*\/?>/gi, '\n')

  const lines = []
  let currentLine = ''

  for (let i = 0; i < text.length && lines.length < 6; i++) {
    const char = text[i]

    // 如果遇到换行符或当前行已达到7个字符，开始新行
    if (char === '\n' || currentLine.length >= 7) {
      if (currentLine.trim()) {
        lines.push(currentLine)
      }
      currentLine = char === '\n' ? '' : char
    } else {
      currentLine += char
    }
  }

  // 添加最后一行
  if (currentLine.trim() && lines.length < 6) {
    lines.push(currentLine)
  }

  return lines
}

// 绘制canvas预览
const drawCanvas = async () => {
  if (!previewCanvas.value || !selectedTemplate.value) return

  const canvas = previewCanvas.value
  const ctx = canvas.getContext('2d')

  // 清空canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height)

  try {
    // 加载模板图片
    const img = new Image()
    img.crossOrigin = 'anonymous'

    await new Promise((resolve, reject) => {
      img.onload = resolve
      img.onerror = reject
      img.src = selectedTemplate.value.src
    })

    // 绘制背景图片，保持比例并填充整个canvas
    const canvasRatio = canvas.width / canvas.height
    const imgRatio = img.width / img.height

    let drawWidth, drawHeight, offsetX, offsetY

    if (imgRatio > canvasRatio) {
      // 图片更宽，以高度为准
      drawHeight = canvas.height
      drawWidth = drawHeight * imgRatio
      offsetX = (canvas.width - drawWidth) / 2
      offsetY = 0
    } else {
      // 图片更高，以宽度为准
      drawWidth = canvas.width
      drawHeight = drawWidth / imgRatio
      offsetX = 0
      offsetY = (canvas.height - drawHeight) / 2
    }

    ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight)

    // 绘制文字
    if (inputText.value.trim()) {
      const lines = processText(inputText.value)

      // 根据行数和字数动态计算字体大小
      let fontSize
      if (lines.length === 1 && inputText.value.trim().length < 7) {
        fontSize = 62
      } else {
        fontSize = 40
      }

      // 设置文字样式
      ctx.fillStyle = '#000000'
      ctx.font = `bold ${fontSize}px Arial, sans-serif`
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'

      // 计算文字总高度
      const lineHeight = fontSize + 10
      const totalHeight = lines.length * lineHeight
      const startY = (canvas.height - totalHeight) / 2 + lineHeight / 2

      // 绘制每一行文字
      lines.forEach((line, index) => {
        const y = startY + index * lineHeight
        const x = canvas.width / 2

        // 直接绘制黑色文字
        ctx.fillText(line, x, y)
      })
    }
  } catch (error) {
    console.error('绘制canvas失败:', error)
  }
}

// 组件挂载时加载模版
onMounted(() => {
  loadTemplates()
})

// 计算是否可以生成图片
const canGenerate = computed(() => {
  return inputText.value.trim() && selectedTemplate.value
})

// 计算提示文字
const placeholderText = computed(() => {
  const hasText = inputText.value.trim()
  const hasTemplate = selectedTemplate.value
  
  if (!hasText && !hasTemplate) {
    return '请输入文字并选择模版'
  } else if (hasTemplate && !hasText) {
    return '请输入文字内容'
  } else if (hasText && !hasTemplate) {
    return '请选择模版'
  } else {
    return '图片生成中...'
  }
})

// 处理遮罩层鼠标按下
const handleOverlayMouseDown = (event) => {
  // 只有在遮罩层本身按下鼠标时才关闭模态框
  if (event.target === event.currentTarget) {
    emit('close')
  }
}

// 切换emoji面板
const toggleEmojiPanel = () => {
  showEmojiPanel.value = !showEmojiPanel.value
}

// 关闭emoji面板
const closeEmojiPanel = () => {
  showEmojiPanel.value = false
}

// 处理emoji选择
const handleEmojiSelect = (emoji) => {
  const emojiChar = emoji.i
  const inputElement = textInputRef.value

  if (inputElement && inputElement.insertEmoji) {
    inputElement.insertEmoji(emojiChar)
  } else {
    inputText.value += emojiChar
  }

  closeEmojiPanel()
}

// 选择模版
const selectTemplate = (template) => {
  selectedTemplate.value = template
  // 清除之前的预览图片
  previewImage.value = ''
  
  // 如果已有文字，自动生成图片
  if (inputText.value.trim()) {
    handleGenerate()
  }
}

// 处理生成图片
const handleGenerate = async () => {
  if (!canGenerate.value || !previewCanvas.value) return

  try {
    // 先绘制canvas，等待完成
    await drawCanvas()
    
    // 将canvas转为blob并显示在预览区域
    previewCanvas.value.toBlob((blob) => {
      if (blob) {
        previewImage.value = URL.createObjectURL(blob)
      }
    }, 'image/png', 0.9)
  } catch (error) {
    console.error('生成图片失败:', error)
  }
}

// 处理上传图片
const handleUpload = async () => {
  if (!previewImage.value) return

  try {
    // 确保canvas已绘制完成
    await drawCanvas()
    
    // 将canvas转为blob
    previewCanvas.value.toBlob((blob) => {
      if (blob) {
        // 创建File对象
        const file = new File([blob], `text-image-${Date.now()}.png`, {
          type: 'image/png'
        })

        const data = {
          text: inputText.value,
          template: selectedTemplate.value,
          imageFile: file,
          imageUrl: previewImage.value
        }

        emit('generate', data)
      }
    }, 'image/png', 0.9)
  } catch (error) {
    console.error('上传图片失败:', error)
  }
}

// 监听文字变化，自动生成图片
watch(inputText, (newText) => {
  // 清除之前的预览图片
  if (previewImage.value) {
    previewImage.value = ''
  }
  
  // 如果有文字且已选择模版，自动生成图片
  if (newText.trim() && selectedTemplate.value) {
    handleGenerate()
  }
})

// 监听visible变化，重置状态
watch(() => props.visible, (newVal) => {
  if (newVal) {
    // 模态框打开时重置状态
    inputText.value = ''
    selectedTemplate.value = null
    previewImage.value = ''
    showEmojiPanel.value = false
  }
})
</script>

<style scoped>
.text-image-modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: var(--overlay-bg);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 1rem;
}

.text-image-modal {
  background: var(--bg-color-primary);
  border-radius: 8px;
  width: 100%;
  max-width: 600px;
  max-height: 90vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  box-shadow: 0 4px 20px var(--shadow-color);
}

.modal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 30px;
  border-bottom: 1px solid var(--border-color-primary);
  flex-shrink: 0;
  background: var(--bg-color-primary);
}

.modal-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--text-color-primary);
  margin: 0;
}

.close-btn {
  background: none;
  border: none;
  cursor: pointer;
  padding: 5px;
  color: var(--text-color-secondary);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
}

.close-btn:hover {
  color: var(--text-color-primary);
  background-color: var(--bg-color-secondary);
}

.modal-body {
  flex: 1;
  overflow-y: auto;
  padding: 30px;
  display: flex;
  flex-direction: column;
  gap: 24px;
  background: var(--bg-color-primary);
}

.preview-section {
  text-align: center;
}

.preview-container {
  width: 100%;
  border: 2px dashed var(--border-color-primary);
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--bg-color-primary);
  min-height: 200px;
  overflow: hidden;
  position: relative;
}

.preview-placeholder {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  color: var(--text-color-secondary);
}

.preview-placeholder p {
  margin: 0;
  font-size: 14px;
}

.preview-canvas {
  display: block;
  border-radius: 8px;
  border: 1px solid var(--border-color-primary);
  max-width: 100%;
  height: auto;
}

.preview-image {
  max-width: 100%;
  max-height: 400px;
  border-radius: 8px;
  object-fit: contain;
  display: block;
  margin: 0 auto;
}

.hidden-canvas {
  display: none !important;
}

.input-section {
  position: relative;
}

.content-input-wrapper {
  position: relative;
  border: 1px solid var(--border-color-primary);
  border-radius: 8px;
  background: var(--bg-color-primary);
  transition: all 0.2s ease;
}

.content-input-wrapper:focus-within {
  border-color: var(--primary-color);
}

.content-textarea {
  width: 100%;
  padding: 1rem;
  padding-bottom: 3rem;
  border: none;
  border-radius: 8px;
  background: transparent;
  color: var(--text-color-primary);
  font-size: 16px;
  line-height: 1.5;
  transition: all 0.2s ease;
  min-height: 80px;
  box-sizing: border-box;
  caret-color: var(--primary-color);
}

.content-textarea:focus {
  outline: none;
}

.content-textarea:empty:before {
  content: attr(placeholder);
  color: var(--text-color-secondary);
  pointer-events: none;
}

.content-actions {
  position: absolute;
  bottom: 0.5rem;
  left: 1rem;
  display: flex;
  align-items: center;
  gap: 8px;
}

.emoji-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border: none;
  background: transparent;
  color: var(--text-color-secondary);
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.2s ease;
}

.emoji-btn:hover {
  background: var(--bg-color-secondary);
  color: var(--text-color-primary);
}

.emoji-icon {
  width: 20px;
  height: 20px;
}

.emoji-panel-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: transparent;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  animation: fadeIn 0.2s ease;
}

.emoji-panel {
  background: var(--bg-color-primary);
  border-radius: 12px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
  overflow: hidden;
  animation: scaleIn 0.2s ease;
  max-width: 90vw;
  max-height: 80vh;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}

@keyframes scaleIn {
  from {
    opacity: 0;
    transform: scale(0.8);
  }

  to {
    opacity: 1;
    transform: scale(1);
  }
}

.template-section {
  margin-top: 1rem;
}

.section-title {
  font-size: 1rem;
  font-weight: 600;
  color: var(--text-color-primary);
  margin: 0 0 1rem 0;
}

.template-scroll-container {
  overflow-x: auto;
  padding-bottom: 8px;
  scrollbar-width: thin;
  scrollbar-color: var(--scrollbar-thumb-color) transparent;
}

.template-scroll-container::-webkit-scrollbar {
  height: 6px;
}

.template-scroll-container::-webkit-scrollbar-track {
  background: var(--scrollbar-track-color);
  border-radius: 3px;
}

.template-scroll-container::-webkit-scrollbar-thumb {
  background: var(--scrollbar-thumb-color);
  border-radius: 3px;
}

.template-scroll-container::-webkit-scrollbar-thumb:hover {
  background: var(--scrollbar-thumb-hover-color);
}

.template-list {
  display: flex;
  gap: 16px;
  padding: 8px 0;
  padding: 5px;
}

.template-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 130px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.template-item:hover .template-image {
  scale: 1.05;
  border: 1px solid var(--primary-color-shadow);
}

.template-item.active .template-image {
  scale: 1.05;
  border: 1px solid var(--primary-color);
}


.template-image {
  width: 130px;
  border-radius: 8px;
  margin-bottom: 12px;
  border: 1px solid var(--border-color-primary);
}

.template-name {
  display: block;
  font-size: 12px;
  color: var(--text-color-secondary);
  font-weight: 500;
}

.modal-footer {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 16px;
  padding: 20px 30px;
  border-top: 1px solid var(--border-color-primary);
  background: var(--bg-color-primary);
  flex-shrink: 0;
}

.cancel-btn,
.upload-btn {
  padding: 12px 24px;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  border: none;
  min-width: 100px;
}

.cancel-btn {
  background: var(--bg-color-primary);
  color: var(--text-color-secondary);
  border: 1px solid var(--border-color-primary);
}

.cancel-btn:hover {
  background: var(--bg-color-secondary);
  color: var(--text-color-primary);
}

.upload-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none;
  box-shadow: none;
}

.upload-btn {
  background: var(--primary-color);
  color: white;
}

.upload-btn:hover {
  background-color: var(--primary-color-dark);
}

@media (max-width: 640px) {
  .text-image-modal {
    margin: 0.5rem;
    max-width: none;
  }

  .modal-header,
  .modal-body,
  .modal-footer {
    padding: 1rem;
  }

  .preview-container {
    min-height: 300px;
  }

  .preview-image {
    max-height: 350px;
  }

  .template-item {
    width: 50px;
  }

  .template-image {
    width: 50px;
  }
}
</style>