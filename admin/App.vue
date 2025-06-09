<template>
  <a-config-provider :locale="state.antdLocale" :theme="themeStore.antdThemeConfig">
    <router-view />
  </a-config-provider>
</template>

<script setup>
import { theme } from 'ant-design-vue';
import { reactive, watch } from 'vue';
import { useI18n } from 'vue-i18n';

import { getAntdLocale } from './locales';
import { useThemeStore } from './store/theme';

const { useToken } = theme;
const { token } = useToken();
const themeStore = useThemeStore();
const { locale } = useI18n();

const state = reactive({
  antdLocale: getAntdLocale(),
});

watch(locale, () => {
  state.antdLocale = getAntdLocale();
});

watch(
  token,
  () => {
    themeStore.applyAntdCssVariablesViaStyle(token.value);
  },
  {
    immediate: true,
  },
);
</script>
