import { defineStore } from "pinia";

export const useDashboardStore = defineStore("dashboard", {
  state: () => ({
    showSidebar: false,
  }),
  getters: {},
  actions: {
    toggleSidebar() {
      this.showSidebar = !this.showSidebar;
    },
  },
});
