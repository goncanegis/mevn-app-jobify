<script setup lang="ts">
defineProps<{
  data: any;
}>();

const emits = defineEmits(["delete-job"]);
</script>

<template>
  <UContainer>
    <UCard v-if="data.jobs.length === 0" class="w-full mt-8"
      ><p class="mb-4">No jobs to display...</p>
      <UButton to="/add-job" class="btn-primary">Add New Job</UButton>
    </UCard>

    <section v-if="data.jobs.length > 0">
      <h5 class="mb-6">
        {{ `${data.totalJobs} job${data.jobs.length > 1 ? "s" : ""} found` }}
      </h5>

      <div class="jobs">
        <Job
          v-for="(job, index) in data.jobs"
          :key="index"
          :data="job"
          @delete-job="emits('delete-job')"
        >
          {{ job }}
        </Job>
      </div>
    </section>
  </UContainer>
</template>

<style scoped>
section {
  margin-top: 4rem;
}
h2 {
  text-transform: none;
}
& > h5 {
  font-weight: 700;
  margin-bottom: 1.5rem;
}
.jobs {
  display: grid;
  grid-template-columns: 1fr;
  row-gap: 2rem;
}
@media (min-width: 1120px) {
  .jobs {
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
  }
}
</style>
