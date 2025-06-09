<template>
  <div class="analysis-page">
    <a-row :gutter="[12, 12]">
      <a-col v-for="item in overviews" :key="item.title" :xs="24" :sm="12" :lg="6">
        <a-card hoverable class="overview-item">
          <div class="title">
            {{ item.title }}
          </div>

          <div class="icon-wrapper">
            <div class="value">{{ item.value.toLocaleString() }}</div>
            <svg-icon :name="item.icon" />
          </div>

          <div class="total-wrapper">
            <div class="total-title">{{ item.totalTitle }}</div>
            <div class="total-value">
              {{ item.totalValue.toLocaleString() }}
            </div>
          </div>
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>

<script setup>
import { computed } from 'vue';

const overviews = computed(() => [
  {
    icon: 'card',
    title: '用户',
    totalTitle: '总用户',
    totalValue: 120_000,
    value: 2000,
  },
  {
    icon: 'cake',
    title: '访问',
    totalTitle: '总访问',
    totalValue: 500_000,
    value: 20_000,
  },
  {
    icon: 'download',
    title: '下载',
    totalTitle: '总下载',
    totalValue: 120_000,
    value: 8000,
  },
  {
    icon: 'bell',
    title: '用户',
    totalTitle: '总用户',
    totalValue: 50_000,
    value: 5000,
  },
]);
</script>

<style lang="less" scoped>
.analysis-page {
  .overview-item {
    .title {
      font-size: 16px;
      font-weight: bold;
    }

    .icon-wrapper {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 16px 0;

      .value {
        font-size: 18px;
      }

      .svg-icon {
        width: 40px;
        height: 40px;
      }
    }

    .total-wrapper {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
  }
}
</style>
