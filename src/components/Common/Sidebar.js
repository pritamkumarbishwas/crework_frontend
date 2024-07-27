import React from 'react';
import { Drawer, List, ListItem, ListItemText } from '@mui/material';
import { styled } from '@mui/system';

const drawerWidth = 240;

const DrawerStyled = styled(Drawer)({
  width: drawerWidth,
  flexShrink: 0,
  '& .MuiDrawer-paper': {
    width: drawerWidth,
    boxSizing: 'border-box',
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(1, 2),
  justifyContent: 'flex-end',
}));

const Sidebar = () => (
  <DrawerStyled variant="permanent">
    <DrawerHeader />
    <List>
      <ListItem button>
        <ListItemText primary="Home" />
      </ListItem>
      <ListItem button>
        <ListItemText primary="Boards" />
      </ListItem>
      <ListItem button>
        <ListItemText primary="Settings" />
      </ListItem>
      <ListItem button>
        <ListItemText primary="Teams" />
      </ListItem>
      <ListItem button>
        <ListItemText primary="Analytics" />
      </ListItem>
    </List>
  </DrawerStyled>
);

export default Sidebar;
