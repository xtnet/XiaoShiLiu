<template>
  <div class="invite-codes-management">

    <!-- 批量创建邀请码 -->
    <div class="batch-create-section">
      <div class="batch-header">
        <h3>批量创建邀请码</h3>
        <p class="batch-description">一次性生成多个邀请码</p>
      </div>
      <div class="batch-content">
        <div class="batch-controls">
          <input 
            type="number" 
            v-model="batchCount" 
            min="1" 
            max="100" 
            placeholder="输入数量 (1-100)"
            class="batch-input"
          />
          <button 
            @click="handleBatchCreate" 
            :disabled="!batchCount || batchCount < 1 || batchCount > 100"
            class="batch-btn"
          >
            批量创建
          </button>
        </div>
      </div>
    </div>

    <!-- 邀请码列表 -->
    <CrudTable 
      title="邀请码管理" 
      entity-name="邀请码" 
      api-endpoint="/invite-codes" 
      :columns="columns" 
      :form-fields="formFields"
      :search-fields="searchFields"
      :hide-create="true"
      :hide-edit="false"
      :custom-actions="customActions"
      :custom-load-data="customLoadData"
      default-sort-field="id"
      default-sort-order="desc"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import CrudTable from '@/views/admin/components/CrudTable.vue'
import messageManager from '@/utils/messageManager'

const batchCount = ref(10)

// 邀请码列表配置
const columns = [
  { key: 'id', label: 'ID', sortable: true },
  { 
    key: 'code', 
    label: '邀请码', 
    sortable: false,
    html: true,
    formatter: (value, item) => {
      if (item.is_active === 1) {
        return `
          <span 
            class="click-to-copy"
            style="
              color: var(--primary-color);
              cursor: pointer;
              border-bottom: 1px dashed var(--primary-color);
              padding-bottom: 1px;
            "
            data-code="${value}"
            title="点击复制邀请码"
          >
            ${value}
          </span>
        `
      }
      return value
    }
  },
  { 
    key: 'is_active', 
    label: '状态', 
    sortable: true,
    formatter: (value) => value === 1 ? '未使用' : '已使用'
  },
  { key: 'created_at', label: '创建时间', type: 'date', sortable: true },
  { key: 'used_at', label: '使用时间', type: 'date', sortable: true }
]

const formFields = [
  { key: 'code', label: '邀请码', type: 'text', required: true, readonly: false, maxlength: "8" },
  { key: 'is_active', label: '状态', type: 'select', options: [
    { value: 1, label: '未使用' },
    { value: 2, label: '已使用' }
  ] }
]

const searchFields = [
  { key: 'code', label: '邀请码', placeholder: '搜索邀请码' },
  { 
    key: 'is_active', 
    label: '状态', 
    type: 'select', 
    placeholder: '全部',
    options: [
      { value: '', label: '全部' },
      { value: '1', label: '未使用' },
      { value: '2', label: '已使用' }
    ]
  }
]

// 移除自定义操作，因为复制功能已集成在邀请码列中
const customActions = []

// 处理点击复制事件
const setupCopyButtons = () => {
  // 添加事件委托处理点击复制
  document.addEventListener('click', (e) => {
    if (e.target.classList.contains('click-to-copy')) {
      e.stopPropagation();
      const code = e.target.getAttribute('data-code');
      // 兼容性处理：使用navigator.clipboard或回退到传统方法
      if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(code)
          .then(() => {
            messageManager.success('邀请码已复制到剪贴板')
          })
          .catch(err => {
            console.error('复制失败:', err)
            fallbackCopyTextToClipboard(code)
          })
      } else {
        fallbackCopyTextToClipboard(code)
      }
    }
  });
}

// 传统的复制到剪贴板的回退方法
const fallbackCopyTextToClipboard = (text) => {
  const textArea = document.createElement('textarea')
  textArea.value = text
  textArea.style.position = 'fixed'
  textArea.style.left = '-999999px'
  textArea.style.top = '-999999px'
  document.body.appendChild(textArea)
  textArea.focus()
  textArea.select()
  
  try {
    const successful = document.execCommand('copy')
    if (successful) {
      messageManager.success('邀请码已复制到剪贴板')
    } else {
      messageManager.warning('复制失败，请手动复制')
    }
  } catch (err) {
    console.error('复制失败:', err)
    messageManager.warning('复制失败，请手动复制')
  }
  
  document.body.removeChild(textArea)
}

// 自定义数据加载方法，用于处理API返回的数据格式
const customLoadData = async (page, limit, searchParams, sortField, sortOrder) => {
  try {
    const params = new URLSearchParams({
      page,
      limit,
      ...searchParams
    })

    // 添加排序参数
    if (sortField && sortOrder) {
      params.append('sortField', sortField)
      params.append('sortOrder', sortOrder)
    }

    const response = await fetch(`/api/invite-codes?${params}`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('admin_token')}`
      }
    })
    
    const result = await response.json()
    
    if (result.code === 200) {
      // 转换数据格式：将items转换为data
      return {
        data: result.data.items || [],
        pagination: {
          page: result.data.page || page,
          limit: result.data.limit || limit,
          total: result.data.total || 0,
          pages: Math.ceil((result.data.total || 0) / (result.data.limit || limit))
        }
      }
    } else {
      console.error('加载数据失败:', result.message)
      return {
        data: [],
        pagination: { page, limit, total: 0, pages: 0 }
      }
    }
  } catch (error) {
    console.error('加载数据失败:', error)
    return {
      data: [],
      pagination: { page, limit, total: 0, pages: 0 }
    }
  }
}



// 处理批量创建
const handleBatchCreate = async () => {
  if (!batchCount.value || batchCount.value < 1 || batchCount.value > 100) {
    messageManager.warning('请输入1-100之间的数量')
    return
  }

  try {
    const response = await fetch('/api/invite-codes/batch', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('admin_token')}`
      },
      body: JSON.stringify({ count: batchCount.value })
    })

    if (response.ok) {
      const result = await response.json()
      messageManager.success(`成功创建 ${result.data.affectedRows} 个邀请码`)
      
      // 刷新列表
      window.dispatchEvent(new CustomEvent('refresh-table'))
    } else {
      const error = await response.json()
      messageManager.error(error.message || '创建失败')
    }
  } catch (error) {
    console.error('批量创建邀请码失败:', error)
    messageManager.error('网络错误，请稍后重试')
  }
}

// 初始化设置
onMounted(() => {
  // 设置复制按钮点击事件处理
  setupCopyButtons();
})
</script>

<style scoped>
.invite-codes-management {
  padding: 20px;
}

.batch-create-section {
  background: var(--bg-color-primary);
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 20px;
  border: 1px solid var(--border-color-primary);
}

.batch-header {
  margin-bottom: 15px;
}

.batch-header h3 {
  margin: 0 0 5px 0;
  font-size: 16px;
  font-weight: 600;
  color: var(--text-color-primary);
}

.batch-description {
  margin: 0;
  font-size: 14px;
  color: var(--text-color-secondary);
}

.batch-controls {
  display: flex;
  gap: 10px;
  align-items: center;
}

.batch-input {
  padding: 8px 12px;
  border: 1px solid var(--border-color-primary);
  border-radius: 4px;
  background: var(--bg-color-secondary);
  color: var(--text-color-primary);
  width: 200px;
}

.batch-input:focus {
  outline: none;
  border-color: var(--primary-color);
}

.batch-btn {
  padding: 8px 16px;
  background: var(--primary-color);
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background 0.3s;
}

.batch-btn:hover:not(:disabled) {
  background: var(--primary-color-dark);
}

.batch-btn:disabled {
  background: var(--border-color-primary);
  cursor: not-allowed;
}
</style>