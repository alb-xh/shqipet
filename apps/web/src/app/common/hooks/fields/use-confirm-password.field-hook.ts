import { useField } from "./use-field.hook";

export const useConfirmPasswordField = (passwordFieldName: string) => useField(
  'confirm-password',
  (value, form) => {
    if (!value) {
      return 'Confirm password is required';
    }

    if (value !== form.get(passwordFieldName)) {
       return 'Passwords do not match';
    }

    if (value.length > 50) {
      return 'Password must be less than 50 characters'
    }

    return '';
  });
