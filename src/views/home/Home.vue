<template>
  <div class="home-page">
    <van-button @click="showExamplePopup">show</van-button>
  </div>
  <BottomBar />
</template>

<script setup>
import { showExamplePopup } from '@/popup';
</script>
