<script setup lang="ts">
const { showSidebar } = storeToRefs(useDashboardStore());
</script>

<template>
  <aside>
    <div
      :class="[
        showSidebar ? 'sidebar-container' : 'sidebar-container show-sidebar',
      ]"
    >
      <div class="content">
        <header>
          <NuxtLink to="/"><Logo /></NuxtLink>
        </header>
        <NavLinks is-big-sidebar />
      </div>
    </div>
  </aside>
</template>

<style scoped>
aside {
  display: none;
}
@media (min-width: 992px) {
  aside {
    display: block;
    box-shadow: 1px 0px 0px 0px rgba(0, 0, 0, 0.1);
  }
  .sidebar-container {
    background: var(--background-secondary-color);
    min-height: 100vh;
    height: 100%;
    width: 250px;
    margin-left: -250px;
    transition: margin-left 0.3s ease-in-out;
  }
  .content {
    position: sticky;
    top: 0;
  }
  .show-sidebar {
    margin-left: 0;
  }
  header {
    height: 6rem;
    display: flex;
    align-items: center;
    padding-left: 2.5rem;
  }

  .pending {
    background: var(--background-color);
  }
}
</style>
