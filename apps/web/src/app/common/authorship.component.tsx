import { Box, Link } from "@mui/material";

export default function Authorship () {
  return (
    <Box
      sx={{
        position: 'absolute',
        bottom: '15px',
        left: '8px',
        color: "white",
      }}
    >
      Created by <Link href="https://github.com/alb-xh">alb_xh</Link>
    </Box>
  );
}
