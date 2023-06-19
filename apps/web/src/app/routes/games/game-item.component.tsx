import { ImageListItem, ImageListItemBar } from "@mui/material"
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { randomId } from "@shqipet/common";

import { capOnlyFirst } from "../../helpers";
import { useUser, useAlerts, appContext } from "../../common";
import { Path } from "../../constants";

export const GameItem = ({ title, img, players, disable = false }) => {
  const navigate = useNavigate();
  const { user } = useUser();
  const { mustLoginAlert } = useAlerts();
  const { createRoom } = useContext(appContext);

  const onClick = () => {
    if (disable) {
      return;
    }

    if (!user) {
      mustLoginAlert();
      return;
    }

    const id = randomId();

    createRoom({ id, size: players, meta: { path: Path.Chess }});
    navigate(Path.Room.replace(':id', id));
  }

  return (
    <ImageListItem
      sx={{
        cursor: disable ? 'not-allowed' : 'pointer',
        opacity: disable ? 0.5 : 0.9,
        '&:hover': {
          opacity: disable ? 0.5 : 1,
        },
      }}
      key={img}
      onClick={onClick}
    >
      <img
        src={img}
        srcSet={img}
        alt={title}
        loading="lazy"
        style={{ borderRadius: '25px' }}
      />
      <ImageListItemBar
        sx={{ color: 'white', textAlign: 'center' }}
        position="below"
        title={capOnlyFirst(title)}
      />
    </ImageListItem>
  );
}