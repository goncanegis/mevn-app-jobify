<script setup lang="ts">
defineProps<{
  icon: string;
  text: string;
}>();
</script>

<template>
  <div class="job-info">
    <UIcon :name="icon" class="job-icon" />
    <span class="job-text">{{ text }}</span>
  </div>
</template>

<style scoped>
.job-info {
  display: flex;
  align-items: center;
}
.job-icon {
  font-size: 1rem;
  margin-right: 1rem;
  display: flex;
  align-items: center;
  svg {
    color: var(--text-secondary-color);
  }
}
.job-text {
  text-transform: capitalize;
  letter-spacing: var(--letter-spacing);
}
</style>
