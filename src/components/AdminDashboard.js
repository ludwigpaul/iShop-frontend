import React, { useEffect, useState, useCallback } from 'react';
import {
    Box, Card, CardContent, Typography, Table, TableBody, TableCell,
    TableContainer, TableHead, TableRow, Paper, Alert, CircularProgress, Grid, TextField, TablePagination, Button
} from '@mui/material';

const AdminDashboard = () => {
    const [users, setUsers] = useState([]);
    const [orders, setOrders] = useState([]);
    const [workers, setWorkers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);

    // Assignment state
    const [assignments, setAssignments] = useState({});
    const [assignError, setAssignError] = useState('');
    const [assignSuccess, setAssignSuccess] = useState('');

    // Pagination state for users
    const [userPage, setUserPage] = useState(0);
    const [userRowsPerPage, setUserRowsPerPage] = useState(5);

    // Pagination state for orders
    const [orderPage, setOrderPage] = useState(0);
    const [orderRowsPerPage, setOrderRowsPerPage] = useState(5);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setError('');
            const token = localStorage.getItem('token');
            const headers = { Authorization: `Bearer ${token}` };
            try {
                // Fetch users and orders first
                const [usersRes, ordersRes] = await Promise.all([
                    fetch('http://localhost:3000/api/v1/admin/users', { headers }),
                    fetch('http://localhost:3000/api/v1/admin/orders', { headers })
                ]);
                if (!usersRes.ok) throw new Error('Failed to fetch users');
                if (!ordersRes.ok) throw new Error('Failed to fetch orders');
                const usersData = await usersRes.json();
                const ordersData = await ordersRes.json();
                setUsers(usersData);
                setFilteredUsers(usersData);
                setOrders(ordersData);

                // Fetch workers separately, don't block users/orders if it fails
                try {
                    const workersRes = await fetch('http://localhost:3000/api/v1/admin/workers', { headers });
                    if (workersRes.ok) {
                        const workersData = await workersRes.json();
                        setWorkers(workersData);
                    } else {
                        setWorkers([]);
                    }
                } catch {
                    setWorkers([]);
                }
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const handleSearch = (e) => {
        const term = e.target.value.toLowerCase();
        setSearchTerm(term);
        setFilteredUsers(users.filter(user =>
            user.username.toLowerCase().includes(term) || user.email.toLowerCase().includes(term)
        ));
    };

    // Handle pagination for users
    const handleUserPageChange = (event, newPage) => {
        setUserPage(newPage);
    };

    const handleUserRowsPerPageChange = (event) => {
        setUserRowsPerPage(parseInt(event.target.value, 10));
        setUserPage(0);
    };

    // Handle pagination for orders
    const handleOrderPageChange = (event, newPage) => {
        setOrderPage(newPage);
    };

    const handleOrderRowsPerPageChange = (event) => {
        setOrderRowsPerPage(parseInt(event.target.value, 10));
        setOrderPage(0);
    };

    // Assignment handler
    const handleAssign = useCallback(async (orderId) => {
        setAssignError('');
        setAssignSuccess('');
        const workerId = assignments[orderId];
        if (!workerId) {
            setAssignError('Please select a worker');
            return;
        }
        const token = localStorage.getItem('token');
        try {
            const res = await fetch('http://localhost:3000/api/v1/admin/assign-order', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ orderId, workerId }),
            });
            if (!res.ok) throw new Error('Failed to assign order');
            setAssignSuccess('Order assigned successfully!');
            // Optionally refresh orders here
        } catch (err) {
            setAssignError(err.message);
        }
    }, [assignments]);

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 8 }}>
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Box sx={{ p: 4 }}>
            <Typography variant="h4" align="center" gutterBottom>
                Admin Dashboard
            </Typography>
            {error && (
                <Alert severity="error" sx={{ mb: 2 }}>
                    {error}
                </Alert>
            )}
            {assignError && <Alert severity="error" sx={{ mb: 2 }}>{assignError}</Alert>}
            {assignSuccess && <Alert severity="success" sx={{ mb: 2 }}>{assignSuccess}</Alert>}
            <Grid container spacing={4}>
                <Grid item xs={12} md={6}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6" gutterBottom>
                                Users
                            </Typography>
                            <TextField
                                label="Search Users"
                                variant="outlined"
                                fullWidth
                                margin="normal"
                                value={searchTerm}
                                onChange={handleSearch}
                            />
                            <TableContainer component={Paper}>
                                <Table size="small">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>ID</TableCell>
                                            <TableCell>Username</TableCell>
                                            <TableCell>Email</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {filteredUsers
                                            .slice(userPage * userRowsPerPage, userPage * userRowsPerPage + userRowsPerPage)
                                            .map(u => (
                                                <TableRow key={u.id}>
                                                    <TableCell>{u.id}</TableCell>
                                                    <TableCell>{u.username}</TableCell>
                                                    <TableCell>{u.email}</TableCell>
                                                </TableRow>
                                            ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                            <TablePagination
                                rowsPerPageOptions={[5, 10, 25]}
                                component="div"
                                count={filteredUsers.length}
                                rowsPerPage={userRowsPerPage}
                                page={userPage}
                                onPageChange={handleUserPageChange}
                                onRowsPerPageChange={handleUserRowsPerPageChange}
                            />
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6" gutterBottom>
                                Orders
                            </Typography>
                            <TableContainer component={Paper}>
                                <Table size="small">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Order ID</TableCell>
                                            <TableCell>User ID</TableCell>
                                            <TableCell>Assign to Worker</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {orders
                                            .slice(orderPage * orderRowsPerPage, orderPage * orderRowsPerPage + orderRowsPerPage)
                                            .map(o => (
                                                <TableRow key={o.id}>
                                                    <TableCell>{o.id}</TableCell>
                                                    <TableCell>{o.user_id}</TableCell>
                                                    <TableCell>
                                                        <select
                                                            value={assignments[o.id] || ''}
                                                            onChange={e => setAssignments(a => ({ ...a, [o.id]: e.target.value }))}
                                                        >
                                                            <option value="">Select Worker</option>
                                                            {workers.map(w => (
                                                                <option key={w.id} value={w.id}>{w.username}</option>
                                                            ))}
                                                        </select>
                                                        <Button
                                                            variant="contained"
                                                            size="small"
                                                            sx={{ ml: 1 }}
                                                            onClick={() => handleAssign(o.id)}
                                                            disabled={workers.length === 0}
                                                        >
                                                            Assign
                                                        </Button>
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                            <TablePagination
                                rowsPerPageOptions={[5, 10, 25]}
                                component="div"
                                count={orders.length}
                                rowsPerPage={orderRowsPerPage}
                                page={orderPage}
                                onPageChange={handleOrderPageChange}
                                onRowsPerPageChange={handleOrderRowsPerPageChange}
                            />
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Box>
    );
};

export default AdminDashboard;