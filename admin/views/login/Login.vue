<template>
  <div class="flex items-center justify-center h-screen">
    <div class="fixed top-[16px] right-[16px]">
      <Settings />
    </div>

    <div>
      <div class="flex items-center justify-center gap-3 mb-[30px]">
        <img src="../../assets/images/logo.png" alt="logo" width="48" />
        <span class="text-xl font-bold">Antdv Admin</span>
      </div>

      <a-form :model="form" name="basic" autocomplete="off" class="w-[360px]" @finish="onFinish">
        <a-form-item name="username" :rules="{ required: true, message: '' }">
          <a-input v-model:value="form.username" :placeholder="$t('username')">
            <template #prefix>
              <UserOutlined />
            </template>
          </a-input>
        </a-form-item>

        <a-form-item name="password" :rules="{ required: true, message: '' }">
          <a-input-password v-model:value="form.password" :placeholder="$t('password')">
            <template #prefix>
              <LockOutlined />
            </template>
          </a-input-password>
        </a-form-item>

        <div class="flex items-center justify-between my-[30px]">
          <a-checkbox v-model:checked="form.remember">
            {{ $t('rememberMe') }}
          </a-checkbox>

          <a class="text-[var(--primary-color)]">
            {{ $t('forgotPassword') }}
          </a>
        </div>

        <a-button type="primary" html-type="submit" block>
          {{ $t('login') }}
        </a-button>
      </a-form>
    </div>
  </div>
</template>
<script setup>
import { LockOutlined, UserOutlined } from '@ant-design/icons-vue';
import { reactive } from 'vue';
import { useRouter } from 'vue-router';

import Settings from '../../layouts/Settings.vue';
import { useUserStore } from '../../store/user';

const userStore = useUserStore();
const router = useRouter();

const form = reactive({
  username: 'User',
  password: '123456',
  remember: true,
});

const onFinish = async () => {
  await userStore.login(form);

  router.push('/');
};
</script>
