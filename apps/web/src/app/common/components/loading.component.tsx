import { Box, CircularProgress } from "@mui/material";

export const Loading = () => {
  return (
    <Box className='loading'>
      <CircularProgress />
    </Box>
  );
}
