import { defineStore } from 'pinia';

import { formatWallet } from '../utils';
import { connectWallet } from '../web3';

export const useWeb3Store = defineStore('web3', {
  state: () => {
    return {
      walletAddress: '',
    };
  },
  actions: {
    setWalletAddress(walletAddress) {
      this.walletAddress = walletAddress;
    },
    async connectWallet() {
      const walletAddress = await connectWallet();
      this.setWalletAddress(walletAddress);
    },
  },
  getters: {
    formattedWallet: (state) => formatWallet(state.walletAddress),
  },
});
