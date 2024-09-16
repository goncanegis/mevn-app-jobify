<script setup lang="ts">
const { user } = storeToRefs(useUserStore());
const { logout } = useUserStore();

const items = [
  [
    {
      label: "Logout",
      icon: "i-material-symbols:logout-rounded",
      click: () => {
        logout();
      },
    },
  ],
];
</script>

<template>
  <div class="">
    <UDropdown
      :items="items"
      class="btn flex items-center justify-center gap-2"
      :ui="{ trigger: 'flex items-center justify-center gap-2 w-full' }"
    >
      <img v-if="user?.avatar" :src="user?.avatar" alt="avatar" class="img" />

      <UIcon v-else name="i-material-symbols:account-circle" class="w-5 h-5" />

      <span class="text-[14px] leading-5">
        {{ user?.name }}
      </span>
      <UIcon name="i-ph:caret-down-light" class="w-5 h-5" />
    </UDropdown>
  </div>
</template>

<style scoped>
.container {
  position: relative;
}

.logout-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0 0.5rem;
}
.img {
  width: 25px;
  height: 25px;
  border-radius: 50%;
}
.dropdown {
  position: absolute;
  top: 45px;
  left: 0;
  width: 200px;
  box-shadow: var(--shadow-2);
  text-align: center;
  visibility: hidden;
  border-radius: var(--border-radius);
  background: var(--primary-500);
}
.show-dropdown {
  visibility: visible;
}
.dropdown-btn {
  border-radius: var(--border-radius);
  padding: 0.5rem;
  background: transparent;
  border-color: transparent;
  color: var(--white);
  letter-spacing: var(--letter-spacing);
  text-transform: capitalize;
  cursor: pointer;
  width: 200px;
  height: 100%;
}
</style>
