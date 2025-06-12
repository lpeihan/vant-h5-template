<template>
  <svg
    class="inline-block h-[16px] w-[16px] fill-current"
    :class="'svg-icon-' + props.name"
    v-bind="$attrs"
  >
    <use :xlink:href="'#' + props.name" />
  </svg>
</template>

<script setup>
import svgIcons from '../assets/svgIcons';

// https://free-icons.github.io/free-icons/
const props = defineProps({
  name: {
    type: String,
    required: true,
    default: '',
    validator(val) {
      return svgIcons[val];
    },
  },
});
</script>
