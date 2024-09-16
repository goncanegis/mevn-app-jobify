<script setup lang="ts">
defineProps({
  text: {
    type: String,
    default: "",
  },
});
</script>

<template>
  <h2 class="w-fit h-fit z-10 text-xl font-bold">
    <span>{{ text }}</span>
  </h2>
</template>

<style scoped></style>
