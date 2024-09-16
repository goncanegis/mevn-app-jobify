<script setup lang="ts">
import { z } from "zod";
import { apiService } from "~/utils/custom-fetch";

const { user } = storeToRefs(useUserStore());

const isUpdating = ref(false);
const loading = ref(true);

const schema = z.object({
  name: z.string().min(2, "Must be at least 2 characters"),
  lastName: z.string().min(2, "Must be at least 2 characters"),
  email: z.string().email("Invalid email"),
  location: z.string().min(2, "Must be at least 2 characters"),
});

const state = reactive({
  avatar: null as File | null,
  name: "",
  lastName: "",
  email: "",
  location: "",
});

const thumbnail = ref<string | null>(null);

/**
 * Check files if file already exists
 * If so, alert user
 * Then check for incoming file types
 * If file type is not allowed, alert user
 *  */
function onChange(file: File) {
  const incomingFile = file;

  if (!incomingFile) {
    return;
  }

  const allowedTypes = [".png", ".jpg", ".jpeg"];
  const fileType = incomingFile.name.slice(incomingFile.name.lastIndexOf("."));

  if (!allowedTypes.includes(fileType)) {
    showToast({ title: "Invalid file type!", type: "error" });
    return;
  }

  state.avatar = incomingFile;

  const reader = new FileReader();
  reader.onload = (e) => {
    thumbnail.value = e.target?.result as string;
  };
  reader.readAsDataURL(file);
}

// On page load fetch current user and set the state
const fetchCurrentUser = async () => {
  await apiService.get("/users/current-user", {
    errorMessage: "Failed to fetch user",
    onSuccess: (res) => {
      const { name, lastName, email, location } = res.userWithNoPassword;
      user.value = res.userWithNoPassword;

      state.name = name;
      state.lastName = lastName;
      state.email = email;
      state.location = location;
      state.avatar = null;
      thumbnail.value = null;
    },
    onFinally: () => {
      loading.value = false;
    },
  });
};

const removeImage = () => {
  state.avatar = null;
  thumbnail.value = null;
};

onBeforeMount(() => {
  fetchCurrentUser();
});

/**
 * Profile update submit
 */
const request = async (data) => {
  isUpdating.value = true;
  await apiService.patchFormData("/users/update-user", data, {
    successMessage: "Profile updated successfully",
    errorMessage: "Failed to update profile",
    onSuccess: () => {
      fetchCurrentUser();
    },
  });

  isUpdating.value = false;
};

const onSubmit = async () => {
  const formData = new FormData();
  if (state.avatar) {
    formData.append("avatar", state.avatar);
  }
  formData.append("name", state.name);
  formData.append("lastName", state.lastName);
  formData.append("email", state.email);
  formData.append("location", state.location);

  await request(formData);
};

definePageMeta({
  title: "Profile",
  layout: "dashboard-layout",
});
</script>

<template>
  <section>
    <UForm
      v-if="!loading"
      :state="state"
      :schema="schema"
      class="form"
      @submit="onSubmit"
    >
      <h4 class="form-title">profile</h4>
      <fieldset :disabled="isUpdating" class="form-center">
        <UFormGroup name="avatar" label="Avatar" class="form-row">
          <Dropzone
            ref="dropzoneRef"
            :disabled="isUpdating"
            :class="[isUpdating ? 'opacity-60' : '']"
            :default-img="user?.avatar"
            :thumbnail="thumbnail"
            :title="state.avatar?.name"
            @file="(val) => onChange(val)"
            @delete="removeImage"
          />
        </UFormGroup>
        <UFormGroup name="name" label="Name">
          <UInput
            v-model="state.name"
            type="text"
            name="name"
            placeholder="name"
          />
        </UFormGroup>

        <UFormGroup name="lastName" label="Last Name">
          <UInput
            v-model="state.lastName"
            type="text"
            name="lastName"
            placeholder="last name"
          />
        </UFormGroup>

        <UFormGroup name="email" label="Email">
          <UInput
            v-model="state.email"
            type="email"
            name="email"
            placeholder="email"
          />
        </UFormGroup>

        <UFormGroup name="location" label="Location">
          <UInput v-model="state.location" />
        </UFormGroup>

        <UButton
          type="submit"
          class="text-center justify-center"
          color="primary"
          variant="solid"
          >{{ isUpdating ? "Updating..." : "Submit" }}</UButton
        >
      </fieldset>
    </UForm>

    <div v-if="loading" class="animate-pulse">
      <div class="form">
        <h4 class="form-title bg-gray-300 h-6 w-1/4 mb-4"></h4>
        <fieldset class="form-center">
          <div class="flex gap-2 items-center mb-4">
            <div class="bg-gray-300 h-12 w-12 rounded-full mb-2"></div>
            <div class="bg-gray-300 h-6 w-1/2"></div>
          </div>
          <div class="form-row mb-4">
            <div class="bg-gray-300 h-[20px] rounded-sm w-1/4 mb-2"></div>
            <div class="bg-gray-300 h-[32px] rounded-[6px] w-full"></div>
          </div>
          <div class="form-row mb-4">
            <div class="bg-gray-300 h-[20px] rounded-sm w-1/4 mb-2"></div>
            <div class="bg-gray-300 h-[32px] rounded-[6px] w-full"></div>
          </div>
          <div class="form-row mb-4">
            <div class="bg-gray-300 h-[20px] rounded-sm w-1/4 mb-2"></div>
            <div class="bg-gray-300 h-[32px] rounded-[6px] w-full"></div>
          </div>
          <div class="form-row mb-4">
            <div class="bg-gray-300 h-[20px] rounded-sm w-1/4 mb-2"></div>
            <div class="bg-gray-300 h-[32px] rounded-[6px] w-full"></div>
          </div>
          <div class="text-center justify-center">
            <div class="bg-gray-300 h-10 w-1/4 mx-auto"></div>
          </div>
        </fieldset>
      </div>
    </div>
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
