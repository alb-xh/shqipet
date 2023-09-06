import { useAppContext } from "./use-app-context.hook";

export const useAlerts = () => {
  const { setAlert } = useAppContext();

  const spawnAlert = (severity: 'success' | 'info' | 'warning' | 'error') => (text: string) => setAlert({ text, severity });
  const errorAlert = spawnAlert('error');
  const warningAlert = spawnAlert('warning');
  const successAlert = spawnAlert('success');
  const unexpectedAlert = () => errorAlert('Unexpected error!');
  const mustLoginAlert = () => warningAlert('You must login!');

  return {
    errorAlert,
    warningAlert,
    successAlert,
    unexpectedAlert,
    mustLoginAlert,
  };
}