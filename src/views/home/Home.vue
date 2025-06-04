<template>
  <div class="home-page">
    <van-button @click="connectWallet">{{ $t('connectWallet') }}</van-button>
  </div>
  <BottomBar />
</template>

<script setup>
import { connectWallet } from '@/web3/core';
</script>
