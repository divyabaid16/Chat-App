import React from 'react'
import { BrowserRouter } from 'react-router-dom';
import { createTheme, ThemeProvider, Container } from '@mui/material';
import Navbar from './components/Navbar';
import AppRoutes from './util/AppRoutes';
import { AuthProvider } from './util/AuthContext';

const theme = createTheme({
  typography: {
    fontFamily: 'math, emoji, sans-serif',
  },
  palette: {
    primary: {
      main: '#1f2937',
    },
    background: {
      custom: '#f3f4f6',
    },
  },
});

const App = () => {
  return (
    <AuthProvider>
      <ThemeProvider theme={theme}>
        <div style={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <Container maxWidth="lg" style={{
            backgroundColor: theme.palette.background.custom,
            minHeight: '100vh',
            padding: '0px'
          }}>
            < BrowserRouter >
              <Navbar />
              <AppRoutes />
            </BrowserRouter>
          </Container >
        </div>
      </ThemeProvider >
    </AuthProvider>
  )
};

export default App;