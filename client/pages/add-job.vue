<script setup lang="ts">
import { JOB_STATUS, JOB_TYPE } from "~/utils/constants";
import { z } from "zod";
import type { FormSubmitEvent } from "#ui/types";
import { apiService } from "~/utils/custom-fetch";
import { focusFirstInput } from "~/utils";

const positionInputRef = ref<HTMLInputElement | null>(null);

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

type Schema = z.output<typeof schema>;

const loading = ref(false);

const state = reactive({
  company: "",
  position: "",
  jobLocation: "",
  jobStatus: JOB_STATUS.PENDING,
  jobType: JOB_TYPE.FULL_TIME,
});

const resetState = () => {
  state.company = "";
  state.position = "";
  state.jobLocation = "";
  state.jobStatus = JOB_STATUS.PENDING;
  state.jobType = JOB_TYPE.FULL_TIME;
};

async function onSubmit() {
  loading.value = true;
  await apiService.post("/jobs", state, {
    onSuccess: () => {
      resetState();
    },
    onError: (error) => {
      console.log(error);
    },
    successMessage: "Job created successfully",
    errorMessage: "Failed to create job",
  });

  loading.value = false;
}

onMounted(() => {
  focusFirstInput();
});

// use dashboard-layout
definePageMeta({
  layout: "dashboard-layout",
});
</script>

<template>
  <section>
    <UForm :schema="schema" :state="state" class="form" @submit="onSubmit">
      <h4 class="form-title">add job</h4>
      <div class="form-center">
        <UFormGroup label="job position" type="text" name="position">
          <UInput
            v-model="state.position"
            ref="positionInputRef"
            label="position"
          />
        </UFormGroup>
        <UFormGroup label="company" type="text" name="company">
          <UInput v-model="state.company" label="company" />
        </UFormGroup>
        <UFormGroup label="job location" name="jobLocation">
          <UInput v-model="state.jobLocation" />
        </UFormGroup>

        <UFormGroup label="job status" name="jobStatus">
          <USelect
            v-model="state.jobStatus"
            :options="Object.values(JOB_STATUS)"
          />
        </UFormGroup>

        <UFormGroup label="job type" name="jobType">
          <USelect v-model="state.jobType" :options="Object.values(JOB_TYPE)" />
        </UFormGroup>

        <div class="min-h-[81px] flex items-center justify-center">
          <UButton color="primary" type="submit" class="form-btn">{{
            loading ? "Submitting..." : "Submit"
          }}</UButton>
        </div>
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
