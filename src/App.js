import './App.css';
import HomePage from './Components/HomePage';
import LoginPage from './Components/LoginPage';
import { useAuth } from './contexts/AuthContext';
import { Box, CircularProgress } from '@mui/material';

function App() {
  const { loading, isAuthenticated } = useAuth();

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <CircularProgress sx={{ color: '#2d5a4a' }} />
      </Box>
    );
  }

  if (isAuthenticated) {
    return <HomePage />;
  }

  return <LoginPage />;
}

export default App;
