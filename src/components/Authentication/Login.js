import React, { useState } from 'react';
import { Container, Box, Typography, TextField, Button, Link } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useSnackbar } from '../../context/SnackbarContext';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const Login = () => {
    const navigate=useNavigate();
    const { login } = useAuth();
    const { showSnackbar } = useSnackbar();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Reset error states
        setEmailError(false);
        setPasswordError(false);

        try {
            // Simple validation
            if (!email) {
                setEmailError(true);
                showSnackbar('Please enter your email.', 'warning');
                setIsSubmitting(false);
                return;
            }
            if (!password) {
                setPasswordError(true);
                showSnackbar('Please enter your password.', 'warning');
                setIsSubmitting(false);
                return;
            }

            const result = await login(email, password);
            console.log("result",result)
            if (result.success) {
                showSnackbar('Login successful!', 'success');
                // Redirect or perform other actions
                navigate('/dashboard'); // Redirect to the dashboard

            } else {
                showSnackbar(result.message, 'error');
            }

            setIsSubmitting(false);
        } catch (err) {
            showSnackbar('Failed to log in. Please check your credentials.', 'error');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Container maxWidth="sm">
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    mt: 8,
                    p: 3,
                    boxShadow: 3,
                    borderRadius: 2,
                    bgcolor: '#FFFFFF',
                }}
            >
                <Typography component="h1" variant="h4" gutterBottom>
                    Welcome to <span style={{ color: '#7C4DFF' }}>Workflo</span>!
                </Typography>
                <form onSubmit={handleSubmit}>
                    <TextField
                        margin="normal"
                        fullWidth
                        id="email"
                        label="Your email"
                        name="email"
                        autoComplete="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        error={emailError}
                        helperText={emailError ? 'Email is required' : ''}
                    />
                    <TextField
                        margin="normal"
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        error={passwordError}
                        helperText={passwordError ? 'Password is required' : ''}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2, backgroundColor: '#7C4DFF' }}
                        disabled={isSubmitting}
                    >
                        Log in
                    </Button>
                </form>
                <Typography>
                    Don’t have an account? Create a{' '}
                    <Link component={RouterLink} to="/register" variant="body2">
                        new account
                    </Link>
                </Typography>
            </Box>
        </Container>
    );
};

export default Login;
