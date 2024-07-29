import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Login from './components/Authentication/Login';
import Register from './components/Authentication/Register';
import MainLayout from './components/MainLayout';
import Dashboard from './components/Dashboard';
import { AuthProvider } from './context/AuthContext';
import { SnackbarProvider } from './context/SnackbarContext'; 

const theme = createTheme({
  palette: {
    primary: {
      main: '#7C4DFF',
    },
    background: {
      default: '#F9F9F9',
    },
  },
});

function App() {
  const [openCreateTask, setOpenCreateTask] = useState(false);

  const handleOpenCreateTask = () => {
    setOpenCreateTask(true);
  };

  const handleCloseCreateTask = () => {
    setOpenCreateTask(false);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <SnackbarProvider>
        <AuthProvider>
          <Router>
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/" element={<MainLayout handleOpenCreateTask={handleOpenCreateTask} />}>
                <Route path="dashboard" element={<Dashboard openCreateTask={openCreateTask} handleCloseCreateTask={handleCloseCreateTask} />} />
              </Route>
            </Routes>
          </Router>
        </AuthProvider>
      </SnackbarProvider>
    </ThemeProvider>
  );
}

export default App;
