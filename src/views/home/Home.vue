<template>
  <div class="home-page">
    <van-button @click="handleCollect">{{ $t('connectWallet') }}</van-button>
    <svg-icon name="back" />
    <van-button @click="showExamplePopup">Show Popup</van-button>
  </div>
  <BottomBar />
</template>

<script setup>
import { showExamplePopup } from '../../popup';
import { connectWallet, fetchStakingInstance } from '../../web3';

const handleCollect = async () => {
  await connectWallet();
  fetchStakingInstance();
};
</script>
