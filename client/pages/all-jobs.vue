<script setup lang="ts">
import { apiService } from "~/utils/custom-fetch";

const route = useRoute();

const jobs = ref(null);
const loading = ref(false);

const fetchAllJobs = async () => {
  loading.value = true;
  const { search, jobStatus, jobType, sort } = route.query;

  await apiService.get("/jobs", {
    query: {
      search,
      jobStatus,
      jobType,
      sort,
    },
    onSuccess: (data) => {
      jobs.value = data;
    },
  });

  loading.value = false;
};

// watcher that will refetch data when query params change
const query = computed(() => route.query);
watch(
  query,
  () => {
    fetchAllJobs();
  },
  { immediate: true, deep: true }
);

definePageMeta({
  layout: "dashboard-layout",
});
</script>

<template>
  <div>
    <SearchContainer />
    <!-- loader -->
    <div
      v-if="loading"
      class="w-full h-screen flex items-center justify-center"
    >
      <USkeleton class="h-12 w-12" :ui="{ rounded: 'rounded-full' }" />
    </div>
    <JobsContainer v-if="jobs" :data="jobs" @delete-job="fetchAllJobs" />
  </div>
</template>

<style scoped></style>
