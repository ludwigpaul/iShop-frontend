// ishop-frontend/src/pages/ThankYouPage.js
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Container, Paper, Typography, List, ListItem, ListItemText, Button } from '@mui/material';

const ThankYouPage = () => {
    const { state } = useLocation();
    const navigate = useNavigate();

    const handleContinueShopping = () => {
        navigate('/products');
    };

    return (
        <Container maxWidth="sm" sx={{ mt: 4 }}>
            <Paper sx={{ p: 4, textAlign: 'center' }}>
                <Typography variant="h4" gutterBottom>
                    Thank You for Your Order!
                </Typography>
                <Typography variant="body1" gutterBottom>
                    Your order has been successfully placed.
                </Typography>
                {state?.orderId && (
                    <Typography variant="body2" gutterBottom>
                        <strong>Order ID:</strong> {state.orderId}
                    </Typography>
                )}
                {state?.items && (
                    <>
                        <Typography variant="h6" sx={{ mt: 3 }}>
                            Order Summary
                        </Typography>
                        <List>
                            {state.items.map((item, idx) => (
                                <ListItem key={idx} disableGutters>
                                    <ListItemText
                                        primary={`${item.name} x${item.quantity}`}
                                        secondary={`$${(item.price * item.quantity).toFixed(2)}`}
                                    />
                                </ListItem>
                            ))}
                        </List>
                    </>
                )}
                <Button
                    variant="contained"
                    color="primary"
                    sx={{ mt: 3 }}
                    onClick={handleContinueShopping}
                >
                    Continue Shopping
                </Button>
            </Paper>
        </Container>
    );
};

export default ThankYouPage;