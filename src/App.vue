<template>
  <van-config-provider theme="light">
    <div class="app-root">
      <router-view v-slot="{ Component }">
        <keep-alive :include="state.keepAlive">
          <component :is="Component" />
        </keep-alive>
      </router-view>
    </div>
  </van-config-provider>
</template>

<script setup>
import { reactive } from 'vue';

const state = reactive({
  keepAlive: [],
});
</script>

<style lang="less">
.app-root {
  height: 100vh;
  -webkit-overflow-scrolling: touch;
}

.app-view {
  position: relative;
  min-height: 100%;
}
</style>
