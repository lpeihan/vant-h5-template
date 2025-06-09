<template>
  <div class="home-page">
    <van-button @click="handleCollect">{{ $t('connectWallet') }}</van-button>
    <svg-icon name="back" />
  </div>
  <BottomBar />
</template>

<script setup>
import { connectWallet, fetchStakingInstance } from '../../web3';

const handleCollect = async () => {
  await connectWallet();
  fetchStakingInstance();
};
</script>
