import { useState } from 'react';

import { useUser } from './use-user.hook';
import { useAlerts } from './use-alerts.hook';
import { useAppContext } from './use-app-context.hook';

export const useMessages = () => {
  const { user } = useUser();
  const { mustLoginAlert } = useAlerts();
  const {  messages, sendMessage } = useAppContext();

  const [ message, setMessage ] = useState('');

  const clear = () => setMessage('');
  const type = (e) => setMessage(e.target.value);

  const send = () => {
    if (!message) {
      return;
    }

    if (!user) {
      mustLoginAlert();
      return;
    }

    sendMessage({ user, text: message });
    clear();
  }

  const submit = (e) => {
    if (e?.key === 'Enter') {
      e.preventDefault();
      send();
    }
  }

  return {
    messages,
    message,
    clear,
    type,
    send,
    submit,
  }
}