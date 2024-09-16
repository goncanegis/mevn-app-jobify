<script setup lang="ts">
import { apiService } from "~/utils/custom-fetch";
import { useRoute } from "vue-router";

const route = useRoute();

await apiService.get("/test", {
  successMessage: "Welcome back!",
  errorMessage: "Something went wrong, please reload page!",
});

onMounted(() => {
  window.addEventListener("resize", () => {
    const width = window.innerWidth;

    if (width > 768) {
      useDashboardStore().showSidebar = false;
    }
  });
});

const pageTitle = computed(() => {
  return route.meta.title || "Jobify";
});

useHead({
  titleTemplate: (title) => {
    return title ? `${title} - Jobify` : "Jobify";
  },
  title: pageTitle,
});
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
