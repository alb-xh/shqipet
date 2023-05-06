import { Box, CircularProgress } from "@mui/material";

export default function Loading () {
  return (
    <Box className='loading'>
      <CircularProgress />
    </Box>
  );
}
