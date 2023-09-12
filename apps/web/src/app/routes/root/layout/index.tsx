import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";

import { NavBar } from './nav-bar.component';
import { Footer } from './footer.component';
import { Loading, useUser } from "../../../common";

export const RootLayout = () => {
  const { isLoading } = useUser();

  return (
    <Box>
      <NavBar />
      <Box sx={{
        paddingTop: '90px',
        paddingBottom: '50px',
      }}>
        {
          isLoading
            ? <Loading />
            : <Outlet />
        }
      </Box>
      <Footer />
    </Box>
  );
}

