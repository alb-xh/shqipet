import { useState, useEffect } from "react";

import { FieldReturnType } from "./use-field.hook";
import { useAlerts } from "../use-alerts.hook";

export const useSubmit = (fields: FieldReturnType[], onSubmit: () => Promise<void>) => {
  const { errorAlert } = useAlerts();
  const [submitted, setSubmitted ] = useState(false);

  useEffect(() => {
    if (!submitted || fields.some((field) => !!field.error)) {
      return;
    }

    onSubmit()
      .catch((error) => {
        errorAlert(error?.response?.data?.message || error.message || error || 'Unexpected error!');
      })
      .finally(() => setSubmitted(false));
  }, [ submitted ]);

  return (event) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    for (const field of fields) {
      field.validate(data);
    }

    setSubmitted(true);
  };
}
