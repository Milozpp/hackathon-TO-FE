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
  overflow: 'hidden',
  position: 'relative'
});

const SlideContainer = styled(Box)({
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '90%',
  height: '85%',
  backgroundColor: 'rgba(255, 255, 255, 0.4)',
  backdropFilter: 'blur(5px)',
  zIndex: 1000,
  boxShadow: '0 0 20px rgba(0,0,0,0.3)',
  padding: '20px',
  borderRadius: '16px',
  transition: 'all 0.3s ease-in-out'
});

const Overlay = styled(Box)({
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.3)',
  backdropFilter: 'blur(5px)',
  zIndex: 999,
  transition: 'all 0.3s ease-in-out'
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
  const [showChat, setShowChat] = React.useState(false);

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setTimeout(() => setShowChat(true), 100);
  };

  const handleBackToCatalog = () => {
    setShowChat(false);
    setTimeout(() => setSelectedCategory(null), 600);
  };

  const handleLogout = () => {
    auth.logout();
  };



  return (
    <AppContainer>
      <CssBaseline />
      <Header sx={{
        opacity: selectedCategory ? 0.3 : 1,
        transition: 'opacity 0.3s ease-in-out'
      }}>
        {selectedCategory && (
          <BackButton
            aria-label="back to catalog"
            onClick={handleBackToCatalog}
          >
            <ArrowBackIcon />
          </BackButton>
        )}
        <Logo src="/output.png" alt="Logo" />
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

      <Box 
        onClick={selectedCategory ? handleBackToCatalog : undefined}
        sx={{
          filter: selectedCategory ? 'blur(3px)' : 'none',
          opacity: selectedCategory ? 0.6 : 1,
          pointerEvents: selectedCategory ? 'none' : 'auto',
          transition: 'all 0.3s ease-in-out'
        }}
      >
        <ServiceCatalog onCategorySelect={handleCategorySelect} isChatOpen={!!selectedCategory} />
      </Box>
      
      {selectedCategory && (
        <>
          <Overlay onClick={handleBackToCatalog} />
          <SlideContainer onClick={(e) => e.stopPropagation()}>
            <Header>
              <BackButton
                aria-label="back to catalog"
                onClick={handleBackToCatalog}
              >
                <ArrowBackIcon />
              </BackButton>
              <Logo src="/output.png" alt="Logo" />
            </Header>
            <Box sx={{
              opacity: showChat ? 1 : 0,
              transition: 'opacity 0.3s ease-out',
              height: 'calc(100% - 100px)',
              overflow: 'hidden'
            }}>
              <ChatInterface selectedCategory={selectedCategory} />
            </Box>
          </SlideContainer>
        </>
      )}
    </AppContainer>
  );
}

export default HomePage;