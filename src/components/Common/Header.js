import React from 'react';
import { AppBar, Toolbar, Typography } from '@mui/material';
import { styled } from '@mui/system';

const AppBarStyled = styled(AppBar)(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 1,
}));

const Header = () => (
  <AppBarStyled position="fixed">
    <Toolbar>
      <Typography variant="h6" noWrap>
        Good morning, Joe!
      </Typography>
    </Toolbar>
  </AppBarStyled>
);

export default Header;
