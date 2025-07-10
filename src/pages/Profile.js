// src/pages/Profile.js
import React, { useState, useEffect } from 'react';
import {
    Container,
    Paper,
    Typography,
    TextField,
    Button,
    Snackbar,
    Alert
} from '@mui/material';
import { getUserProfile, updateUserProfile } from '../services/api';

const Profile = () => {
    const [userData, setUserData] = useState({
        username: '',
        email: '',
        currentPassword: '',
        newPassword: '',
        confirmNewPassword: ''
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const userId = localStorage.getItem('userId'); // Make sure you store userId during login

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const data = await getUserProfile(userId);
                setUserData(prevState => ({
                    ...prevState,
                    username: data.username,
                    email: data.email
                }));
            } catch (error) {
                setError('Failed to load user profile');
            }
        };

        if (userId) {
            fetchUserData();
        }
    }, [userId]);

    const handleChange = (e) => {
        setUserData({
            ...userData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        // Validate passwords if user is trying to change password
        if (userData.newPassword) {
            if (userData.newPassword !== userData.confirmNewPassword) {
                setError('New passwords do not match');
                return;
            }
            if (!userData.currentPassword) {
                setError('Current password is required to set a new password');
                return;
            }
        }

        try {
            const updateData = {
                username: userData.username,
                email: userData.email,
                ...(userData.newPassword && {
                    currentPassword: userData.currentPassword,
                    newPassword: userData.newPassword
                })
            };

            await updateUserProfile(userId, updateData);
            setSuccess(true);

            // Clear password fields
            setUserData(prev => ({
                ...prev,
                currentPassword: '',
                newPassword: '',
                confirmNewPassword: ''
            }));
        } catch (error) {
            setError(error.response?.data?.message || 'Failed to update profile');
        }
    };

    const handleCloseSnackbar = () => {
        setSuccess(false);
    };

    return (
        <Container maxWidth="sm">
            <Paper elevation={3} sx={{ p: 4, mt: 8 }}>
                <Typography variant="h4" align="center" gutterBottom>
                    Profile Settings
                </Typography>
                {error && (
                    <Alert severity="error" sx={{ mb: 2 }}>
                        {error}
                    </Alert>
                )}
                <form onSubmit={handleSubmit}>
                    <TextField
                        fullWidth
                        label="Username"
                        name="username"
                        value={userData.username}
                        onChange={handleChange}
                        margin="normal"
                        required
                    />
                    <TextField
                        fullWidth
                        label="Email"
                        name="email"
                        type="email"
                        value={userData.email}
                        onChange={handleChange}
                        margin="normal"
                        required
                    />
                    <Typography variant="h6" sx={{ mt: 3, mb: 1 }}>
                        Change Password (Optional)
                    </Typography>
                    <TextField
                        fullWidth
                        label="Current Password"
                        name="currentPassword"
                        type="password"
                        value={userData.currentPassword}
                        onChange={handleChange}
                        margin="normal"
                    />
                    <TextField
                        fullWidth
                        label="New Password"
                        name="newPassword"
                        type="password"
                        value={userData.newPassword}
                        onChange={handleChange}
                        margin="normal"
                    />
                    <TextField
                        fullWidth
                        label="Confirm New Password"
                        name="confirmNewPassword"
                        type="password"
                        value={userData.confirmNewPassword}
                        onChange={handleChange}
                        margin="normal"
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        sx={{ mt: 3 }}
                    >
                        Update Profile
                    </Button>
                </form>
            </Paper>

            <Snackbar
                open={success}
                autoHideDuration={6000}
                onClose={handleCloseSnackbar}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
                <Alert onClose={handleCloseSnackbar} severity="success">
                    Profile updated successfully!
                </Alert>
            </Snackbar>
        </Container>
    );
};

export default Profile;