<template>
  <div class="exchange-records">
    <topBar :title="$t('withdrawRecords')" />

    <div class="exchange-list">
      <div v-for="item in state.list" :key="item.id" class="exchange-item">
        <div class="item">
          <div class="label">{{ $t('withdrawAmount') }}</div>
          <div class="value">{{ item.operationAmount }} USDT</div>
        </div>
        <div class="item">
          <div class="label">
            {{ $t('withdrawStatus') }}
          </div>
          <div class="value status" :class="'status-' + item.operationStatus">
            {{ getStatusText(item.operationStatus) }}
          </div>
        </div>
        <div class="item">
          <div class="label">{{ $t('withdrawTime') }}</div>
          <div class="value">{{ formatDate(item.createdTime) }}</div>
        </div>
        <div class="item">
          <div class="label">{{ $t('updateTime') }}</div>
          <div class="value">{{ formatDate(item.updatedTime) }}</div>
        </div>
      </div>

      <infinite-loading @load="handleLoad" />
    </div>
  </div>
</template>

<script setup>
import { reactive } from 'vue';
import { useI18n } from 'vue-i18n';

import { getUserAssetList } from '@/api';
import { useStore } from '@/store';
import { formatDate } from '@/utils';

const store = useStore();
const { t } = useI18n();
const state = reactive({
  list: [],
  page: 1,
});

const handleLoad = async (callback) => {
  const res = await getUserAssetList({
    operationType: 4,
    approvalAddr: store.walletAddress || 'none',
    chainType: 2,
    pageNum: state.page,
    pageSize: 10,
  });

  const list = res.data.list.map((item) => ({
    ...item,
  }));

  state.list = state.list.concat(list);
  state.page = state.page + 1;
  callback?.(res.data);
};

const getStatusText = (status) => {
  const map = {
    0: t('goingOn'),
    2: t('success'),
    1: t('failed'),
  };

  return map[status] || map[0];
};
</script>

<style lang="less" scoped>
.exchange-records {
  padding: 0 12px;

  .exchange-list {
    .exchange-item {
      align-items: center;
      padding: 12px 12px 0;
      margin-top: 12px;
      background: var(--white);
      border-radius: 8px;

      .item {
        display: flex;
        justify-content: space-between;
        padding-bottom: 12px;

        .label {
          font-size: 13px;
          color: var(--text-color-3);
        }
      }

      .status {
        &.status-0 {
          color: #333;
        }

        &.status-2 {
          color: #10b398;
        }

        &.status-3 {
          color: #fa5757;
        }
      }
    }
  }
}
</style>
