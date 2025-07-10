// src/pages/Home.js
import React from 'react';
import { Container, Typography, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const navigate = useNavigate();

    return (
        <Container maxWidth="md">
            <Box sx={{ mt: 8, textAlign: 'center' }}>
                <Typography variant="h2" component="h1" gutterBottom>
                    Welcome to iShop
                </Typography>
                <Typography variant="h5" component="h2" gutterBottom color="textSecondary">
                    Your one-stop shop for everything you need
                </Typography>
                <Button
                    variant="contained"
                    color="primary"
                    size="large"
                    onClick={() => navigate('/products')}
                    sx={{ mt: 4 }}
                >
                    Start Shopping
                </Button>
            </Box>
        </Container>
    );
};

export default Home;