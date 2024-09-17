<script setup lang="ts">
import { z } from "zod";
import type { FormSubmitEvent } from "#ui/types";
import { setToken, apiService } from "~/utils/custom-fetch";

const router = useRouter();

const loading = ref(false);

const schema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(8, "Must be at least 8 characters"),
});

type Schema = z.output<typeof schema>;

const state = reactive({
  email: "",
  password: "",
});

async function onSubmit(event: FormSubmitEvent<Schema>) {
  loading.value = true;
  await apiService.post("/auth/login", state, {
    // errorMessage: "Failed to login",
    onSuccess: (data) => {
      setToken(data.token);
      router.push("/add-job");
    },
    onFinally: () => {
      loading.value = false;
    },
    onError: (error) => {
      console.log(error);
      showToast({ title: error.message, type: "error" });
    },
  });
}

onMounted(() => {
  setTimeout(() => {
    const firstInput = document.querySelector("input");
    if (firstInput) {
      firstInput.focus();
    }
  }, 100);
});
</script>

<template>
  <UContainer
    class="py-12 px-12 sm:px-12 w-full h-full flex flex-col items-center justify-center"
  >
    <Logo />

    <UForm
      :schema="schema"
      :state="state"
      class="mt-12 space-y-8 w-[90vw] max-w-md"
      @submit="onSubmit"
    >
      <UFormGroup label="Email" name="email">
        <UInput v-model="state.email" type="email" ref="firstInputRef" />
      </UFormGroup>

      <UFormGroup label="Password" name="password">
        <UInput v-model="state.password" type="password" />
      </UFormGroup>

      <UButton type="submit">
        {{ loading ? "Submitting..." : "Submit" }}
      </UButton>
    </UForm>

    <ULink to="/register" class="mt-4">
      Don't have an account yet? Register <u>here</u>
    </ULink>
  </UContainer>
</template>

<style scoped></style>
