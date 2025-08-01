// src/pages/Cart.js
import React from 'react';
import {
    Container,
    Paper,
    Typography,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Button,
    IconButton,
    Box
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, updateQuantity } from '../store/slices/cartSlice';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
    const { items, total } = useSelector((state) => state.cart);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleRemoveItem = (item) => {
        dispatch(removeFromCart(item));
    };

    const handleUpdateQuantity = (item, newQuantity) => {
        if (newQuantity > 0) {
            dispatch(updateQuantity({ id: item.id, quantity: newQuantity }));
        }
    };

    const handleCheckout = () => {
        navigate('/payment', {
            state: {
                userId: '', // Replace with actual userId from auth state
                items: items,
                email: ''   // Replace with actual email from auth state
            }
        });
    };

    return (
        <Container maxWidth="lg" sx={{ mt: 4 }}>
            <Typography variant="h4" gutterBottom>
                Shopping Cart
            </Typography>
            {items.length === 0 ? (
                <Paper sx={{ p: 3, textAlign: 'center' }}>
                    <Typography>Your cart is empty</Typography>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => navigate('/products')}
                        sx={{ mt: 2 }}
                    >
                        Continue Shopping
                    </Button>
                </Paper>
            ) : (
                <>
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Product</TableCell>
                                    <TableCell align="right">Price</TableCell>
                                    <TableCell align="center">Quantity</TableCell>
                                    <TableCell align="right">Subtotal</TableCell>
                                    <TableCell align="center">Actions</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {items.map((item) => (
                                    <TableRow key={item.id}>
                                        <TableCell>{item.name}</TableCell>
                                        <TableCell align="right">${item.price}</TableCell>
                                        <TableCell align="center">
                                            <IconButton
                                                size="small"
                                                onClick={() => handleUpdateQuantity(item, item.quantity - 1)}
                                            >
                                                <RemoveIcon />
                                            </IconButton>
                                            {item.quantity}
                                            <IconButton
                                                size="small"
                                                onClick={() => handleUpdateQuantity(item, item.quantity + 1)}
                                            >
                                                <AddIcon />
                                            </IconButton>
                                        </TableCell>
                                        <TableCell align="right">
                                            ${(item.price * item.quantity).toFixed(2)}
                                        </TableCell>
                                        <TableCell align="center">
                                            <IconButton
                                                color="error"
                                                onClick={() => handleRemoveItem(item)}
                                            >
                                                <DeleteIcon />
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
                        <Paper sx={{ p: 3, minWidth: 300 }}>
                            <Typography variant="h6" gutterBottom>
                                Order Summary
                            </Typography>
                            <Typography variant="h4">
                                Total: ${total.toFixed(2)}
                            </Typography>
                            <Button
                                variant="contained"
                                color="primary"
                                fullWidth
                                sx={{ mt: 2 }}
                                onClick={handleCheckout}
                            >
                                Proceed to Checkout
                            </Button>
                        </Paper>
                    </Box>
                </>
            )}
        </Container>
    );
};

export default Cart;