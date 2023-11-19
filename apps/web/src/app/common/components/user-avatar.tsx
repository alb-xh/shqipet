import { Avatar } from "@mui/material";

import { useUser } from "../hooks"

export const UserAvatar = () => {
  const { user } = useUser();

  return (
    <Avatar alt="User's avatar" src={user?.profilePictureUrl}>
      {user ? `${user.firstName[0]}${user.lastName[0]}`.toUpperCase() : null}
    </Avatar>
  );
}
