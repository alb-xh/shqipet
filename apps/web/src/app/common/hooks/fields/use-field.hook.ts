import { useState } from "react";

type FieldReturnType = {
  name: string;
  value: string;
  error: string;
  validate: (form: FormData) => void;
}

export const useField = (name: string,  validate: (value: string) => string):  FieldReturnType => {
  const [ value, setValue ] = useState<string>('');
  const [ error, setError ] = useState<string>('');

  return {
    name,
    value,
    error,
    validate: (form: FormData): void => {
      const value = form.get(name) as string;
      const error = validate(value);

      setError(error);
      setValue(value);
    }
  };
};
