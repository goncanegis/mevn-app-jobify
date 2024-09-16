<script setup lang="ts">
import { apiService } from "~/utils/custom-fetch";

const { data, error, loading } = await apiService.get("/jobs/stats");

// use dashboard-layout
definePageMeta({
  title: "Stats",
  layout: "dashboard-layout",
});
</script>

<template>
  <div>
    <div v-if="error">Error fetching stats</div>
    <div v-if="loading">Loading stats...</div>
    <StatsContainer :defaultStats="data?.defaultStats" />
    <ChartsContainer v-if="data" :data="data?.monthlyApplications" />
  </div>
</template>

<style scoped></style>
