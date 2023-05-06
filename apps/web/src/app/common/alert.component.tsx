import { Box, Alert as MuiAlert } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import AppContext from "./app.context";

export default function Alert () {
  const { alert, setAlert } = useContext(AppContext);
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

  const { text, severity = 'info' } = alert;

  return (
    <Box
      sx={{
        position: 'absolute',
        top: '5%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
      }}
    >
      <MuiAlert severity={severity}>{text}</MuiAlert>
    </Box>
  );
}