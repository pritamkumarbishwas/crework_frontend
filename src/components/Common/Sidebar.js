import React from 'react';
import { Drawer, Box, List, ListItem, ListItemText, ListItemIcon, IconButton, Button, Avatar, Typography, Divider } from '@mui/material';
import { Home, Dashboard, Settings, Group, BarChart, Add, Notifications } from '@mui/icons-material';
import { styled } from '@mui/system';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import SouthIcon from '@mui/icons-material/South';

const drawerWidth = 240;

const DrawerStyled = styled(Drawer)({
  width: drawerWidth,
  flexShrink: 0,
  '& .MuiDrawer-paper': {
    width: drawerWidth,
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(1, 2),
  justifyContent: 'space-between',
}));

const ProfileSection = styled('div')({
  display: 'flex',
  alignItems: 'center',
  padding: '16px',
});

const BottomSection = styled('div')({
  padding: '16px',
  textAlign: 'center',
});

const Sidebar = ({ handleOpenCreateTask }) => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };


  const username = sessionStorage.getItem('userName') || 'Guest';

  return (
    <DrawerStyled variant="permanent">
      <div>
        <ProfileSection>
          <Avatar alt="Joe Gardner" src="/static/images/avatar/1.jpg" />
          <Typography variant="h6" style={{ marginLeft: 16 }}>{username}</Typography>
        </ProfileSection>
        <DrawerHeader>
          <IconButton>
            <Notifications />
          </IconButton>
          <IconButton>
            <Brightness4Icon />
          </IconButton>
          <IconButton>
            <ArrowForwardIcon />
          </IconButton>
          <Button variant="outlined" onClick={handleLogout}>Logout</Button>
        </DrawerHeader>
        <Divider />
        <List>
          <ListItem button>
            <ListItemIcon><Home /></ListItemIcon>
            <ListItemText primary="Home" />
          </ListItem>
          <ListItem button>
            <ListItemIcon><Dashboard /></ListItemIcon>
            <ListItemText primary="Boards" />
          </ListItem>
          <ListItem button>
            <ListItemIcon><Settings /></ListItemIcon>
            <ListItemText primary="Settings" />
          </ListItem>
          <ListItem button>
            <ListItemIcon><Group /></ListItemIcon>
            <ListItemText primary="Teams" />
          </ListItem>
          <ListItem button>
            <ListItemIcon><BarChart /></ListItemIcon>
            <ListItemText primary="Analytics" />
          </ListItem>
        </List>
        <Button variant="contained" color="primary" startIcon={<Add />} style={{ margin: 5 }} onClick={handleOpenCreateTask}>
          Create new task
        </Button>
      </div>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mt: 2 }}>
        <Button variant="outlined" startIcon={<SouthIcon sx={{ color: 'primary.main', fontSize: 20 }} />}>
          Download the app
        </Button>
      </Box>
    </DrawerStyled>
  );
};

export default Sidebar;
