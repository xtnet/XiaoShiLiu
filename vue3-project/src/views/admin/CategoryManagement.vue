<template>
  <div class="category-management">
    <CrudTable
      title="分类管理"
      :columns="columns"
      :form-fields="formFields"
      :search-fields="searchFields"
      :api-endpoint="apiEndpoints.list"
      entity-name="分类"
      :show-create="true"
      :show-edit="true"
      :show-delete="true"
      :show-detail="false"
    />
  </div>
</template>

<script setup>
import CrudTable from '@/views/admin/components/CrudTable.vue'

const columns = [
  { key: 'id', label: 'ID', sortable: true },
  { key: 'name', label: '分类名称', sortable: true },
  { key: 'created_at', label: '创建时间', sortable: true, type: 'date' }
]

const formFields = [
  {
    key: 'name',
    label: '分类名称',
    type: 'text',
    required: true,
    placeholder: '请输入分类名称',
    maxlength: 50
  }
]

const searchFields = [
  {
    key: 'name',
    label: '分类名称',
    type: 'text',
    placeholder: '请输入分类名称'
  }
]

const apiEndpoints = {
  list: '/categories',
  create: '/categories',
  update: '/categories',
  delete: '/categories'
}
</script>

<style scoped>
.category-management {
  padding: 0;
}
</style>