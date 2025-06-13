<template>
  <a-card>
    <a-form
      :label-col="{ style: { width: '120px' } }"
      :wrapper-col="{ span: 12 }"
      labelAlign="left"
    >
      <a-form-item label="用户名">
        <span class="font-bold text-[var(--primary-color)]">{{ userInfo.name }}</span>
      </a-form-item>
      <a-form-item label="头像">
        <a-avatar :src="userInfo.avatar" />
      </a-form-item>
      <a-form-item label="说明">
        <a-textarea v-model:value="userInfo.description" />
      </a-form-item>
      <a-form-item label="密码">
        <a-button type="primary" size="small" @click="() => passwordModal.openModal()">
          修改密码
        </a-button>
      </a-form-item>
    </a-form>

    <PasswordModal ref="passwordModal" />
  </a-card>
</template>
<script setup>
import { computed, useTemplateRef } from 'vue';

import { useUserStore } from '../../store/user';

import PasswordModal from './PasswordModal.vue';

const userStore = useUserStore();
const passwordModal = useTemplateRef('passwordModal');

const userInfo = computed(() => userStore.userInfo);
</script>
