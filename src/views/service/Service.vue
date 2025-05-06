<template>
  <div class="service-page">
    <Header />

    <div class="exchange-section">
      <div class="exchange-form">
        <div class="form-title">{{ $t('exchangeAmount') }}</div>

        <van-field
          v-model="state.value"
          clearable
          label=""
          placeholder="0.00"
          type="number"
          :border="false"
        >
          <template #button>
            <van-button size="small" @click="handleMax">{{ $t('max') }}</van-button>
          </template>
        </van-field>

        <div class="exchange-rate" @click="refreshEthPrice">
          <div class="left">{{ $t('exchangeRate') }}</div>
          <div class="right">
            1 ETH = {{ store.ethPrice }} USDT
            <van-icon name="replay" />
          </div>
        </div>
      </div>

      <van-button type="primary" block @click="handleExchangeToUsdt">
        {{ $t('exchangeToUsdt') }}
      </van-button>
      <van-button block class="exchange-records" @click="$router.push('/exchangeRecords')">
        {{ $t('exchangeRecords') }}
      </van-button>
    </div>

    <div class="common-title">
      {{ $t('projectFeatures') }}
    </div>

    <div class="features-section">
      <div class="feature-item">
        <img src="@/assets/images/feature_1.png" />
        <div class="feature-info">
          <div class="feature-name">{{ $t('secureAndReliable') }}</div>
          <div class="feature-desc">{{ $t('secureAndReliableDesc') }}</div>
        </div>
      </div>
      <div class="feature-item">
        <img src="@/assets/images/feature_2.png" />
        <div class="feature-info">
          <div class="feature-name">{{ $t('professionalStability') }}</div>
          <div class="feature-desc">{{ $t('professionalStabilityDesc') }}</div>
        </div>
      </div>
      <div class="feature-item">
        <img src="@/assets/images/feature_3.png" />
        <div class="feature-info">
          <div class="feature-name">{{ $t('lowEntryThreshold') }}</div>
          <div class="feature-desc">{{ $t('lowEntryThresholdDesc') }}</div>
        </div>
      </div>
    </div>

    <bottom-bar />
  </div>
</template>

<script setup>
import { showToast } from 'vant';
import { onMounted, reactive } from 'vue';
import { useI18n } from 'vue-i18n';

import { userAssetToOperate } from '@/api';
import { loading } from '@/components';
import Header from '@/components/Header';
import { useStore } from '@/store';

const store = useStore();
const { t } = useI18n();
const state = reactive({ value: undefined });

onMounted(async () => {
  store.fetchEthPrice();
  store.connectWallet();
});

const refreshEthPrice = async () => {
  try {
    loading.open();
    await store.fetchEthPrice();
    loading.close();
  } catch {
    loading.close();
  }
};

const handleMax = () => {
  state.value = store.userAsset.income;
};

const handleExchangeToUsdt = async () => {
  if (!store.walletAddress) {
    await store.connectWallet();
  }

  await userAssetToOperate({
    approvalAddr: store.walletAddress,
    chainType: 2,
    operationType: 3,
    operationAmount: state.value,
  });
  store.fetchUserAsset();
  store.fetchUsdtBalance();
  store.fetchUserBalance();

  showToast(t('success'));
};
</script>

<style lang="less" scoped>
.service-page {
  padding: 0 12px 100px;
  background: linear-gradient(180deg, #e4f2ff 0%, #f5faff 100%);

  .common-title {
    padding: 12px 4px;
    font-weight: bold;
  }

  .exchange-section {
    .exchange-form {
      padding: 16px 12px;
      margin: 0 0 12px;
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

      .exchange-rate {
        display: flex;
        justify-content: space-between;
        color: var(--text-color-2);

        .right {
          display: flex;
          align-items: center;

          .van-icon-replay {
            margin-left: 2px;
            font-size: 16px;
            color: var(--primary-color);
          }
        }
      }
    }

    .exchange-records {
      margin: 12px 0 24px;
    }
  }

  .features-section {
    .feature-item {
      display: flex;
      align-items: center;
      padding: 16px;
      margin-bottom: 12px;
      background: linear-gradient(208.53deg, #ddefff -0.41%, #fff 26.27%);
      border: 1px solid var(--white);
      border-radius: 8px;

      img {
        width: 32px;
      }

      .feature-info {
        margin-left: 16px;
      }

      .feature-name {
        font-weight: bold;
      }

      .feature-desc {
        margin-top: 4px;
        font-size: 12px;
        color: var(--text-color-3);
      }
    }
  }
}
</style>
