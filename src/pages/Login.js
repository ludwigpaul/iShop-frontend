// src/pages/Login.js
import React, { useState } from 'react';
import {
    Container,
    Paper,
    Typography,
    TextField,
    Button,
    Box,
    Link,
    Tab,
    Tabs
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { login } from '../services/api';

const Login = () => {
    const [loginMethod, setLoginMethod] = useState('username');
    const [credentials, setCredentials] = useState({
        username: '',
        email: '',
        password: ''
    });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleTabChange = (event, newValue) => {
        setLoginMethod(newValue);
        setError('');
        setCredentials({
            username: '',
            email: '',
            password: ''
        });
    };

    const handleChange = (e) => {
        setCredentials({
            ...credentials,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const loginData = {
                password: credentials.password
            };

            if (loginMethod === 'username') {
                loginData.username = credentials.username;
            } else {
                loginData.email = credentials.email;
            }

            const response = await login(loginData);

            if (response.message === "Login successful") {
                if (response.accessToken) {
                    localStorage.setItem('token', response.accessToken);
                }
                if (response.userId) {
                    localStorage.setItem('userId', response.userId);
                }
                // Redirect based on user role
                if (response.role === 'ADMIN') {
                    navigate('/admin');
                } else {
                    navigate('/products');
                }
            }
        } catch (error) {
            setError(error.response?.data?.message || 'Invalid credentials. Please try again.');
        }
    };


    return (
        <Container maxWidth="sm">
            <Paper elevation={3} sx={{ p: 4, mt: 8 }}>
                <Typography variant="h4" align="center" gutterBottom>
                    Login
                </Typography>

                <Tabs
                    value={loginMethod}
                    onChange={handleTabChange}
                    centered
                    sx={{ mb: 3 }}
                >
                    <Tab label="Username" value="username" />
                    <Tab label="Email" value="email" />
                </Tabs>

                {error && (
                    <Typography color="error" align="center" gutterBottom>
                        {error}
                    </Typography>
                )}

                <form onSubmit={handleSubmit}>
                    {loginMethod === 'username' ? (
                        <TextField
                            fullWidth
                            label="Username"
                            name="username"
                            value={credentials.username}
                            onChange={handleChange}
                            margin="normal"
                            required
                        />
                    ) : (
                        <TextField
                            fullWidth
                            label="Email"
                            name="email"
                            type="email"
                            value={credentials.email}
                            onChange={handleChange}
                            margin="normal"
                            required
                        />
                    )}
                    <TextField
                        fullWidth
                        label="Password"
                        name="password"
                        type="password"
                        value={credentials.password}
                        onChange={handleChange}
                        margin="normal"
                        required
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        sx={{ mt: 3 }}
                    >
                        Login
                    </Button>
                </form>
                <Box sx={{ mt: 2, textAlign: 'center' }}>
                    <Link href="/register" variant="body2">
                        Don't have an account? Register here
                    </Link>
                </Box>
            </Paper>
        </Container>
    );
};

export default Login;