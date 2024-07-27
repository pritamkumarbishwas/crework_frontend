import React from 'react';
import { Outlet } from 'react-router-dom';
import { styled } from '@mui/system';
import Header from './Header';
import Sidebar from './Sidebar';
import Footer from './Footer';

const MainContainer = styled('div')({
  display: 'flex',
});

const Content = styled('main')(({ theme }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  marginTop: theme.spacing(8), 
}));

const MainLayout = () => (
  <MainContainer>
    <Header />
    <Sidebar />
    <Content>
      <Outlet />
      <Footer />
    </Content>
  </MainContainer>
);

export default MainLayout;
