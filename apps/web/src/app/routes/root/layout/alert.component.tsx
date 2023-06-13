import { Box, Alert as MuiAlert } from "@mui/material";
import { useContext, useEffect, useState } from "react";

import { appContext } from "../../../common/app.context";

export const Alert = () => {
  const { alert, setAlert } = useContext(appContext);
  const [time, setTime] = useState(null);

  useEffect(() => {
    if (alert) {
      const { timeout = 5000 } = alert;

      if (time) {
        clearTimeout(time);
      }

      setTime(setTimeout(() => { setAlert(null); }, timeout));
    }
  }, [ alert ]);

  if (!alert) {
    return null;
  }

  const { text, severity } = alert;

  return (
    <Box>
      <MuiAlert severity={severity}>{text}</MuiAlert>
    </Box>
  );
}