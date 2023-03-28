import toast from 'react-hot-toast';

export const success = (message, id) =>
  toast.success(message, {
    id: id,
  });
export const failure = (message, id) =>
  toast.error(message, {
    id: id,
  });
export const loading = (message) => toast.loading(message, {});

export function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export const toastTemplate = (toastType, message, id) => {
  return toastType(message, { id: id, duration: 6000 });
};
