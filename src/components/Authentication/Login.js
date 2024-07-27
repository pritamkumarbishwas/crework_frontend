import React from 'react';
import { Container, Box, Typography, TextField, Button, Link } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

const Login = () => {
    return (
        <Container maxWidth="sm" >
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
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Your email"
                    name="email"
                    autoComplete="email"
                />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                />
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2, backgroundColor: '#7C4DFF' }}
                >
                    Log in
                </Button>

                <Typography>
                    Don’t have an account? Create a{' '}
                    <Link component={RouterLink} to="/register" variant="body2" sx={{ mt: 2 }}>
                        new account
                    </Link>
                </Typography>
            </Box>
        </Container>
    );
};

export default Login;
