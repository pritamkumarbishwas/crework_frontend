import React from 'react';
import { Container, Box, Grid, Paper, Typography, IconButton, Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { useOutletContext } from 'react-router-dom';
import CreateTask from './Task/CreateTask';
import CloseIcon from '@mui/icons-material/Close';
import FeatureCard from './Common/FeatureCard';
import Toolbar from './Common/Toolbar';
import Board from './Board';

const Dashboard = () => {
  const { openCreateTask, handleOpenCreateTask, handleCloseCreateTask } = useOutletContext();

  const handleDialogClose = (event, reason) => {
    if (reason !== 'backdropClick') {
      handleCloseCreateTask();
    }
  };

  return (<>
    <FeatureCard />
    <Toolbar />
    <Board />
  </>
  );
};

export default Dashboard;
