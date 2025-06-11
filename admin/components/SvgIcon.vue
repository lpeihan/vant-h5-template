<template>
  <svg
    class="w-[16px] h-[16px] inline-block fill-current"
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
