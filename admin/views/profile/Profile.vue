<template>
  <a-card>
    <a-form
      :label-col="{ style: { width: '120px' } }"
      :wrapper-col="{ span: 12 }"
      labelAlign="left"
    >
      <a-form-item label="用户名">
        <span class="user-name">{{ userStore.userInfo.name }}</span>
      </a-form-item>
      <a-form-item label="头像">
        <a-avatar :src="userStore.userInfo.avatar" />
      </a-form-item>
      <a-form-item label="说明">
        <a-textarea v-model:value="userStore.userInfo.description" />
      </a-form-item>
      <a-form-item label="密码">
        <a-button type="primary" size="small" @click="state.isShowModal = true">修改密码</a-button>
      </a-form-item>
    </a-form>

    <a-modal
      v-model:open="state.isShowModal"
      title="修改密码"
      :maskClosable="false"
      :confirmLoading="state.confirmLoading"
      @ok="handleChangePassword"
    >
      <a-form
        ref="formRef"
        :model="form"
        :rules="{
          oldPassword: [{ required: true, message: '' }],
          newPassword: [{ required: true, message: '' }],
          confirmPassword: [{ required: true, message: '' }],
        }"
        class="change-password-form"
        :label-col="{ style: { width: '80px' } }"
      >
        <a-form-item label="旧密码" name="oldPassword">
          <a-input v-model:value="form.oldPassword" type="password" />
        </a-form-item>
        <a-form-item label="新密码" name="newPassword">
          <a-input v-model:value="form.newPassword" type="password" />
        </a-form-item>
        <a-form-item label="确认密码" name="confirmPassword">
          <a-input v-model:value="form.confirmPassword" type="password" />
        </a-form-item>
      </a-form>
    </a-modal>
  </a-card>
</template>
<script setup>
import { reactive, ref } from 'vue';

import { useUserStore } from '../../store/user';
import { showSuccessMessage, sleep } from '../../utils';

const userStore = useUserStore();

const formRef = ref(null);
const form = reactive({
  oldPassword: 'password',
  newPassword: 'password',
  confirmPassword: 'password',
});

const state = reactive({
  isShowModal: false,
  confirmLoading: false,
});

const handleChangePassword = () => {
  formRef.value.validate().then(async () => {
    state.confirmLoading = true;
    await sleep(3000);

    state.confirmLoading = false;
    state.isShowModal = false;
    showSuccessMessage();
  });
};
</script>

<style lang="less" scoped>
.user-name {
  font-weight: bold;
  color: var(--primary-color);
}

.change-password-form {
  padding: 30px 0 0 10px;
}
</style>
