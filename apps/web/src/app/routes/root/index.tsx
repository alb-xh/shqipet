import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";

import { NavBar } from './nav-bar.component';
import { Footer } from './footer.component';

export const Root = () => (
  <Box>
    <NavBar />
    <Box sx={{ marginBottom: '50px' }}>
      <Outlet />
    </Box>
    <Footer />
  </Box>
);
