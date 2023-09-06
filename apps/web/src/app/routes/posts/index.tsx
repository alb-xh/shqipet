import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';

import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';

import { useSearch } from '../../common';
import { Post } from './post.component';
import { sleep } from '../../helpers';

export const Posts = () => {
  const { useSearchValue } = useSearch([ 'Title', 'Author']);

  useSearchValue(async (value) => {
    await sleep(5000);
    console.log(value);
  });

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
