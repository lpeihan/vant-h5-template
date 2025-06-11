<template>
  <div class="basic-layout">
    <a-layout style="min-height: 100vh">
      <a-layout-sider v-model:collapsed="collapsed" width="240px" :theme="themeStore.theme">
        <div class="logo-wrapper">
          <img src="../assets/images/logo.png" alt="logo" />
        </div>

        <SideMenu :collapsed="collapsed" />
      </a-layout-sider>

      <a-layout>
        <Header :handleCollapse="handleCollapse" :collapsed="collapsed" />

        <a-layout-content style="padding: 12px">
          <router-view />
        </a-layout-content>
      </a-layout>
    </a-layout>
  </div>
</template>

<script setup>
import { useMediaQuery, useStorage } from '@vueuse/core';
import { provide } from 'vue';

import { useThemeStore } from '../store/theme';

import Header from './Header.vue';
import SideMenu from './SideMenu.vue';

const isPC = useMediaQuery('(min-width: 768px)');
const themeStore = useThemeStore();
const collapsed = useStorage('collapsed', false);

provide('isPC', isPC);

const handleCollapse = () => {
  collapsed.value = !collapsed.value;
};
</script>

<style lang="less" scoped>
.basic-layout {
  .logo-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 64px;

    img {
      width: 36px;
    }
  }

  .ant-layout-sider-light {
    border-right: 1px solid var(--colorBorderSecondary);
  }

  .ant-layout-sider-dark {
    background: var(--colorBgContainer);
  }
}
</style>
