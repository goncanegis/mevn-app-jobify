<script setup lang="ts">
defineProps({
  data: {
    type: Array,
    required: true,
  },
});

const barChart = ref(true);

const toggleBarChart = () => {
  barChart.value = !barChart.value;
};
</script>

<template>
  <section>
    <h4>Monthly Applications</h4>
    <UButton @click="toggleBarChart">
      {{ barChart ? "Area Chart" : "Bar Chart" }}
    </UButton>
    <Chart :data="data" :conversion-type="barChart ? 'bar' : 'area'" />
  </section>
</template>

<style scoped>
section {
  margin-top: 4rem;
  button {
    text-transform: capitalize;
    margin-bottom: 1rem;
    font-size: 1rem;
    cursor: pointer;
  }
  h4 {
    margin-bottom: 0.75rem;
  }
}
</style>
