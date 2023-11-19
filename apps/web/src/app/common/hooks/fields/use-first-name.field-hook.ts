import { useField } from "./use-field.hook";

export const useFirstNameField = () => useField(
  'first-name',
  (value) => {
    if (!value) {
      return 'First name is required';
    }

    if (value.includes(' ')) {
      return 'First name cannot contain spaces';
    }

    if (value.length < 2) {
      return 'First name must be at least 2 characters';
    }

    if (value.length > 50) {
      return 'First name must be at most 50 characters';
    }

    return '';
  }
);
