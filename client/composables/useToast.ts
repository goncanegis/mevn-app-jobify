import { useToast } from "vue-toastification";

const toast = useToast();

export const showToast = (options: {
  type?: "error" | "info" | "success";
  title: string;
  description?: string;
  timeout?: number;
}) => {
  if (options.type === "error") {
    toast.error(options.title, {
      timeout: options.timeout || 5000,
      closeOnClick: true,
      pauseOnHover: true,
    });
  } else if (options.type === "info") {
    toast.info(options.title, {
      timeout: options.timeout || 5000,
      closeOnClick: true,
      pauseOnHover: true,
    });
  } else {
    toast.success(options.title, {
      timeout: options.timeout || 5000,
      closeOnClick: true,
      pauseOnHover: true,
    });
  }
};
