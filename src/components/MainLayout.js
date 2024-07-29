import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { styled } from '@mui/system';
import Sidebar from './Common/Sidebar';

const MainContainer = styled('div')({
  display: 'flex',
});

const Content = styled('main')(({ theme }) => ({
  flexGrow: 1,
  padding: theme.spacing(1),
  marginTop: theme.spacing(2),
}));

const MainLayout = () => {
  const [openCreateTask, setOpenCreateTask] = useState(false);

  const handleOpenCreateTask = () => {
    setOpenCreateTask(true);
  };

  const handleCloseCreateTask = () => {
    setOpenCreateTask(false);
  };

  return (
    <MainContainer>
      <Sidebar handleOpenCreateTask={handleOpenCreateTask} />
      <Content>
        <Outlet context={{ openCreateTask, handleOpenCreateTask, handleCloseCreateTask }} />
      </Content>
    </MainContainer>
  );
};

export default MainLayout;
