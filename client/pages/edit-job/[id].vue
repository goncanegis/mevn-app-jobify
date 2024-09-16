<script setup lang="ts">
import { JOB_STATUS, JOB_TYPE } from "~/utils/constants";
import { apiService } from "~/utils/custom-fetch";
import { z } from "zod";

const { params } = useRoute();
const router = useRouter();

const state = reactive({
  position: "",
  company: "",
  jobLocation: "",
  jobStatus: "",
  jobType: "",
});

const schema = z.object({
  company: z.string().min(2, "Must be at least 2 characters"),
  position: z.string().min(2, "Must be at least 2 characters"),
  jobLocation: z.string().min(2, "Must be at least 2 characters"),
  jobStatus: z.string().refine((val) => {
    return Object.values(JOB_STATUS).includes(val);
  }),
  jobType: z.string().refine((val) => {
    return Object.values(JOB_TYPE).includes(val);
  }),
});

const onSubmit = async () => {
  await apiService.patch(`/jobs/${params.id}`, state, {
    onSuccess: () => {
      router.push("/all-jobs");
    },
    onError: (error) => {
      console.log(error);
    },
  });
};

const { data, loading } = await apiService.get(`/jobs/${params.id}`, {
  onSuccess: (res) => {
    state.position = res.data.position;
    state.company = res.data.company;
    state.jobLocation = res.data.jobLocation;
    state.jobStatus = res.data.jobStatus;
    state.jobType = res.data.jobType;
  },
  onError: () => {
    router.push("/all-jobs");
  },
});

definePageMeta({
  layout: "dashboard-layout",
});
</script>

<template>
  <section>
    <div v-if="loading" class="animate-pulse">
      <div class="h-6 bg-gray-300 rounded w-1/4 mb-4"></div>
      <div class="space-y-4">
        <div class="h-10 bg-gray-300 rounded"></div>
        <div class="h-10 bg-gray-300 rounded"></div>
        <div class="h-10 bg-gray-300 rounded"></div>
        <div class="h-10 bg-gray-300 rounded"></div>
        <div class="h-10 bg-gray-300 rounded"></div>
        <div class="h-12 bg-gray-300 rounded w-1/4 mt-6"></div>
      </div>
    </div>
    <UForm
      v-if="!loading && data"
      :state="state"
      :schema="schema"
      class="form"
      @submit="onSubmit"
    >
      <h4 class="form-title">edit job</h4>
      <div class="form-center">
        <UFormGroup name="position" label="Position">
          <UInput v-model="state.position" />
        </UFormGroup>
        <UFormGroup name="company" label="Company">
          <UInput v-model="state.company" />
        </UFormGroup>
        <UFormGroup name="jobLocation" label="Job Location">
          <UInput v-model="state.jobLocation" />
        </UFormGroup>
        <UFormGroup name="jobStatus" label="Job Status">
          <USelect
            v-model="state.jobStatus"
            :options="Object.values(JOB_STATUS)"
          />
        </UFormGroup>
        <UFormGroup name="jobType" label="Job Type">
          <USelect v-model="state.jobType" :options="Object.values(JOB_TYPE)" />
        </UFormGroup>

        <UButton class="form-btn" type="submit" color="primary">Submit</UButton>
      </div>
    </UForm>
  </section>
</template>

<style scoped>
section {
  border-radius: var(--border-radius);
  width: 100%;
  background: var(--background-secondary-color);
  padding: 3rem 2rem 4rem;
}
</style>
