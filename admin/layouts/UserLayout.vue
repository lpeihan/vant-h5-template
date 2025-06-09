<template>
  <a-config-provider :theme="{ token: { controlHeight: 40 } }">
    <div class="user-layout">
      <router-view />
    </div>
  </a-config-provider>
</template>

<style lang="less" scoped>
.user-layout {
  height: 100vh;
  background: var(--colorBgContainer) url('../assets/images/bg.svg') no-repeat;
  background-size: 100% 100%;
}
</style>
