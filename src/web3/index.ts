import { showToast } from 'vant';
import Web3 from 'web3';

import config from './config';
import { movePointLeft, movePointRight } from './utils';

const USDT_DECIMALS = 18;

let walletAddress;
let web3;

export async function connectWallet() {
  if (window.ethereum) {
    try {
      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts',
      });

      walletAddress = accounts[0];
      console.log('🚀 ~ connectWallet ~ walletAddress:', walletAddress);

      web3 = new Web3(window.ethereum);

      return walletAddress;
    } catch (error) {
      console.error('🚀 ~ connectWallet ~ error:', error);
      throw new Error(error);
    }
  } else {
    const errorMessage = 'Ethereum wallet is not installed. Please install MetaMask!';

    showToast(errorMessage);
    throw new Error(errorMessage);
  }
}

export const fetchUsdtBalance = async () => {
  try {
    const contract = new web3.eth.Contract(config.UsdtAbi, config.UsdtAddress);

    const rawUsdtBalance = await contract.methods.balanceOf(walletAddress).call();

    const usdtBalance = movePointLeft(rawUsdtBalance.toString(), USDT_DECIMALS);
    console.log('🚀 ~ fetchUsdtBalance ~ usdtBalance:', usdtBalance, rawUsdtBalance);

    return {
      usdtBalance,
      rawUsdtBalance,
    };
  } catch (err) {
    console.log('🚀 ~ fetchUsdtBalance ~ err:', err);
    return Promise.reject(err);
  }
};

export const approveUsdt = async (address, amount) => {
  const contract = new web3.eth.Contract(config.UsdtAbi, config.UsdtAddress);

  console.log('🚀 ~ approveUsdt ~ start:', address, amount);
  const result = await contract.methods.approve(address, amount).send({ from: walletAddress });

  console.log('🚀 ~ approveUsdt ~ result:', result);
  return result;
};

export const transferUsdt = async (toAddress, amount) => {
  try {
    const contract = new web3.eth.Contract(config.UsdtAbi, config.UsdtAddress);

    amount = movePointRight(amount.toString(), USDT_DECIMALS);
    const result = await contract.methods.transfer(toAddress, amount).send({ from: walletAddress });

    console.log('🚀 ~ transferUsdt ~ result:', result);
    return result;
  } catch (err) {
    console.error('🚀 ~ transferUsdt ~ error:', err);
    showToast(err.message);
    return Promise.reject(err);
  }
};
