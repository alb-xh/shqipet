import * as React from 'react';

import { Grid, Box, Avatar }  from '@mui/material';

import logo from '../../../assets/logo.png';

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

export const NavBar = () => (
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
    <GridItem xs={10} />
    <GridItem xs={1} >
      <Avatar alt="" src="/static/images/avatar/2.jpg" />
    </GridItem>
  </Grid>
);
