import { Outlet } from "react-router-dom";
import { Box, List, ListItem, ListItemText, Divider } from "@mui/material";

export const AboutLayout = () => {
  return (
    <Box
      display={'flex'}
      sx={{
        color: 'white',
        backgroundColor: 'blue',
        width: '20%',
        height: '100%',
      }}
    >
      <List component="nav" aria-label="mailbox folders">
        <ListItem button>
          <ListItemText primary="Inbox" />
        </ListItem>
        <Divider />
        <ListItem button divider>
          <ListItemText primary="Drafts" />
        </ListItem>
        <ListItem button>
          <ListItemText primary="Trash" />
        </ListItem>
        <Divider light />
        <ListItem button>
          <ListItemText primary="Spam" />
        </ListItem>
      </List>
      <Outlet />
    </Box>
  );
}

