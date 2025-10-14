import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Paper, Alert } from '@mui/material';
import { styled } from '@mui/system';
import { useAuth } from '../contexts/AuthContext';

const Container = styled(Box)({
    minHeight: '100vh',
    backgroundColor: '#ffffff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px'
});

const LoginCard = styled(Paper)({
    padding: '40px',
    borderRadius: '24px',
    boxShadow: '0 20px 60px rgba(0,0,0,0.15), 0 8px 24px rgba(0,0,0,0.1)',
    maxWidth: '400px',
    width: '100%',
    textAlign: 'center'
});

const Logo = styled('img')({
    height: '80px',
    width: 'auto',
    marginBottom: '32px'
});

const StyledTextField = styled(TextField)({
    marginBottom: '16px',
    '& .MuiOutlinedInput-root': {
        borderRadius: '12px',
        '& fieldset': {
            borderColor: '#d1d5db'
        },
        '&:hover fieldset': {
            borderColor: '#2d5a4a'
        },
        '&.Mui-focused fieldset': {
            borderColor: '#2d5a4a'
        }
    }
});

const LoginButton = styled(Button)({
    backgroundColor: '#2d5a4a',
    color: 'white',
    borderRadius: '12px',
    padding: '12px 24px',
    fontSize: '16px',
    fontWeight: 600,
    marginTop: '16px',
    '&:hover': {
        backgroundColor: '#1e3d33'
    }
});

const LoginPage = () => {
    const { login } = useAuth();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        if (!username || !password) {
            setError('Please enter both username and password');
            return;
        }

        setLoading(true);
        setError('');

        try {
            await login(username, password);
        } catch (err) {
            setError(err.message || 'Login failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container>
            <LoginCard>
                <Logo src="/logo.jpeg" alt="Logo" />
                <Typography variant="h4" sx={{ 
                    fontWeight: 700, 
                    color: '#1f2937', 
                    marginBottom: '8px' 
                }}>
                    Welcome Back
                </Typography>
                <Typography variant="body1" sx={{ 
                    color: '#6b7280', 
                    marginBottom: '32px' 
                }}>
                    Sign in to your account
                </Typography>
                
                {error && (
                    <Alert severity="error" sx={{ marginBottom: '16px' }}>
                        {error}
                    </Alert>
                )}
                
                <form onSubmit={handleLogin}>
                    <StyledTextField
                        fullWidth
                        label="Username"
                        variant="outlined"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        disabled={loading}
                    />
                    
                    <StyledTextField
                        fullWidth
                        label="Password"
                        type="password"
                        variant="outlined"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        disabled={loading}
                    />
                    
                    <LoginButton
                        fullWidth
                        type="submit"
                        disabled={loading}
                    >
                        {loading ? 'Signing In...' : 'Sign In'}
                    </LoginButton>
                </form>
            </LoginCard>
        </Container>
    );
};

export default LoginPage;