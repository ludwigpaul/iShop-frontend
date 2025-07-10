import React, { useEffect, useState } from 'react';
import { Box, Card, CardContent, Typography, Button } from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { useNavigate } from 'react-router-dom';

const VerifyEmail = () => {
    const [message, setMessage] = useState('Verifying...');
    const [success, setSuccess] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const token = params.get('token');
        if (token) {
            fetch(`http://localhost:3000/api/v1/users/verify-email?token=${token}`)
                .then(res => {
                    if (res.ok) {
                        setSuccess(true);
                        return res.text();
                    } else {
                        setSuccess(false);
                        return res.text();
                    }
                })
                .then(msg => setMessage(msg))
                .catch(() => {
                    setSuccess(false);
                    setMessage('Verification failed.');
                });
        } else {
            setSuccess(false);
            setMessage('Invalid verification link.');
        }
    }, []);

    return (
        <Box
            sx={{
                minHeight: '80vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#f5f5f5'
            }}
        >
            <Card sx={{ minWidth: 350, p: 2 }}>
                <CardContent sx={{ textAlign: 'center' }}>
                    {success === true && (
                        <CheckCircleOutlineIcon color="success" sx={{ fontSize: 60, mb: 1 }} />
                    )}
                    {success === false && (
                        <ErrorOutlineIcon color="error" sx={{ fontSize: 60, mb: 1 }} />
                    )}
                    <Typography variant="h5" gutterBottom>
                        {message}
                    </Typography>
                    {success && (
                        <Button
                            variant="contained"
                            color="primary"
                            sx={{ mt: 2 }}
                            onClick={() => navigate('/login')}
                        >
                            Go to Login
                        </Button>
                    )}
                </CardContent>
            </Card>
        </Box>
    );
};

export default VerifyEmail;