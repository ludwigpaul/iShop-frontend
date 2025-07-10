// ishop-frontend/src/components/OrderForm.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './OrderForm.css';

const OrderForm = () => {
    const [userId, setUserId] = useState('');
    const [items, setItems] = useState('');
    const [email, setEmail] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        // Get userId from localStorage if available
        const storedUserId = localStorage.getItem('userId');
        if (storedUserId) setUserId(storedUserId);
    }, []);

    const handleCheckout = (e) => {
        e.preventDefault();
        let parsedItems;
        try {
            parsedItems = JSON.parse(items);
        } catch {
            parsedItems = [];
        }
        navigate('/payment', { state: { userId, items: parsedItems, email } });
    };

    return (
        <div className="order-form-container">
            <form className="order-form-card" onSubmit={handleCheckout}>
                <h2>Place Your Order</h2>
                <label>User ID</label>
                <input
                    type="text"
                    value={userId}
                    onChange={e => setUserId(e.target.value)}
                    required
                />
                <label>Items</label>
                <input
                    type="text"
                    value={items}
                    onChange={e => setItems(e.target.value)}
                    required
                />
                <label>Email</label>
                <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                />
                <button type="submit">Proceed to Checkout</button>
            </form>
        </div>
    );
};

export default OrderForm;