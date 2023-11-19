import { useField } from "./use-field.hook";

export const useLastNameField = () => useField(
  'last-name',
  (value) => {
    if (!value) {
      return 'Last name is required';
    }

    if (value.includes(' ')) {
      return 'Last name cannot contain spaces';
    }

    if (value.length < 2) {
      return 'Last name must be at least 2 characters';
    }

    if (value.length > 50) {
      return 'Last name must be at most 50 characters';
    }

    return '';
  }
);
