import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import IconButton from '@mui/material/IconButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import LogoutIcon from '@mui/icons-material/Logout';
import ChatInterface from './ChatInterface';
import ServiceCatalog from './ServiceCatalog';
import { useAuth } from '../contexts/AuthContext';



const AppContainer = styled(Box)({
  minHeight: '100vh',
  backgroundColor: '#ffffff',
  padding: '20px',
  borderRadius: '24px',
  boxShadow: '0 20px 60px rgba(0,0,0,0.15), 0 8px 24px rgba(0,0,0,0.1)',
  overflow: 'hidden'
});

const Header = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  position: 'relative',
  marginBottom: '20px',
  padding: '16px 0'
});

const Logo = styled('img')({
  height: '60px',
  width: 'auto'
});

const BackButton = styled(IconButton)({
  position: 'absolute',
  left: 0,
  backgroundColor: '#e9ecef',
  boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
  '&:hover': {
    backgroundColor: '#dee2e6'
  }
});
const HomePage = () => {
  const auth = useAuth();
  const [selectedCategory, setSelectedCategory] = React.useState(null);

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };

  const handleBackToCatalog = () => {
    setSelectedCategory(null);
  };

  const handleLogout = () => {
    auth.logout();
  };



  return (
    <AppContainer>
      <CssBaseline />
      <Header>
        {selectedCategory && (
          <BackButton
            aria-label="back to catalog"
            onClick={handleBackToCatalog}
          >
            <ArrowBackIcon />
          </BackButton>
        )}
        <Logo src="/logo.jpeg" alt="Logo" />
        <IconButton
          onClick={handleLogout}
          sx={{
            position: 'absolute',
            right: 0,
            backgroundColor: '#e9ecef',
            '&:hover': { backgroundColor: '#dee2e6' }
          }}
        >
          <LogoutIcon />
        </IconButton>
      </Header>

      {!selectedCategory ? (
        <ServiceCatalog onCategorySelect={handleCategorySelect} />
      ) : (
        <ChatInterface selectedCategory={selectedCategory} />
      )}
    </AppContainer>
  );
}

export default HomePage;