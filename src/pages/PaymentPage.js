import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import {
    Container, Paper, Typography, List, ListItem, ListItemText,
    Checkbox, FormControlLabel, TextField, Button, Divider
} from '@mui/material';
import axios from 'axios';

const storedUserId = localStorage.getItem('userId');
const TAX_RATE = 0.13; //

const PaymentPage = () => {
    const { state } = useLocation();
    const [card, setCard] = useState('');
    const [sendReceipt, setSendReceipt] = useState(true);
    const [message, setMessage] = useState('');

    // Parse items (if stringified) and calculate totals
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

    const navigate = useNavigate();

    const orderItems = items.map(item => ({
        productId: item.id,
        quantity: item.quantity
    }));

    const handlePayment = async (e) => {
        e.preventDefault();
        const userId = Number(localStorage.getItem('userId'));
        if (!userId || isNaN(userId)) {
            setMessage('User ID is missing or invalid. Please log in.');
            return;
        }
        try {
            const res = await axios.post('http://localhost:3000/api/v1/orders/checkout', {
                userId,
                items: orderItems,
                email: sendReceipt ? state.email : '',
                paymentInfo: card
            });

            localStorage.removeItem('cart');

            navigate('/thank-you', { state: { orderId: res.data.orderId } });
        } catch (err) {
            setMessage('Order failed: ' + (err.response?.data?.error || err.message));
        }
    };

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
                <Typography>Tax (10%): ${tax.toFixed(2)}</Typography>
                <Typography variant="h6">Total: ${total.toFixed(2)}</Typography>
                <form onSubmit={handlePayment} style={{ marginTop: 24 }}>
                    <TextField
                        label="Card Number"
                        value={card}
                        onChange={e => setCard(e.target.value)}
                        required
                        fullWidth
                        sx={{ mb: 2 }}
                    />
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={sendReceipt}
                                onChange={e => setSendReceipt(e.target.checked)}
                            />
                        }
                        label="Send receipt to my email"
                    />
                    <Button type="submit" variant="contained" color="primary" fullWidth>
                        Pay
                    </Button>
                </form>
                {message && <Typography sx={{ mt: 2 }}>{message}</Typography>}
            </Paper>
        </Container>
    );
};

export default PaymentPage;