import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Login from './components/Authentication/Login';
import Register from './components/Authentication/Register';
import MainLayout from './components/MainLayout';
import Dashboard from './components/Dashboard';

// Define your theme using createTheme
const theme = createTheme({
  palette: {
    primary: {
      main: '#7C4DFF',
    },
    background: {
      default: '#e0e7ff',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/app" element={<MainLayout />}>
            <Route path="dashboard" element={<Dashboard />} />
          </Route>
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
