import { useState } from 'react';

import { styled } from '@mui/material/styles';

import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';

import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

import { red } from '@mui/material/colors';

import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import CommentIcon from '@mui/icons-material/Comment';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Popover from '@mui/material/Popover';

import { Box, CircularProgress, List, ListItem, Button } from '@mui/material';

import Divider from '@mui/material/Divider';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Textarea from '@mui/joy/Textarea';

import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';

import InboxIcon from '@mui/icons-material/Inbox';
import DraftsIcon from '@mui/icons-material/Drafts';

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));
const fetchComments = async (postId, timeout = 2000) => {
  await sleep(timeout);

  return [
    {
      avatarSrc: 'https://lh3.googleusercontent.com/a/AAcHTteB730_9lMffREI-tTAsiJWoU7ywvSVmSFNgaXQP_KrbIs=s96-c',
      author: 'Albano Xhafaj',
      text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum!',
      date: '05-01-2020',
    },
    {
      avatarSrc: 'https://lh3.googleusercontent.com/a/AAcHTteB730_9lMffREI-tTAsiJWoU7ywvSVmSFNgaXQP_KrbIs=s96-c',
      author: 'Tony Stark',
      text: 'Comment 2',
      date: '13-12-2021',
    },
    {
      avatarSrc: 'https://lh3.googleusercontent.com/a/AAcHTteB730_9lMffREI-tTAsiJWoU7ywvSVmSFNgaXQP_KrbIs=s96-c',
      author: 'Bruce Wayne',
      text: 'Comment 3',
      date: '13-12-2022',
    },
  ]
}


export default function BasicPopover() {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <div>
      <Button aria-describedby={id} variant="contained" onClick={handleClick}>
        Open Popover
      </Button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <Typography sx={{ p: 2 }}>The content of the Popover.</Typography>
      </Popover>
    </div>
  );
}

export const Comment = ({
  avatarSrc,
  author,
  text,
  date,
}) => {
  return (
    <ListItem alignItems="flex-start">
      <ListItemAvatar>
        <Avatar alt={author} src={avatarSrc} />
      </ListItemAvatar>
      <ListItemText
        primary={<Typography variant='body2'>{text}</Typography>}
        secondary={`${author} on ${date}`}
      />
    </ListItem>
  )
}


export function Comments ({
  avatarSrc,
  author,
  postId,
}) {
  const [comments, setComments] = useState(null);
  const [loading, setLoading] = useState(comments === null);

  fetchComments(postId).then((response) => {
    setComments(response);
    setLoading(false)
  });

  if (loading) {
    return (
      <Box display={'flex'} justifyContent={'center'}>
        <CircularProgress />
      </Box>
    )
  }

  return (
    <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
      {
        comments.map((comment, index) => (
          <>
            <Comment key={index} {...comment} />
            <Divider variant="inset" component="li" />
          </>
        ))
      }
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar alt={author} src={avatarSrc} />
        </ListItemAvatar>
        <Box marginTop='8px' width='100%' alignItems={'left'}>
          <Textarea
            minRows={2}
            maxRows={4}
            name="Outlined"
            placeholder="Type in here…"
            variant="outlined"
          />
          <Box display={'flex'} width='100%' marginTop='4px' justifyContent={'end'}>
            <Button variant="contained">Post</Button>
          </Box>
        </Box>
      </ListItem>
    </List>
  );
}

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

export const Posts = () => {
  return (
    <Box display={'flex'} justifyContent={'center'} alignItems={'center'} height={'100%'}>
      <List>
        <ListItem>
          <Post
            id={1}
            title={'Post 1'}
            author={'Albano Xhafaj'}
            date={'2021-10-10'}
            avatarSrc={'https://lh3.googleusercontent.com/a/AAcHTteB730_9lMffREI-tTAsiJWoU7ywvSVmSFNgaXQP_KrbIs=s96-c'}
            imageSrc={'https://source.unsplash.com/random'}
            alt={'random'}
            text={'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum!'}
            likes={31}
            comments={12}
            liked={true}
          />
        </ListItem>
        <ListItem>
          <Post
            id={2}
            title={'Post 2'}
            author={'Albano Xhafaj'}
            date={'2021-10-10'}
            avatarSrc={'https://lh3.googleusercontent.com/a/AAcHTteB730_9lMffREI-tTAsiJWoU7ywvSVmSFNgaXQP_KrbIs=s96-c'}
            imageSrc={''}
            alt={'random'}
            text={'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum!'}
            likes={31}
            comments={12}
            liked={false}
          />
        </ListItem>
        <ListItem>
          <Post
            id={3}
            title={'Post 3'}
            author={'Albano Xhafaj'}
            date={'2021-10-10'}
            avatarSrc={'https://lh3.googleusercontent.com/a/AAcHTteB730_9lMffREI-tTAsiJWoU7ywvSVmSFNgaXQP_KrbIs=s96-c'}
            imageSrc={'https://source.unsplash.com/random'}
            alt={'random'}
            text={'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum!'}
            likes={31}
            comments={12}
            liked={true}
          />
        </ListItem>
        <ListItem>
          <Post
            id={4}
            title={'Post 4'}
            author={'Albano Xhafaj'}
            date={'2021-10-10'}
            avatarSrc={'https://lh3.googleusercontent.com/a/AAcHTteB730_9lMffREI-tTAsiJWoU7ywvSVmSFNgaXQP_KrbIs=s96-c'}
            imageSrc={'https://source.unsplash.com/random'}
            alt={'random'}
            text={'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum!'}
            likes={31}
            comments={12}
            liked={true}
          />
        </ListItem>
      </List>
      <Box position="fixed" bottom={75} right={39}>
        <Fab size='large' color="primary" aria-label="add">
          <AddIcon />
        </Fab>
      </Box>
    </Box>
  );
}
