import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Products from './pages/Products';
import Cart from './pages/Cart';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import OrderForm from './components/OrderForm';
import PaymentPage from './pages/PaymentPage';
import AdminDashboard from './components/AdminDashboard';
import ThankYouPage from './pages/ThankYouPage';
import { jwtDecode } from 'jwt-decode';
import AdminLogin from './components/AdminLogin';
import VerifyEmail from './pages/VerifyEmail';
import WorkerDashboard from "./components/WorkerDashboard";
import WorkerLogin from './components/WorkerLogin';
import StripeProvider from './contexts/StripeProvider';
import './App.css';

function AppRoutes() {
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                const decoded = jwtDecode(token);
                if (decoded.role === 'admin' && location.pathname !== '/admin') {
                    navigate('/admin', { replace: true });
                }
            } catch (e) {
                console.error('Invalid token:', e);
                localStorage.removeItem('token');
                localStorage.removeItem('userId');
                if (location.pathname !== '/login') {
                    navigate('/login', { replace: true });
                }
            }
        }
    }, [location, navigate]);

    return (
        <div className="App">
            <Navbar />
            <Routes>
                <Route path="/" element={<Products />} />
                <Route path="/products" element={<Products />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/auth/login" element={<Login />} />
                <Route path="/auth/register" element={<Register />} />
                <Route path="/verify-email" element={<VerifyEmail />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/order" element={<OrderForm />} />
                <Route path="/payment" element={<PaymentPage />} />
                <Route path="/admin" element={<AdminDashboard />} />
                <Route path="/admin/dashboard" element={<AdminDashboard />} />
                <Route path="/auth/login/worker" element={<WorkerLogin />} />
                <Route path="/worker/dashboard" element={<WorkerDashboard />} />
                <Route path="/admin/login" element={<AdminLogin />} />
                <Route path="/thank-you" element={<ThankYouPage />} />
            </Routes>
        </div>
    );
}

function App() {
    return (
        <StripeProvider>
            <Router>
                <AppRoutes />
            </Router>
        </StripeProvider>
    );
}

export default App;