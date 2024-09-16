<script setup lang="ts">
const props = defineProps({
  defaultStats: {
    type: Object,
    default: () => ({}),
  },
});

const stats = computed(() => {
  return [
    {
      title: "pending applications",
      count: props.defaultStats?.pending || 0,
      icon: "ph:suitcase-simple-bold",
      color: "#f59e0b",
      bcg: "#fef3c7",
    },
    {
      title: "interviews scheduled",
      count: props.defaultStats?.interview || 0,
      icon: "material-symbols:calendar-clock",
      color: "#647acb",
      bcg: "#F0F5FF",
    },
    {
      title: "jobs declined",
      count: props.defaultStats?.declined || 0,
      icon: "material-symbols:bug-report",
      color: "#d66a6a",
      bcg: "#ffeeee",
    },
  ];
});
</script>

<template>
  <section>
    <StatItem
      v-for="(item, index) in stats"
      :key="index"
      :title="item.title"
      :count="item.count"
      :icon="item.icon"
      :color="item.color"
      :bcg="item.bcg"
    />
  </section>
</template>

<style scoped>
section {
  display: grid;
  row-gap: 2rem;
}

@media (min-width: 768px) {
  section {
    grid-template-columns: 1fr 1fr;
    column-gap: 1rem;
  }
}
@media (min-width: 1120px) {
  section {
    grid-template-columns: 1fr 1fr 1fr;
  }
}
</style>
