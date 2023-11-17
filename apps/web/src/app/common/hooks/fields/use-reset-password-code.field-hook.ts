import { useField } from "./use-field.hook";

export const UseResetPasswordCodeFieldHook = () => useField(
  'reset-password-code',
  (value) => {
    if (!value) {
      return 'Reset password code is required';
    }

    if (value.length !== 8) {
      return 'Reset password code must be 8 characters'
    }

    return '';
  },
);
