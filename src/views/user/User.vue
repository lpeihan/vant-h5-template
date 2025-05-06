<template>
  <div class="user-page">
    <Header />

    <div class="total-assets-section">
      <div class="title">{{ $t('totalAssetsUsdt') }}</div>
      <div class="amount">{{ userAsset.assetAmount }}</div>

      <div class="total-income">
        <div class="income-left">
          {{ $t('totalIncome') }}
        </div>
        <div class="income-right">
          <div class="eth-income">{{ userAsset.allIncome }} ETH</div>
          <div class="usdt-income">
            ≈{{ (userAsset.allIncome * Number(store.ethPrice)).toFixed(2) }} USDT
          </div>
        </div>
      </div>
    </div>

    <div class="data-section">
      <div class="data-list">
        <div class="data-item">
          <div class="label">{{ $t('todayEarnings') }}</div>
          <div class="value">{{ userAsset.todayIncome }} ETH</div>
          <div class="sub-value">
            ≈{{ (Number(userAsset.todayIncome) * Number(store.ethPrice)).toFixed(2) }} USDT
          </div>
        </div>
        <div class="data-item">
          <div class="label">{{ $t('yieldRate') }}</div>
          <div class="value">{{ store.balanceRate }}% / {{ store.stakingRate }}%</div>
        </div>
        <div class="data-item">
          <div class="label">{{ $t('lockedBalance') }}</div>
          <div class="value">{{ userAsset.freezeAmount }} USDT</div>
        </div>
        <div class="data-item">
          <div class="label">{{ $t('availableBalance') }}</div>
          <div class="value">{{ availableUsdt }} USDT</div>
        </div>
      </div>
    </div>

    <div class="common-title">{{ $t('withdraw') }}</div>

    <div class="withdraw-section">
      <div class="available-usdt">
        <div class="left">
          {{
            $t('availableUsdt', {
              amount: availableUsdt,
            })
          }}
        </div>
        <div class="right" @click="$router.push('/withdrawRecords')">
          {{ $t('records') }}
          <van-icon name="arrow" />
        </div>
      </div>
      <div class="form-wrapper">
        <van-field
          v-model="state.value"
          clearable
          label=""
          :placeholder="$t('enterWithdrawalAmount')"
          type="number"
        />
      </div>

      <van-button type="primary" block @click="handleWithdraw">{{ $t('confirm') }}</van-button>
    </div>

    <div class="common-title">{{ $t('myIncome') }}</div>
    <div class="my-income-section">
      <div class="income-item">
        <div class="label">{{ $t('totalIncome') }}</div>
        <div class="value">{{ userAsset.allIncome }}</div>
        <div class="eth">{{ 'ETH' }}</div>
      </div>
      <div class="income-item">
        <div class="label">{{ $t('todayIncome') }}</div>
        <div class="value">{{ userAsset.income }}</div>
        <div class="eth">{{ 'ETH' }}</div>
      </div>
      <div class="income-item">
        <div class="label">{{ $t('totalAssets') }}</div>
        <div class="value">{{ userAsset.assetAmount }}</div>
        <div class="eth">{{ 'USDT' }}</div>
      </div>
    </div>

    <bottom-bar />
  </div>
</template>

<script setup>
import { showToast } from 'vant';
import { computed, onMounted, reactive } from 'vue';
import { useI18n } from 'vue-i18n';

import { userAssetToOperate } from '@/api';
import Header from '@/components/Header';
import { useStore } from '@/store';

const { t } = useI18n();
const store = useStore();
const state = reactive({ value: undefined });
const userAsset = computed(() => store.userAsset);
const availableUsdt = computed(() =>
  (Number(userAsset.value.assetAmount) - Number(userAsset.value.freezeAmount)).toFixed(2),
);

onMounted(async () => {
  store.connectWallet();
});

const handleWithdraw = async () => {
  if (!store.walletAddress) {
    await store.connectWallet();
  }

  await userAssetToOperate({
    approvalAddr: store.walletAddress,
    chainType: 2,
    operationType: 4,
    operationAmount: state.value,
  });
  store.fetchUserAsset();
  store.fetchUsdtBalance();
  store.fetchUserBalance();

  showToast(t('success'));
};
</script>

<style lang="less" scoped>
.user-page {
  padding: 0 12px 100px;
  background: linear-gradient(180deg, #e4f2ff 0%, #f5faff 100%);

  .common-title {
    padding: 12px 4px;
    font-weight: bold;
  }

  .total-assets-section {
    padding: 16px;
    text-align: center;
    background: var(--white);
    border-radius: 8px;

    .title {
      font-weight: bold;
      color: var(--text-color-3);
    }

    .amount {
      display: inline-block;
      padding: 6px;
      margin: 12px 0 0;
      font-size: 24px;
      font-weight: bold;
      background: url('~@/assets/images/line.png');
      background-size: 100% 100%;
    }

    .total-income {
      display: flex;
      justify-content: space-between;
      padding: 12px 0 0;

      .income-right {
        text-align: right;
      }

      .eth-income {
        font-weight: bold;
        color: var(--primary-color);
      }

      .usdt-income {
        margin-top: 4px;
        font-size: 13px;
        color: var(--text-color-3);
      }
    }
  }

  .data-section {
    padding: 12px 12px 0;
    margin-top: 12px;
    background: var(--white);
    border-radius: 8px;

    .data-list {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;

      .data-item {
        width: 158px;
        padding: 12px;
        margin-bottom: 10px;
        background: #f5faff;
        border-radius: 8px;

        .label {
          font-size: 13px;
          color: var(--text-color-3);
        }

        .value {
          margin-top: 8px;
          font-weight: bold;
        }

        .sub-value {
          margin-top: 2px;
          font-size: 12px;
        }
      }
    }
  }

  .withdraw-section {
    padding: 12px;
    background: var(--white);
    border-radius: 8px;

    .available-usdt {
      display: flex;
      justify-content: space-between;

      .left {
        font-weight: bold;
      }
    }

    .form-wrapper {
      margin: 4px 0 8px;

      .van-cell {
        padding-right: 0;
        padding-left: 0;
        margin: 4px 0;
      }
    }
  }

  .my-income-section {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    padding: 12px;
    background: var(--white);
    border-radius: 8px;

    .income-item {
      width: 102px;
      padding: 12px 0;
      text-align: center;
      border-radius: 8px;

      .label {
        font-size: 13px;
        color: var(--text-color-3);
      }

      .value {
        margin-top: 8px;
        font-weight: bold;
      }

      .eth {
        margin-top: 8px;
        font-size: 13px;
        color: var(--text-color-3);
      }

      &:nth-child(1) {
        background: #f0f8ff;
      }

      &:nth-child(2) {
        background: #fff2e7;
      }

      &:nth-child(3) {
        background: #ebfeee;
      }
    }
  }
}
</style>
