import { useContext } from "react";

import { appContext } from "../app.context";

export const useAlerts = () => {
  const { setAlert } = useContext(appContext);

  return {
    unexpectedAlert: () => setAlert({ text: 'Something went wrong', severity: 'error' }),
    mustLoginAlert: () => setAlert({ text: 'You must login!', severity: 'warning' }),
  }
}