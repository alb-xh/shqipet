import * as React from 'react';
import { useContext } from 'react';
import { Grid, Box, Avatar }  from '@mui/material';

import logo from '../../../../assets/logo.png';
import { appContext } from '../../../common/app.context';

import { Alert } from './alert.component';

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
  const { user } = useContext(appContext);

  return (
    <Grid
      container
      spacing={2}
      sx={{
        width: '100%',
        position: 'sticky',
        backgroundColor: '#ffffff26',
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
