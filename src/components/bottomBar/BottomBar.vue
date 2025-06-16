<template>
  <ul class="bottom-bar">
    <li
      v-for="item in list"
      :key="item.name"
      class="bar-item"
      :class="{ active: $route.path === item.path }"
      @click="handleClick(item)"
    >
      <img class="icon" :src="$route.path === item.path ? item.activeIcon : item.icon" />
      <p class="text">{{ item.name }}</p>
    </li>
  </ul>
</template>

<script setup>
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';

const router = useRouter();
const { t } = useI18n();

const list = computed(() => {
  return [
    {
      name: t('home'),
      path: '/',
      icon: require('./images/home.png'),
      activeIcon: require('./images/home_active.png'),
    },
    {
      name: t('mining'),
      path: '/mining',
      icon: require('./images/mining.png'),
      activeIcon: require('./images/mining_active.png'),
    },
    {
      name: t('service'),
      path: '/service',
      icon: require('./images/service.png'),
      activeIcon: require('./images/service_active.png'),
    },
    {
      name: t('user'),
      path: '/user',
      icon: require('./images/user.png'),
      activeIcon: require('./images/user_active.png'),
    },
  ];
});

const handleClick = (item) => {
  router.push(item.path);
};
</script>

<style lang="less" scoped>
@keyframes scale {
  50% {
    transform: scale(0.8);
  }
}

.bottom-bar {
  position: fixed;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 10;
  display: flex;
  align-items: center;
  height: var(--bottom-bar-height);
  padding: 0 0 2px;
  background: var(--van-white);
  box-shadow: 0 0 1px rgba(#c1c1c1, 0.5);

  .bar-item {
    flex: 1;
    text-align: center;

    &.active {
      animation: scale 0.3s ease-in;

      .text {
        position: relative;
        color: var(--van-primary-color);
      }
    }

    .icon {
      width: 20px;
      height: 20px;
    }

    .text {
      font-size: 12px;
      color: var(--van-text-color-2);
    }
  }
}
</style>
