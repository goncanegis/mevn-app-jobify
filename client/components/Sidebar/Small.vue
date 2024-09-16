<script setup lang="ts">
const { toggleSidebar } = useDashboardStore();
const { showSidebar } = storeToRefs(useDashboardStore());
</script>

<template>
  <aside>
    <div
      :class="[
        showSidebar ? 'sidebar-container show-sidebar' : 'sidebar-container',
      ]"
    >
      <div class="content">
        <button type="button" class="close-btn" @click="toggleSidebar">
          <UIcon name="i-material-symbols:close-rounded" class="w-5 h-5" />
        </button>
        <header>
          <Logo />
        </header>
        <NavLinks />
      </div>
    </div>
  </aside>
</template>

<style scoped>
@media (min-width: 992px) {
  aside {
    display: none;
  }
}
.sidebar-container {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: -1;
  opacity: 0;
  transition: var(--transition);
  visibility: hidden;
}
.show-sidebar {
  z-index: 99;
  opacity: 1;
  visibility: visible;
}
.content {
  background: var(--background-secondary-color);
  width: var(--fluid-width);
  height: 95vh;
  border-radius: var(--border-radius);
  padding: 4rem 2rem;
  position: relative;
  display: flex;
  align-items: center;
  flex-direction: column;
}
.close-btn {
  position: absolute;
  top: 10px;
  left: 10px;
  background: transparent;
  border-color: transparent;
  font-size: 2rem;
  color: var(--red-dark);
  cursor: pointer;
}
</style>
