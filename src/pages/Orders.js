// src/pages/Orders.js
import React from 'react';
import { Container, Typography, Paper } from '@mui/material';

const Orders = () => {
    return (
        <Container maxWidth="lg" sx={{ mt: 4 }}>
            <Typography variant="h4" gutterBottom>
                My Orders
            </Typography>
            <Paper sx={{ p: 3 }}>
                <Typography>Order history will be displayed here</Typography>
            </Paper>
        </Container>
    );
};

export default Orders;