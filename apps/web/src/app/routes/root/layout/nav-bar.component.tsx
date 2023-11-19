import * as React from 'react';
import { Grid, Box, Avatar }  from '@mui/material';

import logo from '../../../../assets/logo.png';

import { Alert } from './alert.component';
import { useUser } from '../../../common';
import { Search } from './search.component';
import { UserAvatar } from '../../../common/components/user-avatar';

const GridItem = (props) => {
  return (
    <Grid
      item
      sx={{
        padding: '4px !important',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
      xs={props.xs}
    >
      {props.children ? props.children : null}
    </Grid>
  );
}

export const NavBar = () => {
  const { user } = useUser();

  return (
    <Grid
      container
      spacing={2}
      sx={{
        width: '100%',
        position: 'fixed',
        zIndex: 1,
        backgroundColor: '#2b2b2b',
        margin: 0,
      }} >
      <GridItem xs={1} >
        <Box
          component="img"
          className='logo'
          alt="logo"
          src={logo}
        />
      </GridItem>
      <GridItem xs={4}>
        <Search  />
      </GridItem>
      <GridItem xs={2} >
        <Alert />
      </GridItem>
      <GridItem xs={4} />
      <GridItem xs={1} >
        <UserAvatar />
      </GridItem>
    </Grid>
  );
}
