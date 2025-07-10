// ishop-frontend/src/components/WorkerDashboard.js
import React, { useEffect, useState } from 'react';

const WorkerDashboard = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrders = async () => {
            const token = localStorage.getItem('token');
            const userId = localStorage.getItem('userId'); // Save userId on login
            const res = await fetch(`http://localhost:3000/api/v1/admin/worker/${userId}/orders`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            if (res.ok) setOrders(await res.json());
            setLoading(false);
        };
        fetchOrders();
    }, []);

    if (loading) return <div>Loading...</div>;

    return (
        <div>
            <h2>My Assigned Orders</h2>
            <ul>
                {orders.map(order => (
                    <li key={order.id}>
                        {order.description} - {order.completed_at ? 'Completed' : 'Pending'}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default WorkerDashboard;