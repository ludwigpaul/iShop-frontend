// Inside AdminControls.jsx
import React, { useState } from 'react';
import jwt_decode from 'jwt-decode';
import UserList from './UserList';
import OrderList from './OrderList';

const AdminControls = () => {
    const token = localStorage.getItem('token');
    let isAdmin = false;
    if (token) {
        try {
            const decoded = jwt_decode(token);
            isAdmin = decoded.role === 'admin';
        } catch (e) {
            isAdmin = false;
        }
    }

    const [showAdminPanel, setShowAdminPanel] = useState(false);

    return (
        <div>
            {isAdmin && (
                <>
                    <button onClick={() => setShowAdminPanel(!showAdminPanel)}>
                        User Management
                    </button>
                    {showAdminPanel && (
                        <div>
                            <UserList />
                            <OrderList />
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default AdminControls;