<template>
  <div class="login-page">
    <div class="settings-wrapper">
      <Settings />
    </div>

    <div class="login-form">
      <div class="logo-wrapper">
        <img src="../../assets/images/logo.png" alt="logo" width="48" />
        <span class="logo-text">Antdv Admin</span>
      </div>

      <a-form :model="form" name="basic" autocomplete="off" @finish="onFinish">
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

        <div class="remember-me">
          <a-checkbox v-model:checked="form.remember">
            {{ $t('rememberMe') }}
          </a-checkbox>

          <a>
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

<style lang="less" scoped>
.login-page {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;

  .settings-wrapper {
    position: fixed;
    top: 16px;
    right: 16px;
  }

  .login-form {
    .logo-wrapper {
      display: flex;
      gap: 12px;
      align-items: center;
      justify-content: center;

      .logo-text {
        font-size: 20px;
        font-weight: 600;
      }
    }

    .ant-form {
      width: 360px;
      margin: 40px auto 0;
    }

    .remember-me {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin: 32px 0;

      a {
        color: var(--primary-color);
      }
    }
  }
}
</style>
