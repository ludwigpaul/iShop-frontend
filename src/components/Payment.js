import React from 'react';
import { useLocation } from 'react-router-dom';

const Payment = () => {
    const location = useLocation();
    const { userId, items, email } = location.state || {};

    return (
        <div>
            <h2>Payment Page</h2>
            <p>User ID: {userId}</p>
            <p>Items: {items}</p>
            <p>Email: {email}</p>
        </div>
    );
};

export default Payment;