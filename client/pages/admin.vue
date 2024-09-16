<script setup lang="ts">
import { apiService } from "~/utils/custom-fetch";

const { data, error, loading } = await apiService.get("/users/admin/app-stats");

definePageMeta({
  title: "Admin Dashboard",
  layout: "dashboard-layout",
});
</script>

<template>
  <div>
    <div v-if="error">Error loading stats</div>
    <section v-if="data" class="">
      <StatItem
        title="current users"
        :count="data?.users || 0"
        color="#FFA500"
        bcg="#FFFBEE"
        icon="i-ion:people-sharp"
      />
      <StatItem
        title="total jobs"
        :count="data?.jobs || 0"
        color="#647acb"
        bcg="#F0F5FF"
        icon="i-fluent:notepad-edit-16-regular"
      />
    </section>

    <div v-if="loading">Loading stats...</div>
  </div>
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
