import React from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe('pk_test_51RjOFYDHa7aFVVFnH09XEKfL4cQHjTEfMPs0YrKEDNL85ZvyxHjCi28T49Ih8PkKVmBK7wjXKkStQPM89Mw22gSe00rZsiGexr');
console.log(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);

const StripeProvider = ({ children }) => (
    <Elements stripe={stripePromise}>
        {children}
    </Elements>
);

export default StripeProvider;