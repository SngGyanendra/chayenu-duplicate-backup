import toast from 'react-hot-toast';

export const success = (message, id) =>
  toast.success(message, {
    id: id,
    duration: 6000,
  });
export const failure = (message, id) =>
  toast.error(message, {
    id: id,
    duration: 6000,
  });
export const loading = (message) =>
  toast.loading(message, { duration: 100000 });

export function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export const toastTemplate = (toastType, message, id) => {
  return toastType(message, { id: id });
};
