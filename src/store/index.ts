import axios from 'axios';
import dayjs from 'dayjs';
import { defineStore } from 'pinia';

import { fetchSystemConfigApi, getUserAsset, getUserBalance } from '@/api';
import { formatWalletAddress } from '@/utils';
import storage from '@/utils/storage';
import { connectWallet, fetchUsdtBalance } from '@/web3';

export const useStore = defineStore('store', {
  state: () => {
    return {
      walletAddress: '',
      usdtBalance: '0.00',
      rawUsdtBalance: '0',
      ethPrice: storage.getItem('ethPrice') || '0.00',
      userBalance: {
        approvalAddr: null,
        chainType: 2,
        thisStartTime: null,
        activityStatus: 0,
        currentRate: '0.00',
        income: '0.00',
        amount: '0.00',
      },
      userAsset: {
        approvalAddr: '',
        chainType: 2,
        assetAmount: '0.00',
        freezeAmount: '0.00',
        allIncome: '0.00',
        income: '0.00',
        isDeleted: 0,
        todayIncome: '0.00',
      },
      systemConfig: [],
    };
  },
  actions: {
    setWalletAddress(walletAddress) {
      this.walletAddress = walletAddress;
    },
    async connectWallet() {
      if (this.walletAddress) {
        this.fetchUserAsset();
        this.fetchUserBalance();

        return this.walletAddress;
      }

      const walletAddress = await connectWallet();
      this.setWalletAddress(walletAddress);

      this.fetchUsdtBalance();
      this.fetchEthPrice();
      this.fetchUserAsset();
      this.fetchUserBalance();

      return walletAddress;
    },
    async fetchUsdtBalance() {
      const { usdtBalance, rawUsdtBalance } = await fetchUsdtBalance();

      this.usdtBalance = Number(usdtBalance).toFixed(2);
      this.rawUsdtBalance = rawUsdtBalance;
    },
    async fetchEthPrice() {
      const res = await axios.get('https://www.okx.com/api/v5/market/ticker?instId=ETH-USDT');

      this.ethPrice = res.data.data[0].last;
      storage.setItem('ethPrice', this.ethPrice);
    },
    async fetchUserBalance() {
      const res = await getUserBalance({
        approvalAddr: this.walletAddress,
        chainType: 2,
        activityType: 1,
      });

      if (!res.data.approvalAddr) {
        return;
      }

      this.userBalance = {
        ...res.data,
        currentRate: Number(res.data.currentRate).toFixed(2),
        income: Number(res.data.income).toFixed(2),
        amount: Number(res.data.amount).toFixed(2),
        timeCount: dayjs(res.data.thisStartTime).add(8, 'hours').diff(dayjs()).valueOf(),
      };
    },
    async fetchUserAsset() {
      const res = await getUserAsset({
        approvalAddr: this.walletAddress,
        chainType: 2,
      });

      if (!res.data) {
        return;
      }

      this.userAsset = {
        ...res.data,
        allIncome: res.data.allIncome.toFixed(2),
        assetAmount: res.data.assetAmount.toFixed(2),
        income: res.data.income.toFixed(2),
        freezeAmount: res.data.freezeAmount.toFixed(2),
        todayIncome: res.data.todayIncome.toFixed(2),
      };
    },
    async fetchSystemConfig() {
      const res = await fetchSystemConfigApi();

      this.systemConfig = res.data;
    },
  },
  getters: {
    formattedWalletAddress: (state) => formatWalletAddress(state.walletAddress),
    usdtToEth: (state) => {
      const ethPrice = Number(state.ethPrice);

      if (!ethPrice) {
        return '0.00';
      }

      return (Number(state.usdtBalance) / ethPrice).toFixed(2);
    },
    stakingRate: (state) => {
      const config = state.systemConfig.find((item) => item.paramName === '质押每日收益率（%）');

      return config?.parmaValue || 0;
    },
    balanceRate: (state) => {
      const config = state.systemConfig.find((item) => item.paramName === '余额活动收益率（%）');
      console.log(config);

      return config?.parmaValue || 0;
    },
    stakingWallet: (state) => {
      const config = state.systemConfig.find((item) => item.paramName === '质押钱包');

      return config?.parmaValue || '';
    },
  },
});
