import { useField } from "./use-field.hook";

export const useConfirmPasswordField = (password: ReturnType<typeof useField>) => useField(
  'confirm-password',
  (value) => {
    if (!value) {
      return 'Confirm password is required';
    }

    if (value !== password.value) {
       return 'Passwords do not match';
    }

    if (value.length > 50) {
      return 'Password must be less than 50 characters'
    }

    return '';
  });
