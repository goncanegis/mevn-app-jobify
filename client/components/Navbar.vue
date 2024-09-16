<script setup lang="ts">
const { toggleSidebar } = useDashboardStore();
</script>

<template>
  <nav>
    <div class="nav-center">
      <UButton
        type="button"
        class="toggle-btn"
        icon="i-material-symbols:align-horizontal-left-rounded"
        @click="toggleSidebar"
      />

      <div>
        <Logo />
        <h4 class="logo-text">dashboard</h4>
      </div>
      <div class="btn-container">
        <ColorScheme>
          <ColorModeButton />
        </ColorScheme>
        <LogoutContainer />
      </div>
    </div>
  </nav>
</template>

<style scoped>
nav {
  height: var(--nav-height);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 1px 0 0 rgba(0, 0, 0, 0.1);
  background: var(--background-secondary-color);
  z-index: 20;
}

.nav-center {
  display: flex;
  width: 90vw;
  align-items: center;
  justify-content: space-between;
}
.toggle-btn {
  background: transparent;
  border-color: transparent;
  font-size: 1.75rem;
  color: var(--primary-500);
  cursor: pointer;
  display: flex;
  align-items: center;
}
.logo-text {
  display: none;
}
.logo {
  display: flex;
  align-items: center;
  width: 100px;
}
.btn-container {
  display: flex;
  align-items: center;
  gap: 16px;
}
@media (min-width: 992px) {
  nav {
    position: sticky;
    top: 0;
  }
  .nav-center {
    width: 90%;
  }
  .logo {
    display: none;
  }
  .logo-text {
    display: block;
  }
  .toggle-btn {
    display: none;
  }
}
</style>
