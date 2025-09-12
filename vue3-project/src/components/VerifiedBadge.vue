<template>
  <div class="verified-badge" v-if="verified" :class="sizeClass">
    <SvgIcon name="verified"/>
    <div class="tooltip">{{ title }}</div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import SvgIcon from '@/components/SvgIcon.vue'

const props = defineProps({
  verified: {
    type: [Boolean, Number],
    default: false
  },
  title: {
    type: String,
    default: '官方认证账号'
  },
  size: {
    type: String,
    default: 'medium',
    validator: (value) => ['small', 'medium', 'large'].includes(value)
  }
})

const sizeClass = computed(() => {
  return `verified-badge--${props.size}`
})
</script>

<style scoped>
.verified-badge {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background-color: var(--primary-color);
  border: 1px solid var(--primary-color);
  border-radius: 50%;
  margin-left: 4px;
  flex-shrink: 0;
  cursor: pointer;
  color: #fff;
}

.verified-badge--small {
  width: 11px;
  height: 11px;
  margin-left: 0px;
}

.verified-badge--medium {
  width: 13px;
  height: 13px;
  margin-left: 0px;
}

.verified-badge--large {
  width: 16px;
  height: 16px;
}

/* Tooltip */
.verified-badge .tooltip {
  position: absolute;
  left: 50%;
  bottom: 100%;
  transform: translateX(-50%);
  margin-bottom: 8px;
  background: var(--bg-color-primary);
  color: var(--text-color-primary);
  padding: 4px 8px;
  border-radius: 6px;
  font-size: 12px;
  white-space: nowrap;
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.2s ease, visibility 0.2s ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  border: 1px solid var(--border-color-primary);
  z-index: 10;
  pointer-events: none;
}

@media (max-width: 768px) {
  .verified-badge .tooltip {
    display: none;
  }
}

.verified-badge:hover .tooltip {
  opacity: 1;
  visibility: visible;
}
</style>