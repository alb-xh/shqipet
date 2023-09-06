import { useState } from 'react';

import { styled } from '@mui/material/styles';
import { red } from '@mui/material/colors';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Popover from '@mui/material/Popover';

import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import CommentIcon from '@mui/icons-material/Comment';
import MoreVertIcon from '@mui/icons-material/MoreVert';

import { Comments } from './comments.component';

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

export function Post({
  id,
  title,
  author,
  date,
  avatarSrc,
  imageSrc,
  alt,
  text,
  likes,
  comments,
  liked,
}) {
  const [isLiked, setIsLiked] = useState(liked);
  const [likedCount, setLikedCount] = useState(likes);
  const [showComments, setShowComments] = useState(false);
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const open = Boolean(anchorEl);
  const popoverId = open ? 'simple-popover' : undefined;

  const handleOpenOptions = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseOptions = () => {
    setAnchorEl(null);
  };

  const handleCommentsClick = () => {
    setShowComments(!showComments);
  };

  const handleLikeClick = () => {
    setLikedCount(isLiked ? likedCount - 1 : likedCount + 1);
    setIsLiked(!isLiked);
  };

  return (
    <Card sx={{ width: 600, bgcolor: 'white' }}>
      <CardHeader
        avatar={
          <Avatar
            sx={{ bgcolor: red[500] }}
            src={avatarSrc}
            alt={author}
          />
        }
        action={
          <Box>
            <IconButton onClick={handleOpenOptions}>
              <MoreVertIcon />
            </IconButton>
            <Popover
              id={popoverId}
              open={open}
              anchorEl={anchorEl}
              onClose={handleCloseOptions}
              anchorOrigin={{
                vertical: 'center',
                horizontal: 'left',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
            >
              <List>
                <ListItem disablePadding>
                  <ListItemButton>
                    <ListItemText primary="Edit" />
                  </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                  <ListItemButton>
                    <ListItemText primary="Delete" />
                  </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                  <ListItemButton>
                    <ListItemText primary="Hide" />
                  </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                  <ListItemButton>
                    <ListItemText primary="Report" />
                  </ListItemButton>
                </ListItem>
              </List>
            </Popover>
          </Box>
        }
        title={title}
        subheader={`${author} on ${date}`}
      />
      {
        imageSrc && <CardMedia
          sx={{ maxHeight: 300 }}
          component="img"
          image={imageSrc}
          alt={alt || ""}
        />
      }
      <CardContent>
        <Typography variant="body2">{text}</Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton onClick={handleLikeClick}>
          { isLiked ? <FavoriteIcon /> : <FavoriteBorderIcon /> }
          <Typography variant="body2" >&nbsp;{likedCount}</Typography>
        </IconButton>
        <IconButton onClick={handleCommentsClick}>
          <CommentIcon />
          <Typography variant="body2" >&nbsp;{comments}</Typography>
        </IconButton>
        <ExpandMore
          expand={showComments}
          onClick={handleCommentsClick}
        >
        </ExpandMore>
      </CardActions>
      <Collapse
        in={showComments}
        timeout="auto"
        unmountOnExit
      >
        <CardContent>
          <Comments
            avatarSrc={avatarSrc}
            author={author}
            postId={id}
          />
        </CardContent>
      </Collapse>
    </Card>
  );
}