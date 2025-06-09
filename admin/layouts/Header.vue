<template>
  <a-layout-header
    :style="{
      background: token.colorBgContainer,
    }"
  >
    <a-flex gap="small" align="center">
      <icon
        :icon="props.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined"
        @click="props.handleCollapse"
      />

      <icon v-if="props.isPC" :icon="ReloadOutlined" @click="handleReload" />

      <a-breadcrumb v-if="props.isPC" style="margin-left: 4px">
        <a-breadcrumb-item
          v-for="(breadcrumb, index) in breadcrumbs"
          :key="index"
          :style="{ cursor: breadcrumb.clickable ? 'pointer' : null }"
          @click="breadcrumb.clickable && navigateTo(breadcrumb)"
        >
          <!-- <component :is="breadcrumb.icon" v-if="breadcrumb.icon" /> -->
          <span>{{ breadcrumb.name }}</span>
        </a-breadcrumb-item>
      </a-breadcrumb>
    </a-flex>

    <Settings :isPC="props.isPC" />
  </a-layout-header>
</template>

<script setup>
import { MenuFoldOutlined, MenuUnfoldOutlined, ReloadOutlined } from '@ant-design/icons-vue';
import { theme } from 'ant-design-vue';
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRoute, useRouter } from 'vue-router';

import Settings from './Settings.vue';

const { useToken } = theme;

const props = defineProps({
  handleCollapse: {
    type: Function,
    required: true,
  },
  collapsed: {
    type: Boolean,
    required: true,
  },
  isPC: {
    type: Boolean,
  },
});

const route = useRoute();
const router = useRouter();
const { t } = useI18n();
const { token } = useToken();

const breadcrumbs = computed(() => {
  const pathArray = route.path.split('/').filter((p) => p);
  return pathArray.map((path, index) => {
    const fullPath = '/' + pathArray.slice(0, index + 1).join('/');
    const matchedRoute = router.getRoutes().find((r) => r.path === fullPath);

    const isLastItem = index === pathArray.length - 1;
    const isLayout = matchedRoute?.meta?.layout || false;
    const name = matchedRoute?.meta?.title;

    return {
      name: name && t(name),
      path: fullPath,
      icon: matchedRoute?.meta?.icon || null,
      clickable: !isLastItem && !isLayout,
      children: matchedRoute?.children || [],
    };
  });
});

const handleReload = () => {
  window.location.reload();
};

const navigateTo = (breadcrumb) => {
  const { children, path } = breadcrumb;

  if (children.length > 0) {
    router.push(children[0].path);
  } else {
    router.push(path);
  }
};
</script>

<style lang="less" scoped>
.ant-layout-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 16px;
}
</style>
