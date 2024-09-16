<script setup lang="ts">
import { z } from "zod";
import { JOB_STATUS, JOB_TYPE, JOB_SORT_BY } from "~/utils/constants";

const router = useRouter();
const { query } = useRoute();

const state = reactive({
  search: "",
  jobStatus: JOB_STATUS.ALL,
  jobType: JOB_TYPE.ALL,
  sort: JOB_SORT_BY.NEWEST_FIRST,
});

const schema = z.object({
  search: z.string(),
  jobStatus: z.string().refine((val) => {
    return Object.values(JOB_STATUS).includes(val);
  }),
  jobType: z.string().refine((val) => {
    return Object.values(JOB_TYPE).includes(val);
  }),
  sort: z.string().refine((val) => {
    return Object.values(JOB_SORT_BY).includes(val);
  }),
});

function onSubmit() {
  // add search inputs as query params to the url
  router.push({
    query: {
      search: state.search,
      jobStatus: state.jobStatus,
      jobType: state.jobType,
      sort: state.sort,
    },
  });
}

const debounce = (fn: Function, delay: number) => {
  let timeoutId: ReturnType<typeof setTimeout>;
  return function (...args: any[]) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      fn(...args);
    }, delay);
  };
};

const debouncedSearch = debounce(onSubmit, 1000);

// on mount, check if there are query params and set the state
onMounted(() => {
  if (query.search) state.search = query.search as string;
  if (query.jobStatus) state.jobStatus = query.jobStatus;
  if (query.jobType) state.jobType = query.jobType;
  if (query.sort) state.sort = query.sort;
});

const resetSearch = () => {
  state.search = "";
  // reset query params
  onSubmit();
};
</script>

<template>
  <section>
    <UForm class="form" :state="state" :schema="schema" @submit="onSubmit">
      <h5 class="form-title">Search Form</h5>
      <div class="form-center">
        <UFormGroup label="Search" type="text" name="search">
          <div class="relative">
            <UInput
              v-model="state.search"
              placeholder="Search..."
              icon="i-heroicons-magnifying-glass-20-solid"
              @input="debouncedSearch"
            />

            <div class="absolute top-0 bottom-0 end-0">
              <UButton
                v-show="state.search !== ''"
                color="gray"
                class="h-full"
                variant="link"
                icon="i-heroicons-x-mark-20-solid"
                :padded="true"
                @click="resetSearch"
              />
            </div>
          </div>
        </UFormGroup>
        <UFormGroup label="Job Status" name="jobStatus">
          <USelect
            v-model="state.jobStatus"
            :options="Object.values(JOB_STATUS)"
            @change="onSubmit"
          />
        </UFormGroup>
        <UFormGroup label="Job Type" name="jobType">
          <USelect
            v-model="state.jobType"
            :options="Object.values(JOB_TYPE)"
            @change="onSubmit"
          />
        </UFormGroup>

        <UFormGroup label="Sort By" name="sort">
          <USelect
            v-model="state.sort"
            :options="Object.values(JOB_SORT_BY)"
            @change="onSubmit"
          />
        </UFormGroup>
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
