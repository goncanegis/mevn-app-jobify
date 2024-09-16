<script setup lang="ts">
import { z } from "zod";
import { apiService } from "~/utils/custom-fetch";

const router = useRouter();

const loading = ref(false);

const schema = z.object({
  name: z.string().min(2, "Must be at least 2 characters"),
  lastName: z.string().min(2, "Must be at least 2 characters"),
  location: z.string().min(2, "Must be at least 2 characters"),
  email: z.string().email("Invalid email"),
  password: z.string().min(8, "Must be at least 8 characters"),
});

const state = reactive({
  name: "",
  lastName: "",
  location: "",
  email: "",
  password: "",
});

async function onSubmit() {
  loading.value = true;

  await apiService.post("/auth/register", state, {
    onSuccess: () => {
      router.push("/login");
    },
    onError: (error) => {
      showToast({
        title: error.message || "Error creating account",
        type: "error",
      });
    },
  });

  loading.value = false;
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
      <fieldset :disabled="loading">
        <UFormGroup label="Name" name="name">
          <UInput v-model="state.name" />
        </UFormGroup>
        <UFormGroup label="Last Name" name="lastName">
          <UInput v-model="state.lastName" />
        </UFormGroup>
        <UFormGroup label="Location" name="location">
          <UInput v-model="state.location" />
        </UFormGroup>

        <UFormGroup label="Email" name="email">
          <UInput v-model="state.email" type="email" />
        </UFormGroup>

        <UFormGroup label="Password" name="password">
          <UInput v-model="state.password" type="password" />
        </UFormGroup>

        <UButton type="submit">
          {{ loading ? "Submitting..." : "Submit" }}
        </UButton>
      </fieldset>
    </UForm>

    <ULink to="/login" class="mt-4"> Login </ULink>
  </UContainer>
</template>

<style scoped></style>
