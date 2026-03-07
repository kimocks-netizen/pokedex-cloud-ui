import { toast as baseToast } from "sonner";

export const toast = {
  success: (message: string) => {
    baseToast.success(message, {
      duration: 3000,
    });
  },
  error: (message: string) => {
    baseToast.error(message, {
      duration: 3000,
    });
  },
  info: (message: string) => {
    baseToast.info(message, {
      duration: 3000,
    });
  },
  loading: (message: string) => {
    return baseToast.loading(message);
  },
};
