import { useField } from "./use-field.hook";

export const usePasswordField = () => useField(
  'password',
  (value) => {
    if (!value) {
      return 'Password is required';
    }

    if (value.length < 8) {
      return 'Password must be at least 8 characters'
    }

    if (value.length > 50) {
      return 'Password must be less than 50 characters'
    }

    return '';
  },
);
