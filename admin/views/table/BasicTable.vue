<template>
  <div class="basic-table-page">
    <a-card>
      <a-form layout="inline" :model="searchParams" class="basic-table-form" @finish="handleSearch">
        <a-form-item label="邮箱" name="email">
          <a-input v-model:value="searchParams.email" allow-clear placeholder="请输入邮箱" />
        </a-form-item>

        <a-form-item label="状态" name="status">
          <a-select
            v-model:value="searchParams.status"
            allow-clear
            placeholder="请选择状态"
            @change="handleSearch"
          >
            <a-select-option value="1">启用</a-select-option>
            <a-select-option value="0">禁用</a-select-option>
          </a-select>
        </a-form-item>

        <a-form-item>
          <a-button @click="handleReset">重置</a-button>
          <a-button type="primary" html-type="submit">搜索</a-button>
        </a-form-item>
      </a-form>
    </a-card>
    <a-card>
      <a-table v-bind="tableProps">
        <template #bodyCell="{ column, text }">
          <template v-if="column.dataIndex === 'avatar'">
            <a-avatar :src="text" />
          </template>

          <template v-if="column.dataIndex === 'email'">
            <a @click="copy(text)">
              {{ text }}
            </a>
          </template>

          <template v-if="column.dataIndex === 'action'">
            <a-button size="small" type="link">编辑</a-button>
          </template>
        </template>
      </a-table>
    </a-card>
  </div>
</template>

<script setup>
import { fetchUserList } from '../../api';
import { useClipboard } from '../../hooks/useClipboard';
import { useTable } from '../../hooks/useTable';

const columns = [
  {
    title: 'ID',
    dataIndex: 'id',
    sorter: true,
    fixed: 'left',
    width: 100,
  },
  {
    title: '用户名',
    dataIndex: 'name',
    width: 200,
  },
  {
    title: '头像',
    dataIndex: 'avatar',
    width: 150,
  },
  {
    title: '邮箱',
    dataIndex: 'email',
    width: 200,
  },
  {
    title: '创建时间',
    dataIndex: 'created_at',
    width: 200,
  },
  {
    title: '更新时间',
    dataIndex: 'updated_at',
    width: 200,
  },
  {
    title: '操作',
    dataIndex: 'action',
    fixed: 'right',
    width: 100,
  },
];

const { copy } = useClipboard();

const { tableProps, searchParams, handleSearch, handleReset } = useTable({
  columns,
  request: fetchUserList,
  // selectable: true,
});
</script>
