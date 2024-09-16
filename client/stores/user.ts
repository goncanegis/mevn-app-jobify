import { defineStore } from "pinia";
import { apiService } from "~/utils/custom-fetch";

export const useUserStore = defineStore("user", {
  state: () => ({
    user: null as string | null,
  }),
  getters: {},
  actions: {
    async logout() {
      const router = useRouter();

      apiService.get("/auth/logout");

      sessionStorage.removeItem("token");
      this.user = null;
      router.push("/login");
    },
  },
  persist: {
    storage: persistedState.sessionStorage,
  },
});
