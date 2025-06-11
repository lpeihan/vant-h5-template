<template>
  <a-button
    class="inline-flex items-center justify-center"
    v-bind="$attrs"
    type="text"
    shape="circle"
    @click="$emit('click', $event)"
  >
    <template #icon>
      <svg-icon v-if="typeof icon === 'string'" :name="icon" />
      <component :is="icon" v-else />
    </template>
  </a-button>
</template>

<script setup>
defineProps({
  icon: {
    type: [String, Function],
    required: true,
  },
});

defineEmits(['click']);
</script>
