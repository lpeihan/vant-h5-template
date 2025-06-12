<template>
  <a-modal
    v-model:open="state.open"
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
      class="!pt-[20px]"
      :label-col="{ style: { width: '80px' } }"
    >
      <a-form-item label="旧密码" name="oldPassword">
        <a-input-password v-model:value="form.oldPassword" />
      </a-form-item>
      <a-form-item label="新密码" name="newPassword">
        <a-input-password v-model:value="form.newPassword" />
      </a-form-item>
      <a-form-item label="确认密码" name="confirmPassword">
        <a-input-password v-model:value="form.confirmPassword" />
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script setup>
import { reactive, ref } from 'vue';

import { showSuccessMessage, sleep } from '../../utils';

const state = reactive({
  open: false,
  confirmLoading: false,
});

const formRef = ref(null);
const form = reactive({
  oldPassword: '',
  newPassword: '',
  confirmPassword: '',
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

defineExpose({
  openModal: () => (state.open = true),
});
</script>
