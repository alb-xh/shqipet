import { Grid, Box, Typography } from "@mui/material"

import { faker } from '@faker-js/faker';

import { useSearch } from '../../common';
import { sleep } from "../../helpers";

import { ChatList } from "./chat-list.component";
import { useState } from "react";

const fetchEntities = async () => {
  await sleep(faker.number.int({ min: 1000, max: 3000 }));

  return [ ...Array(10) ].map(() => ({
    id: faker.string.uuid(),
    avatar: faker.image.avatar(),
    name: faker.person.fullName(),
    bio: faker.lorem.sentence(),
  }));
}

export const Chat = () => {
  const [loadingEntities, setLoadingEntities] = useState(true);
  const [entities, setEntities] = useState([]);
  const { useSearchValue } = useSearch([ 'User', 'Group']);

  useSearchValue(async () => {
    setLoadingEntities(true);

    await sleep(1000);

    const entities = await fetchEntities();
    setEntities(entities);

    await sleep(1000);
    setLoadingEntities(false);
  });

  return (
  <Grid
    container
    spacing={2}
    height='86.5vh'
  >
    <Grid item
      xs={3}
      borderRight={2}
      borderColor={'grey'}
      bgcolor={'#222227'}
    >
      <Box
        display={'flex'}
        flexDirection={'column'}
        alignContent={'center'}
        alignItems={'center'}
        justifyContent={'center'}
      >
        <Typography
          variant={'h5'}
          color="white"
          marginY={2}
        >
          Chats
        </Typography>
        <ChatList entities={entities} loading={loadingEntities} />
      </Box>
    </Grid>
    <Grid
      item
      xs={9}
      bgcolor={'#d0e1fb'}
    >
    </Grid>
  </Grid>
  )
}
