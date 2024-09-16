<script setup lang="ts">
import { apiService } from "~/utils/custom-fetch";

const { data } = await apiService.get("/jobs/stats");

// use dashboard-layout
definePageMeta({
  title: "Stats",
  layout: "dashboard-layout",
});
</script>

<template>
  <StatsContainer :defaultStats="data?.defaultStats" />
  <ChartsContainer v-if="data" :data="data?.monthlyApplications" />
</template>

<style scoped></style>
