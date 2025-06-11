<template>
  <a-flex gap="small">
    <a-popover>
      <template #content>
        <a-flex gap="small">
          <div
            v-for="color in themeStore.colorPrimaryList"
            :key="color"
            class="color-primary-item"
            :style="{ background: color }"
            @click="themeStore.setColorPrimary(color)"
          />
        </a-flex>
      </template>
      <icon icon="palette" :style="{ color: themeStore.colorPrimary }" />
    </a-popover>

    <icon :icon="themeStore.isDarkTheme ? 'brightness' : 'moon'" @click="themeStore.toggleTheme" />

    <a-dropdown>
      <template #overlay>
        <a-menu :selectedKeys="[locale]" @click="({ key }) => setLocale(key)">
          <a-menu-item v-for="item in SUPPORTED_LOCALES" :key="item.value">
            {{ item.name }}
          </a-menu-item>
        </a-menu>
      </template>

      <icon :icon="GlobalOutlined" />
    </a-dropdown>

    <icon
      v-if="isPC"
      :icon="isFullscreen ? FullscreenExitOutlined : FullscreenOutlined"
      @click="toggle"
    />

    <template v-if="userStore.userInfo">
      <a-dropdown>
        <template #overlay>
          <a-menu>
            <a-menu-item @click="$router.push('/profile')">
              <SettingOutlined />
              <span class="menu-item-text">{{ $t('profile') }}</span>
            </a-menu-item>
            <a-menu-item @click="userStore.logout">
              <LogoutOutlined />
              <span class="menu-item-text">{{ $t('logout') }}</span>
            </a-menu-item>
          </a-menu>
        </template>
        <a-avatar :src="userStore.userInfo.avatar" class="user-avatar" />
      </a-dropdown>
    </template>
  </a-flex>
</template>

<script setup>
import {
  FullscreenExitOutlined,
  FullscreenOutlined,
  GlobalOutlined,
  LogoutOutlined,
  SettingOutlined,
} from '@ant-design/icons-vue';
import { useFullscreen } from '@vueuse/core';
import { inject } from 'vue';
import { useI18n } from 'vue-i18n';

import { setLocale, SUPPORTED_LOCALES } from '../locales';
import { useThemeStore } from '../store/theme';
import { useUserStore } from '../store/user';

const { isPC } = inject('isPC');

const themeStore = useThemeStore();
const userStore = useUserStore();
const { locale } = useI18n();
const { isFullscreen, toggle } = useFullscreen();
</script>

<style lang="less" scoped>
.color-primary-item {
  width: 28px;
  height: 28px;
  cursor: pointer;
  border-radius: var(--borderRadius);
}

.user-avatar {
  margin-left: 8px;
  cursor: pointer;
}

.menu-item-text {
  margin-left: 8px;
}
</style>
