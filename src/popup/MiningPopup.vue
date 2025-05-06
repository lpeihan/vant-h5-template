<template>
  <van-popup
    v-model:show="state.show"
    round
    :close-on-click-overlay="false"
    closeable
    class="transfer-popup"
  >
    <div class="popup-content">
      <div class="title">{{ $t('stake') }}</div>

      <div class="mining-list">
        <div class="mining-item">
          <div class="label">{{ $t('fundingAmount') }}</div>
          <div class="value">{{ props.item.amount }} USDT</div>
        </div>
        <div class="mining-item">
          <div class="label">{{ $t('yield') }}</div>
          <div class="value">{{ props.item.currentRate }}%</div>
        </div>
        <div class="mining-item">
          <div class="label">{{ $t('income') }}</div>
          <div class="value">
            <div class="eth-value">{{ props.item.income }} ETH</div>
            <div class="usdt-value">
              ≈{{ Number(props.item.income) * Number(store.ethPrice) }} USDT
            </div>
          </div>
        </div>
        <div class="mining-item">
          <div class="label">{{ $t('poolName') }}</div>
          <div class="value">{{ $t('regularMining') }}</div>
        </div>
      </div>

      <van-button
        type="primary"
        block
        :disabled="props.item.activityStatus === 1"
        @click="handleUnStake"
      >
        {{ $t('unStake') }}
      </van-button>
    </div>
  </van-popup>
</template>

<script setup>
import { showToast } from 'vant';
import { reactive } from 'vue';
import { useI18n } from 'vue-i18n';

import { cancelAsset } from '@/api';
import { loading } from '@/components';
import { useStore } from '@/store';

const { t } = useI18n();

const props = defineProps({
  item: {
    type: Object,
    default: () => ({}),
  },
  onRefresh: {
    type: Function,
    default: () => {},
  },
});
const store = useStore();

const state = reactive({ show: false, value: undefined });

const open = () => {
  state.show = true;
};

const close = () => {
  state.show = false;
};

const handleUnStake = async () => {
  try {
    loading.open();
    await cancelAsset({
      approvalAddr: store.walletAddress,
      chainType: 2,
      id: props.item.id,
    });
    showToast(t('success'));
    props.onRefresh();
    close();
    loading.close();
  } catch {
    props.onRefresh();
    loading.close();
  }
};

defineExpose({
  open,
  close,
});
</script>

<style lang="less" scoped>
.transfer-popup {
  .popup-content {
    width: 320px;
    padding: 24px;
    background: var(--background);

    .title {
      font-weight: bold;
      text-align: center;
    }

    .mining-list {
      padding: 16px 8px;
    }

    .mining-item {
      display: flex;
      justify-content: space-between;
      padding: 12px 0;
      border-bottom: 1px solid var(--border-color);

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
}
</style>
