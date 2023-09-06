import { useState } from 'react';

import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Textarea from '@mui/joy/Textarea';

import { Comment } from './comment.component';
import { sleep } from '../../helpers';

const fetchComments = async (postId, timeout = 1000) => {
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