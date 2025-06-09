import { theme } from 'ant-design-vue';
import { defineStore } from 'pinia';

import storage from '../utils/storage';

const COLOR_PRIMARY_LIST = [
  '#f7234f',
  '#FA541C',
  '#FAAD14',
  '#13C2C2',
  '#52C41A',
  '#1890FF',
  '#2F54EB',
  '#722ED1',
];

enum Theme {
  Light = 'light',
  Dark = 'dark',
}

const isDarkTheme = (theme) => theme === Theme.Dark;

let cssVarStyleEl;

export const useThemeStore = defineStore('theme', {
  state: () => ({
    theme: storage.getItem('theme') || Theme.Light,
    colorPrimary: storage.getItem('colorPrimary') || '#1890FF',
  }),
  actions: {
    setTheme(theme) {
      this.theme = theme;

      storage.setItem('theme', this.theme);
      document.documentElement.setAttribute('data-theme', this.theme);
    },
    toggleTheme() {
      this.setTheme(this.isDarkTheme ? Theme.Light : Theme.Dark);
    },
    setColorPrimary(color) {
      this.colorPrimary = color;

      storage.setItem('colorPrimary', this.colorPrimary);
      document.documentElement.style.setProperty('--primary-color', this.colorPrimary);
    },
    initTheme() {
      this.setTheme(this.theme);
    },
    initColorPrimary() {
      this.setColorPrimary(this.colorPrimary);
    },
    // 将 ant-design-vue 的 token 应用到 css 变量中
    applyAntdCssVariablesViaStyle(token) {
      const cssLines = [];

      Object.entries(token).forEach(([key, value]) => {
        const cssVar = `--${key}`;
        cssLines.push(`${cssVar}: ${value};`);
      });

      const css = `:root {\n  ${cssLines.join('\n  ')}\n}`;

      if (cssVarStyleEl) {
        cssVarStyleEl.innerHTML = css;
        return;
      }

      cssVarStyleEl = document.createElement('style');
      document.head.appendChild(cssVarStyleEl);
    },
  },
  getters: {
    colorPrimaryList: () => COLOR_PRIMARY_LIST,
    isDarkTheme: (state) => isDarkTheme(state.theme),
    antdThemeConfig: (state) => ({
      algorithm: isDarkTheme(state.theme) ? theme.darkAlgorithm : theme.defaultAlgorithm,
      token: {
        colorPrimary: state.colorPrimary,
        controlHeight: 36,
        borderRadius: 4,
      },
    }),
  },
});
