import React from 'react';
import {
    AppBar,
    Toolbar,
    Typography,
    Button,
    Badge,
    IconButton,
    Box
} from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useNavigate, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Navbar = () => {
    const navigate = useNavigate();
    const cartItems = useSelector((state) => state.cart.items);
    const isLoggedIn = localStorage.getItem('token');

    const handleProfileClick = () => {
        navigate('/profile');
    };

    return (
        <AppBar position="static">
            <Toolbar>
                <Typography
                    variant="h6"
                    sx={{ flexGrow: 1 }}
                    onClick={() => navigate('/')}
                    style={{ cursor: 'pointer' }}
                >
                    iShop
                </Typography>
                <Button color="inherit" onClick={() => navigate('/products')}>
                    Products
                </Button>
                <IconButton color="inherit" onClick={() => navigate('/cart')}>
                    <Badge badgeContent={cartItems.length} color="error">
                        <ShoppingCartIcon />
                    </Badge>
                </IconButton>

                {isLoggedIn ? (
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <IconButton
                            color="inherit"
                            onClick={handleProfileClick}
                            sx={{ mr: 1 }}
                        >
                            <AccountCircleIcon />
                        </IconButton>
                        <Button
                            color="inherit"
                            onClick={() => {
                                localStorage.removeItem('token');
                                localStorage.removeItem('userId');
                                navigate('/products');
                            }}
                        >
                            Logout
                        </Button>
                    </Box>
                ) : (
                    <>
                        <Button color="inherit" onClick={() => navigate('/auth/login')}>
                            Login
                        </Button>
                        <Button color="inherit" onClick={() => navigate('/admin/login')}>
                            Admin Login
                        </Button>
                        <Button color="inherit" component={Link} to="auth/login/worker">
                            Worker Login
                        </Button>
                    </>
                )}
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;