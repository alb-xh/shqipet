import { useState } from 'react';

import { faker } from '@faker-js/faker';

import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';

import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import IconButton from '@mui/material/IconButton';

import { useSearch } from '../../common';
import { Post } from './post.component';
import { sleep } from '../../helpers';
import { Skeleton } from '@mui/material';


const fetchPosts = async () => {
  await sleep(faker.number.int({ min: 1000, max: 3000 }));

  return [ ...Array(10) ].map(() => ({
    id: faker.string.uuid(),
    title: faker.lorem.sentence(),
    author: faker.person.fullName(),
    date: faker.date.past({ years: 5 }).toISOString().split('T')[0],
    avatarSrc: faker.image.avatar(),
    imageSrc: faker.image.url(),
    alt: faker.word.noun(),
    text: faker.lorem.text(),
    likes: faker.number.int(300),
    comments: faker.number.int(50),
    liked: faker.datatype.boolean(),
  }));
}

export const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [ showSkeleton, setShowSkeleton ] = useState(true);
  const { useSearchValue, useLoadMore } = useSearch([ 'Title', 'Author']);

  useSearchValue(async () => {
    setShowSkeleton(true);

    const newPosts = await fetchPosts();
    setPosts(newPosts);

    await sleep(1000);
    setShowSkeleton(false);
  });

  const loadMore = useLoadMore(async () => {
    setShowSkeleton(true);

    const newPosts = await fetchPosts();
    setPosts([ ...posts, ...newPosts ].slice(-30));

    await sleep(1000);
    setShowSkeleton(false);
  });

  return (
    <Box
      display={'flex'}
      flexDirection={'column'}
      justifyContent={'center'}
      alignItems={'center'}
      height={'100%'}
    >
      <List>
        {
          posts.map((post, index) => (
            <ListItem
              sx={{ display: showSkeleton  ? 'none' : 'flex' }}
              key={index}
            >
              <Post {...post} />
            </ListItem>
          ))
        }
        {
          showSkeleton && [ ...Array(10) ].map((_, index) => (
            <ListItem key={index}>
              <Skeleton
                variant="rounded"
                width={600}
                height={500}
                sx={{ bgcolor: '#2b2b2b' }}
              />
            </ListItem>
          ))
        }

      </List>
      {
        posts.length > 0 && (
          <IconButton
            sx={{
              bgcolor: '#818181',
              marginBottom: 3,
              "&:hover": { bgcolor: "white" }
            }}
            onClick={loadMore}
          >
            <MoreHorizIcon />
          </IconButton>
        )
      }
      <Box position="fixed" bottom={75} right={39}>
        <Fab size='large' color="primary" aria-label="add">
          <AddIcon />
        </Fab>
      </Box>
    </Box>
  );
}
