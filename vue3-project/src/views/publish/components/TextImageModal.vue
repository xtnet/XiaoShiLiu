<template>
  <div v-if="visible" class="text-image-modal-overlay" @click="handleOverlayClick">
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
              <p>预览图片将在这里显示</p>
            </div>
            <img v-else :src="previewImage" alt="预览图片" class="preview-image" />
          </div>
        </div>
        
        <!-- 输入框和emoji选择器 -->
        <div class="input-section">
          <div class="content-input-wrapper">
            <ContentEditableInput
              ref="textInputRef"
              v-model="inputText"
              placeholder="输入文字内容..."
              :input-class="'content-textarea'"
              :max-length="200"
            />
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
              <div
                v-for="template in templates"
                :key="template.id"
                class="template-item"
                :class="{ active: selectedTemplate?.id === template.id }"
                @click="selectTemplate(template)"
              >
                <img :src="template.src" :alt="template.name" class="template-image" />
                <span class="template-name">{{ template.name }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div class="modal-footer">
        <button class="cancel-btn" @click="$emit('close')">取消</button>
        <button class="generate-btn" @click="handleGenerate" :disabled="!canGenerate">生成图片</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
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

// 组件挂载时加载模版
onMounted(() => {
  loadTemplates()
})

// 计算是否可以生成图片
const canGenerate = computed(() => {
  return inputText.value.trim() && selectedTemplate.value
})

// 处理遮罩层点击
const handleOverlayClick = () => {
  emit('close')
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
  // 这里可以添加预览逻辑
}

// 处理生成图片
const handleGenerate = () => {
  if (!canGenerate.value) return
  
  const data = {
    text: inputText.value,
    template: selectedTemplate.value
  }
  
  emit('generate', data)
}

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
  height: 200px;
  border: 2px dashed var(--border-color-primary);
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--bg-color-primary);
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

.preview-image {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  border-radius: 8px;
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

.template-item:hover .template-image{
  scale: 1.05;
  border:1px solid var(--primary-color-shadow);
}

.template-item.active .template-image {
  scale: 1.05;
  border:1px solid var(--primary-color);
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
.generate-btn {
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

.generate-btn {
  background: var(--primary-color);
  color: white;
}

.generate-btn:hover:not(:disabled) {
  background-color: var(--primary-color-dark);
}

.generate-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none;
  box-shadow: none;
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
    height: 150px;
  }
  
  .template-item {
    width: 50px;
  }
  
  .template-image {
    width: 50px;
  }
}
</style>