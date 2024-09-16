<script setup lang="ts">
const { toggleSidebar } = useDashboardStore();
const { user } = storeToRefs(useUserStore());

const props = defineProps<{
  isBigSidebar?: boolean;
}>();

const links = [
  {
    text: "add job",
    path: "add-job",
    icon: "i-material-symbols:dashboard",
  },
  {
    text: "all jobs",
    path: "all-jobs",
    icon: "i-hugeicons:job-search",
  },
  {
    text: "stats",
    path: "stats",
    icon: "i-material-symbols:query-stats",
  },
  {
    text: "profile",
    path: "profile",
    icon: "i-material-symbols:account-circle",
  },
  {
    text: "admin",
    path: "admin",
    icon: "i-mdi:notebook",
    adminOnly: true,
  },
];

const linksFiltered = computed(() => {
  if (!user.value) return links.filter((link) => !link.adminOnly);

  return links.filter((link) => {
    if (link.adminOnly) {
      return user.value.role === "admin";
    }
    return !link.adminOnly;
  });
});

const handleClick = () => {
  if (props.isBigSidebar) return;

  toggleSidebar();
};

const style = computed(() => {
  return {
    paddingLeft: props.isBigSidebar ? "1.25rem" : "1rem",
    hoverPaddingLeft: props.isBigSidebar ? "1.5rem" : "1.25rem",
    fontSize: props.isBigSidebar ? "1rem" : "1.5rem",
    iconSize: props.isBigSidebar ? "1.5rem" : "2.5rem",
    paddingTop: props.isBigSidebar ? "0.5rem" : "1rem",
  };
});
</script>

<template>
  <div class="nav-links">
    <NuxtLink
      v-for="link in linksFiltered"
      :to="link.path"
      :key="link.text"
      class="nav-link"
      @click.stop="handleClick"
      end
    >
      <UIcon class="icon text-primary-500" :name="link.icon" />
      {{ link.text }}
    </NuxtLink>
  </div>
</template>

<style scoped>
.nav-links {
  padding-top: v-bind("style.paddingTop");
  display: flex;
  flex-direction: column;
}
.nav-link {
  display: flex;
  align-items: center;
  color: var(--text-secondary-color);
  padding: 1rem;
  font-size: v-bind("style.fontSize");
  text-transform: capitalize;
  transition: padding-left 0.3s ease-in-out;
}
.nav-link:hover {
  padding-left: v-bind("style.hoverPaddingLeft");
  color: var(--primary-500);
  transition: var(--transition);
}
.icon {
  font-size: v-bind("style.iconSize");
  margin-right: 1rem;
  display: grid;
  place-items: center;
}
</style>
