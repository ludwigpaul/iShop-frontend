// ishop-frontend/src/pages/PaymentPage.js
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
    Container, Paper, Typography, List, ListItem, ListItemText, Divider
} from '@mui/material';
import PaymentForm from '../components/PaymentForm';

const TAX_RATE = 0.13;

const PaymentPage = () => {
    const { state } = useLocation();
    const navigate = useNavigate();

    // Parse items and calculate totals
    let items = [];
    if (Array.isArray(state?.items)) {
        items = state.items;
    } else if (typeof state?.items === 'string') {
        try {
            items = JSON.parse(state.items);
        } catch {
            items = [];
        }
    }
    const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const tax = subtotal * TAX_RATE;
    const total = subtotal + tax;

    // Pass order info to PaymentForm as needed
    return (
        <Container maxWidth="sm" sx={{ mt: 4 }}>
            <Paper sx={{ p: 4 }}>
                <Typography variant="h5" gutterBottom>Payment</Typography>
                <Typography variant="h6" gutterBottom>Order Items</Typography>
                <List>
                    {items.map((item, idx) => (
                        <ListItem key={idx} disableGutters>
                            <ListItemText
                                primary={`${item.name} x${item.quantity}`}
                                secondary={`$${(item.price * item.quantity).toFixed(2)}`}
                            />
                        </ListItem>
                    ))}
                </List>
                <Divider sx={{ my: 2 }} />
                <Typography>Subtotal: ${subtotal.toFixed(2)}</Typography>
                <Typography>Tax (13%): ${tax.toFixed(2)}</Typography>
                <Typography variant="h6">Total: ${total.toFixed(2)}</Typography>
                <Divider sx={{ my: 2 }} />
                <PaymentForm
                    amount={Math.round(total * 100)} // Stripe expects cents
                    items={items}
                    email={state?.email}
                    onSuccess={orderId => navigate('/thank-you', { state: { orderId } })}
                />
            </Paper>
        </Container>
    );
};

export default PaymentPage;