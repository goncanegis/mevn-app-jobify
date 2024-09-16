<script setup lang="ts">
import { apiService } from "~/utils/custom-fetch";

const userStore = useUserStore();

await apiService.get("/users/current-user", {
  onSuccess: (res) => {
    userStore.user = res.userWithNoPassword;
  },
  onError: (error) => {
    console.error(error);
  },
});
</script>

<template>
  <section>
    <main class="dashboard">
      <SidebarSmall />

      <SidebarBig />
      <div>
        <Navbar />

        <div class="dashboard-page">
          <!-- <Loading v-if="loading" /> -->

          <slot />
        </div>
      </div>
    </main>
  </section>
</template>

<style scoped>
.dashboard {
  display: grid;
  grid-template-columns: 1fr;
}
.dashboard-page {
  width: 90vw;
  margin: 0 auto;
  padding: 2rem 0;
}
@media (min-width: 992px) {
  .dashboard {
    grid-template-columns: auto 1fr;
  }
  .dashboard-page {
    width: 90%;
  }
}
</style>
