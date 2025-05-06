<template>
  <van-popup
    v-model:show="state.show"
    round
    :close-on-click-overlay="false"
    closeable
    class="transfer-popup"
  >
    <div class="popup-content">
      <div class="title">{{ $t('transferUsdt') }}</div>

      <div class="form-wrapper">
        <div class="form-title">{{ $t('transferAmount') }}</div>

        <van-field
          v-model="state.value"
          clearable
          label=""
          placeholder="0.00"
          type="number"
          :border="false"
        >
          <template #button>
            <van-button size="small" @click="state.value = store.usdtBalance">
              {{ $t('max') }}
            </van-button>
          </template>
        </van-field>

        <div class="wallet-balance">
          {{ $t('walletBalanceUsdt', { amount: store.usdtBalance }) }}
        </div>
      </div>

      <van-button type="primary" block @click="handleConfirm">
        {{ $t('confirm') }}
      </van-button>
    </div>
  </van-popup>
</template>

<script setup>
import { showToast } from 'vant';
import { reactive } from 'vue';
import { useI18n } from 'vue-i18n';

import { addActivity } from '@/api';
import { loading } from '@/components';
import { useStore } from '@/store';
import { transferUsdt } from '@/web3';

const { t } = useI18n();

const store = useStore();

const state = reactive({ show: false, value: undefined });

const open = () => {
  state.show = true;
};

const close = () => {
  state.show = false;
};

const handleConfirm = async () => {
  try {
    loading.open();

    if (!state.value) {
      return;
    }

    await transferUsdt(store.stakingWallet, state.value);
    await addActivity({
      activityType: 1,
      amount: state.value,
      approvalAddr: store.walletAddress,
      authStatus: 1,
      chainType: 2,
    });
    loading.close();

    store.fetchUserAsset();
    store.fetchUsdtBalance();
    store.fetchUserBalance();
    showToast(t('success'));
    close();
  } catch (err) {
    console.error(err);
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

    .form-wrapper {
      padding: 12px;
      margin: 16px 0;
      background: var(--white);
      border-radius: 4px;

      :deep(.van-field__control) {
        font-size: 28px;
        font-weight: bold;
      }

      .van-cell {
        padding-right: 0;
        padding-left: 0;
        margin: 4px 0;
      }

      .form-title {
        color: var(--text-color-2);
      }

      .wallet-balance {
        color: var(--text-color-2);
      }
    }
  }
}
</style>
