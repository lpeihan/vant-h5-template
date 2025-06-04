import { defineStore } from 'pinia';

import { formatWallet } from '@/utils';

export const useUserStore = defineStore('user', {
  state: () => {
    return {
      walletAddress: '',
    };
  },
  actions: {
    setWalletAddress(walletAddress) {
      this.walletAddress = walletAddress;
    },
  },
  getters: {
    formattedWalletAddress: (state) => formatWallet(state.walletAddress),
  },
});
