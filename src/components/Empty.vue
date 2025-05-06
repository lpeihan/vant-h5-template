<template>
  <div class="empty-comp">
    <img src="@/assets/images/empty.png" />
    <div class="text">{{ props.text || $t('noData') }}</div>
  </div>
</template>

<script setup>
const props = defineProps({
  text: {
    type: String,
    default: '',
  },
});
</script>

<style lang="less" scoped>
.empty-comp {
  padding: 24px;
  text-align: center;
  background: var(--white);

  .text {
    font-size: 13px;
    color: var(--text-color-3);
  }

  img {
    width: 80px;
  }
}
</style>
