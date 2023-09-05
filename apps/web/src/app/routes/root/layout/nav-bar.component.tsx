import * as React from 'react';
import { Grid, Box, Avatar }  from '@mui/material';

import logo from '../../../../assets/logo.png';

import { Alert } from './alert.component';
import { useUser } from '../../../common';
import { useNavigate } from 'react-router-dom';
import { Path } from '../../../constants';

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
  const navigate = useNavigate();

  return (
    <Grid
      container
      spacing={2}
      sx={{
        width: '100%',
        position: 'sticky',
        backgroundColor: '#2b2b2b',
        margin: 0,
      }} >
      <GridItem xs={1} >
        <Box
          component="img"
          className='logo'
          alt="logo"
          src={logo}
          onClick={() => navigate(Path.About)}
        />
      </GridItem>
      <GridItem xs={4} />
      <GridItem xs={2} >
        <Alert />
      </GridItem>
      <GridItem xs={4} />
      <GridItem xs={1} >
        <Avatar alt="User's avatar" src={user?.avatar} />
      </GridItem>
    </Grid>
  );
}
