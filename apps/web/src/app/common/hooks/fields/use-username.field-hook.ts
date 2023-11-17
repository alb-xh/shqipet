import { useField } from "./use-field.hook";

export const useUsernameField = () => useField(
  'username',
  (value) => {
    if (!value) {
      return 'Username is required';
    }

    if (value.length < 4) {
      return 'Username must be at least 4 characters'
    }

    if (value.length > 50) {
      return 'Username must be less than 50 characters'
    }

    return '';
  },
);
