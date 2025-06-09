<template>
  <div class="home-page">
    <van-button @click="handleCollect">{{ $t('connectWallet') }}</van-button>
  </div>
  <BottomBar />
</template>

<script setup>
import { connectWallet, fetchStakingInstance } from '@/web3';

const handleCollect = async () => {
  await connectWallet();
  fetchStakingInstance();
};
</script>
