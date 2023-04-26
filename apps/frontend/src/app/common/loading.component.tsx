import { CircularProgress } from "@mui/material";
import { CSSProperties } from "react";

const divStyle: CSSProperties = {
  display: "flex",
  height: '70vh',
  width: '100%',
  justifyContent: 'center',
  alignItems: 'center',
};

export default function Loading () {
  return (
    <div style={divStyle}>
      <CircularProgress />
    </div>
  );
}
