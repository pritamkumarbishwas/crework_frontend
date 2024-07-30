import React from 'react';
import { Container, IconButton, Drawer, Typography, Box, Button } from '@mui/material';
import { useOutletContext } from 'react-router-dom';
import CloseIcon from '@mui/icons-material/Close';
import ShareIcon from '@mui/icons-material/Share';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CreateTask from './Task/CreateTask';
import FeatureCard from './Common/FeatureCard';
import Toolbar from './Common/Toolbar';
import Board from './Board';

const Dashboard = () => {
  const [createTaskStatus, setCreateTaskStatus] = React.useState(null);

  const { openCreateTask, handleOpenCreateTask, handleCloseCreateTask } = useOutletContext();

  const handleOpenCreateTaskWithStatus = (status) => {
    setCreateTaskStatus(status); // Store the status
    handleOpenCreateTask(); // Open the create task modal
};

  return (
    <>
      <FeatureCard />
      <Toolbar onOpenCreateTask={handleOpenCreateTask} />
      <Board onOpenCreateTask={handleOpenCreateTaskWithStatus} />
      <Container>
        <Drawer
          anchor="right"
          open={openCreateTask}
          onClose={handleCloseCreateTask}
        >
          <Box sx={{ width: 400, padding: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 8px', borderBottom: '1px solid #ddd' }}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <IconButton
                  aria-label="close"
                  onClick={handleCloseCreateTask}
                  sx={{ color: (theme) => theme.palette.grey[500] }}
                >
                  <CloseIcon />
                </IconButton>
              </Box>
              <Box sx={{ display: 'flex', gap: 1 }}>
                <Button
                  variant="outlined"
                  startIcon={<ShareIcon />}
                >
                  Share
                </Button>
                <Button
                  variant="outlined"
                  startIcon={<FavoriteIcon />}
                >
                  Favorite
                </Button>
              </Box>
            </Box>
            <CreateTask onClose={handleCloseCreateTask} status={createTaskStatus}/>
          </Box>
        </Drawer>
      </Container>
    </>
  );
};

export default Dashboard;
