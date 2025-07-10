import React from 'react';
import { useLocation } from 'react-router-dom';

const ThankYouPage = () => {
    const { state } = useLocation();
    return (
        <div>
            <h2>Thank you for your order!</h2>
            <p>Your order ID: {state?.orderId}</p>
        </div>
    );
};

export default ThankYouPage;