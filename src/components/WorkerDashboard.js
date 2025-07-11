import React, { useEffect, useState } from 'react';
import {
    Button, Box, Typography, Table, TableBody, TableCell, TableContainer,
    TableHead, TableRow, Paper, Chip, CircularProgress, Alert
} from '@mui/material';

const statusColor = (completed) => completed ? 'success' : 'warning';

const WorkerDashboard = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [completingOrderId, setCompletingOrderId] = useState(null); // NEW

    const fetchOrders = async () => {
        setLoading(true);
        setError('');
        try {
            const token = localStorage.getItem('token');
            const userId = localStorage.getItem('userId');
            const res = await fetch(`http://localhost:3000/api/v1/worker/${userId}/orders`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            if (!res.ok) throw new Error('Failed to fetch orders');
            setOrders(await res.json());
        } catch (err) {
            setError(err.message || 'Error loading orders');
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchOrders();
        // eslint-disable-next-line
    }, []);

    const handleComplete = async (orderId) => {
        setError('');
        setCompletingOrderId(orderId); // NEW
        try {
            const token = localStorage.getItem('token');
            const res = await fetch(`http://localhost:3000/api/v1/orders/complete/${orderId}`, {
                method: 'POST',
                headers: { Authorization: `Bearer ${token}` }
            });
            if (!res.ok) throw new Error('Failed to complete order');
            await fetchOrders();
        } catch (err) {
            setError(err.message || 'Error completing order');
        }
        setCompletingOrderId(null); // NEW
    };

    if (loading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Box sx={{ maxWidth: 900, mx: 'auto', mt: 6, p: 3 }}>
            <Typography variant="h4" gutterBottom align="center">
                My Assigned Orders
            </Typography>
            {error && (
                <Alert severity="error" sx={{ mb: 2 }}>
                    {error}
                </Alert>
            )}
            <TableContainer component={Paper} elevation={3}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Order ID</TableCell>
                            <TableCell>Product Name</TableCell>
                            <TableCell>Product ID</TableCell>
                            <TableCell>Quantity</TableCell>
                            <TableCell>Status</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {orders.map(order => (
                            <TableRow key={order.id}>
                                <TableCell>{order.id}</TableCell>
                                <TableCell>{order.product_name}</TableCell>
                                <TableCell>{order.product_id}</TableCell>
                                <TableCell>{order.quantity}</TableCell>
                                <TableCell>
                                    <Chip
                                        label={order.completed_at ? 'Completed' : 'Pending'}
                                        color={statusColor(order.completed_at)}
                                        variant="outlined"
                                    />
                                    {!order.completed_at && (
                                        <Button
                                            variant="contained"
                                            color="success"
                                            size="small"
                                            sx={{ ml: 2 }}
                                            onClick={() => handleComplete(order.id)}
                                            disabled={completingOrderId === order.id}
                                        >
                                            {completingOrderId === order.id
                                                ? (
                                                    <>
                                                        <CircularProgress size={18} sx={{ mr: 1 }} />
                                                        Please wait
                                                    </>
                                                )
                                                : 'Complete'
                                            }
                                        </Button>
                                    )}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
};

export default WorkerDashboard;