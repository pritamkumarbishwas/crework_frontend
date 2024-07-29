import React, { useState } from 'react';
import { Container, Box, Typography, TextField, Button, Link } from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext'; // Import useAuth
import { useSnackbar } from '../../context/SnackbarContext'; // Import useSnackbar

const Register = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});
    const { register } = useAuth();
    const { showSnackbar } = useSnackbar();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const navigate = useNavigate();

    const validateForm = () => {
        let valid = true;
        let errors = {};

        if (!username) {
            errors.username = 'Username is required';
            valid = false;
        }
        if (!email) {
            errors.email = 'Email is required';
            valid = false;
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            errors.email = 'Email is invalid';
            valid = false;
        }
        if (!password) {
            errors.password = 'Password is required';
            valid = false;
        } else if (password.length < 6) {
            errors.password = 'Password must be at least 6 characters';
            valid = false;
        }

        setErrors(errors);
        return valid;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        if (!validateForm()) {
            setIsSubmitting(false);
            return;
        }

        const result = await register(email, username, password);

        if (result.success) {
            showSnackbar('Registration successful!', 'success');
            setIsSubmitting(false);
            navigate('/dashboard');

        } else {
            setIsSubmitting(false);
            showSnackbar(result.message, 'error');
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
                    bgcolor: 'background.paper'
                }}
                component="form"
                onSubmit={handleSubmit}
            >
                <Typography component="h1" variant="h5" gutterBottom>
                    Welcome to <span style={{ color: '#7C4DFF' }}>Workflo</span>!
                </Typography>
                <TextField
                    margin="normal"
                    fullWidth
                    id="username"
                    label="Username"
                    name="username"
                    autoComplete="name"
                    autoFocus
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    error={Boolean(errors.username)}
                    helperText={errors.username}
                />
                <TextField
                    margin="normal"
                    fullWidth
                    id="email"
                    label="Your email"
                    name="email"
                    autoComplete="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    error={Boolean(errors.email)}
                    helperText={errors.email}
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
                    error={Boolean(errors.password)}
                    helperText={errors.password}
                />
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2, backgroundColor: '#7C4DFF' }}
                    disabled={isSubmitting}

                >
                    Sign up
                </Button>
                <Typography>
                    Already have an account?{' '}
                    <Link component={RouterLink} to="/" variant="body2" sx={{ mt: 2 }}>
                        Log in
                    </Link>
                </Typography>
            </Box>
        </Container>
    );
};

export default Register;
