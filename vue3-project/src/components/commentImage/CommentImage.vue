<template>
  <div class="comment-image-container">
    <!-- 文字内容 -->
    <div v-if="text" class="comment-text">
      <MentionText :text="text" />
    </div>
    
    <!-- 图片内容 -->
    <div v-if="images && images.length > 0" class="comment-images">
      <div class="images-grid" :class="getGridClass()">
        <div 
          v-for="(image, index) in images" 
          :key="index" 
          class="image-item"
          @click="$emit('image-click', { images: images, index })"
        >
          <img 
            :src="image" 
            :alt="`图片${index + 1}`" 
            class="comment-image"
            @error="handleImageError"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import MentionText from '../mention/MentionText.vue'

const props = defineProps({
  content: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['image-click'])

// 解析content内容，提取文字和图片
const parsedContent = computed(() => {
  if (!props.content) return { text: '', images: [] }
  
  // 创建临时DOM元素来解析HTML
  const tempDiv = document.createElement('div')
  tempDiv.innerHTML = props.content
  
  // 提取图片
  const imgElements = tempDiv.querySelectorAll('img')
  const images = Array.from(imgElements).map(img => img.src)
  
  // 移除图片元素，获取纯文本
  imgElements.forEach(img => img.remove())
  const text = tempDiv.textContent || tempDiv.innerText || ''
  
  return { text: text.trim(), images }
})

const text = computed(() => parsedContent.value.text)
const images = computed(() => parsedContent.value.images)

// 根据图片数量决定网格布局
const getGridClass = () => {
  const count = images.value.length
  if (count === 1) return 'single'
  if (count === 2) return 'double'
  if (count === 3) return 'triple'
  if (count === 4) return 'quad'
  return 'multiple'
}

// 图片加载失败处理
const handleImageError = (event) => {
  import('@/assets/imgs/未加载.png').then(module => {
    event.target.src = module.default
  })
}
</script>

<style scoped>
.comment-image-container {
  width: 100%;
}

.comment-text {
  margin-bottom: 8px;
  line-height: 1.5;
  word-wrap: break-word;
}

.comment-images {
  margin-top: 8px;
}

.images-grid {
  display: grid;
  gap: 4px;
  border-radius: 8px;
  overflow: hidden;
}

.images-grid.single {
  grid-template-columns: 1fr;
  max-width: 200px;
}

.images-grid.double {
  grid-template-columns: 1fr 1fr;
  max-width: 200px;
}

.images-grid.triple {
  grid-template-columns: 1fr 1fr 1fr;
  max-width: 240px;
}

.images-grid.quad {
  grid-template-columns: 1fr 1fr;
  max-width: 200px;
}

.images-grid.multiple {
  grid-template-columns: repeat(3, 1fr);
  max-width: 240px;
}

.image-item {
  position: relative;
  aspect-ratio: 1;
  cursor: pointer;
  border-radius: 4px;
  overflow: hidden;
  transition: transform 0.2s ease;
}

.image-item:hover {
  transform: scale(1.02);
}

.comment-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .images-grid.single {
    max-width: 150px;
  }
  
  .images-grid.double {
    max-width: 150px;
  }
  
  .images-grid.triple {
    max-width: 180px;
  }
  
  .images-grid.quad {
    max-width: 150px;
  }
  
  .images-grid.multiple {
    max-width: 180px;
  }
}
</style>