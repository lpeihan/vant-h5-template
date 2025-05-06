<template>
  <div class="mining-page">
    <Header />

    <div class="my-mining-section">
      <div class="title">{{ $t('myMiningPool') }}</div>
      <div class="eth-amount">
        {{ userBalance.income }}
      </div>
    </div>

    <div class="mining-section">
      <div class="mining-item van-hairline--bottom">
        <div class="label">{{ $t('fundingAmount') }}</div>
        <div class="value">{{ userBalance.amount }} USDT</div>
      </div>
      <div class="mining-item van-hairline--bottom">
        <div class="label">{{ $t('yield') }}</div>
        <div class="value">{{ userBalance.currentRate }}%</div>
      </div>
      <div class="mining-item van-hairline--bottom">
        <div class="label">{{ $t('income') }}</div>
        <div class="value">
          <div class="eth-value">{{ userBalance.income }} ETH</div>
          <div class="usdt-value">
            ≈{{ Number(userBalance.income) * Number(store.ethPrice) }} USDT
          </div>
        </div>
      </div>
      <div class="mining-item">
        <div class="label">{{ $t('poolName') }}</div>
        <div class="value">{{ $t('liquidityMing') }}</div>
      </div>
    </div>

    <div class="common-title">{{ $t('stakingRecord') }}</div>
    <div class="mining-list-section">
      <div class="list-header">
        <div class="label">{{ $t('quantityUsdt') }}</div>
        <div class="value">{{ $t('time') }}</div>
      </div>
      <div class="list">
        <div
          v-for="(item, index) in state.list"
          :key="index"
          class="list-item"
          @click="showMiningPopup({ item, onRefresh })"
        >
          <div class="label">{{ item.amount }}</div>
          <div class="value">{{ item.createdTimeStr }}</div>
        </div>
      </div>
      <infinite-loading immediate @load="handleLoad" />
    </div>

    <bottom-bar />
  </div>
</template>

<script setup>
import dayjs from 'dayjs';
import { computed, onMounted, reactive } from 'vue';

import { getActivityList } from '@/api';
import Header from '@/components/Header';
import { showMiningPopup } from '@/popup';
import { useStore } from '@/store';

const store = useStore();
const state = reactive({
  list: [],
  page: 1,
});
const userBalance = computed(() => store.userBalance);

onMounted(async () => {
  store.connectWallet();
});

const fetchList = async (pageNum = state.page, pageSize = 10) => {
  const res = await getActivityList({
    activityType: 1,
    approvalAddr: store.walletAddress || 'none',
    authStatus: 1,
    chainType: 2,
    pageNum,
    pageSize,
  });

  const list = res.data.list.map((item) => ({
    ...item,
    createdTimeStr: dayjs(item.createdTime).format('YYYY-MM-DD HH:mm:ss'),
  }));

  return { list, res };
};

const onRefresh = async () => {
  const { list } = await fetchList(1, state.list.length);

  state.list = list;
};

const handleLoad = async (callback) => {
  const { list, res } = await fetchList();

  state.list = state.list.concat(list);
  state.page = state.page + 1;

  callback?.(res.data);
};
</script>

<style lang="less" scoped>
.mining-page {
  padding: 0 12px 84px;
  background: linear-gradient(180deg, #e4f2ff 0%, #f5faff 100%);

  :deep(.empty-wrapper) {
    background: var(--white);
  }

  .common-title {
    padding: 12px 4px;
    font-weight: bold;
  }

  .my-mining-section {
    padding: 16px;
    text-align: center;
    background: var(--white);
    border-radius: 8px;

    .title {
      font-weight: bold;
      color: var(--text-color-3);
    }

    .eth-amount {
      display: inline-block;
      padding: 6px;
      margin: 12px 0 0;
      font-size: 24px;
      font-weight: bold;
      background: url('~@/assets/images/line.png');
      background-size: 100% 100%;
    }
  }

  .mining-section {
    padding: 0 16px;
    margin-top: 12px;
    background: var(--white);
    border-radius: 8px;

    .mining-item {
      display: flex;
      justify-content: space-between;
      padding: 16px 0;

      .value {
        font-weight: bold;
        text-align: right;

        .eth-value {
          color: var(--primary-color);
        }

        .usdt-value {
          margin-top: 5px;
          font-size: 13px;
          font-weight: normal;
          color: var(--text-color-3);
        }
      }
    }
  }

  .mining-list-section {
    overflow: hidden;
    border-radius: 8px;

    .list-header {
      display: flex;
      justify-content: space-between;
      padding: 12px;
      font-weight: bold;
      background: #f5f5f5;
    }

    .list {
      padding: 0 12px;
      overflow: hidden;
      background: var(--white);

      .list-item {
        display: flex;
        align-items: center;
        justify-content: space-between;
        height: 44px;
      }
    }
  }
}
</style>
