<script setup lang="ts">
import { apiService } from "~/utils/custom-fetch";

const loading = ref(false);

const props = defineProps<{
  data: any;
}>();

const emits = defineEmits(["delete-job"]);

const jobDetails = computed(() => {
  const { _id, position, company, jobLocation, jobType, createdAt, jobStatus } =
    props.data;
  const date = new Date(createdAt).toLocaleDateString();
  return { _id, position, company, jobLocation, jobType, date, jobStatus };
});

const handleDelete = async () => {
  loading.value = true;
  await apiService.delete(`/jobs/${jobDetails.value._id}`, {
    onSuccess: () => {
      emits("delete-job", jobDetails.value._id);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  loading.value = false;
};
</script>

<template>
  <article>
    <header>
      <div class="main-icon">{{ jobDetails.company.charAt(0) }}</div>
      <div class="info">
        <h5>{{ jobDetails.position }}</h5>
        <p>{{ jobDetails.company }}</p>
      </div>
    </header>
    <div class="content">
      <div class="content-center">
        <JobInfo icon="i-typcn:location-arrow" :text="jobDetails.jobLocation" />
        <JobInfo
          icon="i-material-symbols:calendar-add-on"
          :text="jobDetails.date"
        />
        <JobInfo icon="i-mdi:briefcase" :text="jobDetails.jobType" />
        <div :class="`status ${jobDetails.jobStatus}`">
          {{ jobDetails.jobStatus }}
        </div>
      </div>
      <footer class="actions">
        <ULink :to="`../edit-job/${jobDetails._id}`" class="btn edit-btn">
          Edit
        </ULink>
        <UPopover>
          <UButton
            color="white"
            :label="loading ? 'Deleting...' : 'Delete'"
            trailing-icon="i-heroicons-chevron-down-20-solid"
          />

          <template #panel>
            <div class="p-4">
              <UButton type="button" color="red" @click="handleDelete">{{
                loading ? "Deleting..." : "Confirm Delete"
              }}</UButton>
            </div>
          </template>
        </UPopover>
      </footer>
    </div>
  </article>
</template>

<style scoped>
article {
  background: var(--background-secondary-color);
  border-radius: var(--border-radius);
  display: grid;
  grid-template-rows: 1fr auto;
  box-shadow: var(--shadow-2);
}
header {
  padding: 1rem 1.5rem;
  border-bottom: 1px solid var(--grey-100);
  display: grid;
  grid-template-columns: auto 1fr;
  align-items: center;
}
.main-icon {
  width: 60px;
  height: 60px;
  display: grid;
  place-items: center;
  background: var(--primary-500);
  border-radius: var(--border-radius);
  font-size: 1.5rem;
  font-weight: 700;
  text-transform: uppercase;
  color: var(--white);
  margin-right: 2rem;
}
.info {
  h5 {
    margin-bottom: 0.5rem;
  }
  p {
    margin: 0;
    text-transform: capitalize;
    letter-spacing: var(--letter-spacing);
    color: var(--text-secondary-color);
  }
}
.content {
  padding: 1rem 1.5rem;
}
.content-center {
  display: grid;
  margin-top: 1rem;
  margin-bottom: 1.5rem;
  grid-template-columns: 1fr;
  row-gap: 1.5rem;
  align-items: center;

  @media (min-width: 576px) {
    grid-template-columns: 1fr 1fr;
  }
}
.status {
  border-radius: var(--border-radius);
  text-transform: capitalize;
  letter-spacing: var(--letter-spacing);
  text-align: center;
  width: 100px;
  height: 30px;
  display: grid;
  align-items: center;
}
.actions {
  margin-top: 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.edit-btn,
.delete-btn {
  height: 30px;
  font-size: 0.85rem;
  display: flex;
  align-items: center;
}
.edit-btn {
  margin-right: 0.5rem;
}
</style>
