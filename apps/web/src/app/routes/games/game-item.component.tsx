import { ImageListItem, ImageListItemBar} from "@mui/material"

export const GameItem = ({ title, img, disable = false }) => (
  <ImageListItem
    sx={{
      cursor: disable ? 'not-allowed' : 'pointer',
      opacity: disable ? 0.5 : 0.9,
      '&:hover': {
        opacity: disable ? 0.5 : 1,
      },
    }}
    key={img}
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
      title={title}
    />
  </ImageListItem>
);