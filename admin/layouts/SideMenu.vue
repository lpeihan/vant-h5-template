<template>
  <a-menu
    v-model:selectedKeys="state.selectedKeys"
    v-model:openKeys="state.openKeys"
    mode="inline"
    :theme="themeStore.theme"
    :items="state.menuData"
    style="border: none"
    @select="handleSelect"
  />
</template>

<script setup>
import { h, reactive, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRoute, useRouter } from 'vue-router';

import routes from '../router/routes';
import { useThemeStore } from '../store/theme';
import { hasRole } from '../utils/auth';

const SELECTED_KEYS_MAP = {};
const OPEN_KEYS_MAP = {};

const emit = defineEmits(['select']);
const props = defineProps({
  collapsed: {
    type: Boolean,
  },
});

const { locale, t } = useI18n();
const themeStore = useThemeStore();
const route = useRoute();
const router = useRouter();

const getMenuData = (items = [], parentKeys = [], selectedKey) => {
  const menuData = [];

  for (const item of items) {
    if (item.meta && item.meta.roles && !hasRole(item.meta.roles)) {
      continue;
    }

    if (item.name && !item.hideInMenu) {
      OPEN_KEYS_MAP[item.path] = parentKeys;
      SELECTED_KEYS_MAP[item.path] = [selectedKey || item.path];

      const newItem = {
        key: item.path,
        icon: item.meta.icon ? () => h(item.meta.icon) : null,
        label: t(item.meta.title),
      };

      if (item.children && !item.hideChildrenInMenu) {
        newItem.children = getMenuData(item.children, [...parentKeys, item.path]);
      } else {
        getMenuData(
          item.children,
          selectedKey ? parentKeys : [...parentKeys, item.path],
          selectedKey || item.path,
        );
      }
      menuData.push(newItem);
    } else if (!item.hideInMenu && !item.hideChildrenInMenu && item.children) {
      menuData.push(...getMenuData(item.children, [...parentKeys, item.path]));
    }
  }

  return menuData;
};

const state = reactive({
  menuData: getMenuData(routes),
  selectedKeys: [],
  openKeys: [],
});

watch(locale, () => {
  state.menuData = getMenuData(routes);
});

watch(
  route,
  (value, oldValue) => {
    const selectedKeys = SELECTED_KEYS_MAP[route.path];
    const openKeys = OPEN_KEYS_MAP[route.path];

    if (selectedKeys && openKeys) {
      state.selectedKeys = selectedKeys;
      state.openKeys = props.collapsed && !oldValue ? [] : [...state.openKeys, ...openKeys];
    } else {
      state.selectedKeys = [];
    }
  },
  { immediate: true },
);

const handleSelect = ({ key }) => {
  router.push(key);
  emit('select');
};
</script>

<style lang="less" scoped>
.ant-menu {
  &.ant-menu-dark {
    background: var(--colorBgContainer);

    :deep(.ant-menu-inline) {
      background: var(--colorBgContainer);
    }
  }
}
</style>
