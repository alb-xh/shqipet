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
  const { useSearchValue, useLoadMore } = useSearch([ 'Title', 'Author']);

  const fetchAndSetPosts = async () => {
    if (posts.length) {
      setPosts([]);
    }

    const newPosts = await fetchPosts();
    setPosts(newPosts);
  };

  useSearchValue(fetchAndSetPosts);
  const loadMore = useLoadMore(fetchAndSetPosts);

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
            <ListItem key={index}>
              <Post
                id={post.id}
                title={post.title}
                author={post.author}
                date={post.date}
                avatarSrc={post.avatarSrc}
                imageSrc={post.imageSrc}
                alt={post.alt}
                text={post.text}
                likes={post.likes}
                comments={post.comments}
                liked={post.liked}
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
