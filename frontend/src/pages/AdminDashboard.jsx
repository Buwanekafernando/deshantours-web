import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    FaSuitcaseRolling,
    FaMapMarkedAlt,
    FaBus,
    FaHotel,
    FaTachometerAlt,
    FaSignOutAlt
} from 'react-icons/fa';
import AdminPackages from '../components/admin/AdminPackages';
import AdminPlaces from '../components/admin/AdminPlaces';
import AdminTransport from '../components/admin/AdminTransport';
import AdminHotels from '../components/admin/AdminHotels';
import logo from '../assets/logo.png';
import '../styles/admin.css';

import axios from 'axios';

const AdminDashboard = () => {
    const [activeTab, setActiveTab] = useState('overview');
    const [stats, setStats] = useState({
        packages: 0,
        places: 0,
        transport: 0,
        hotels: 0
    });

    useEffect(() => {
        fetchStats();
    }, []);

    const fetchStats = async () => {
        try {
            const response = await axios.get('http://localhost:8000/stats');
            setStats(response.data);
        } catch (error) {
            console.error('Error fetching stats:', error);
        }
    };

    const menuItems = [
        { id: 'overview', label: 'Overview', icon: <FaTachometerAlt /> },
        { id: 'packages', label: 'Packages', icon: <FaSuitcaseRolling /> },
        { id: 'places', label: 'Places', icon: <FaMapMarkedAlt /> },
        { id: 'transport', label: 'Transport', icon: <FaBus /> },
        { id: 'hotels', label: 'Hotels', icon: <FaHotel /> },
    ];

    const renderContent = () => {
        switch (activeTab) {
            case 'packages': return <AdminPackages />;
            case 'places': return <AdminPlaces />;
            case 'transport': return <AdminTransport />;
            case 'hotels': return <AdminHotels />;
            default: return <AdminPackages />;
        }
    };

    return (
        <div className="admin-container">
            {/* Sidebar */}
            <motion.div
                initial={{ x: -250 }}
                animate={{ x: 0 }}
                className="admin-sidebar"
            >
                <div className="sidebar-header">
                    <img src={logo} alt="DeshanTours Logo" style={{ height: '40px', width: 'auto', marginRight: '10px' }} />
                    <h1 className="brand-name">DeshanTours</h1>
                </div>

                <nav className="sidebar-nav custom-scrollbar">
                    <ul className="nav-list">
                        {menuItems.map((item) => (
                            <li key={item.id}>
                                <button
                                    onClick={() => setActiveTab(item.id)}
                                    className={`nav-button ${activeTab === item.id ? 'active' : ''}`}
                                >
                                    <span className="nav-icon">
                                        {item.icon}
                                    </span>
                                    <span className="nav-label">{item.label}</span>
                                </button>
                            </li>
                        ))}
                    </ul>
                </nav>

                <div className="sidebar-footer">
                    <button className="logout-btn">
                        <FaSignOutAlt />
                        <span>Logout</span>
                    </button>
                    <p className="copyright">&copy; 2024 DeshanTours Admin</p>
                </div>
            </motion.div>

            {/* Main Content Area */}
            <div className="admin-main">
                {/* Top Header */}
                <header className="main-header">
                    <h2 className="page-title">
                        {menuItems.find(i => i.id === activeTab)?.label} Management
                    </h2>
                    <div className="user-profile">
                        <div className="user-profile">
                            <img
                                src="https://ui-avatars.com/api/?name=Admin+User&background=FF8C00&color=fff"
                                alt="Admin"
                                className="avatar"
                            />
                            <div className="user-info">
                                <p className="user-name">Admin User</p>
                                <p className="user-status">Online</p>
                            </div>
                        </div>
                    </div>
                </header>

                <main className="content-wrapper">
                    {/* Background Pattern - Keeping it subtle but maybe warmer */}
                    <div className="bg-pattern" style={{ opacity: 0.5 }} />

                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeTab}
                            initial={{ opacity: 0, y: 10 }} // Reduced movement for safety
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.2 }} // Faster transition
                            className="relative z-10"
                        >
                            {activeTab === 'overview' ? (
                                <div className="overview-container">
                                    <h2 className="section-title">Overview</h2>
                                    <div className="stats-grid">
                                        {menuItems.slice(1).map((item) => (
                                            <motion.div
                                                key={item.id}
                                                whileHover={{ y: -5 }}
                                                className="stat-card"
                                            >
                                                <div className="stat-icon-wrapper" style={{ backgroundColor: 'rgba(255, 140, 0, 0.1)', color: '#FF8C00' }}>
                                                    {item.icon}
                                                </div>
                                                <div className="stat-content">
                                                    <h3 className="stat-label">{item.label}</h3>
                                                    <p className="stat-value">{stats[item.id] || 0}</p>
                                                </div>
                                            </motion.div>
                                        ))}
                                    </div>
                                </div>
                            ) : (
                                renderContent()
                            )}
                        </motion.div>
                    </AnimatePresence>
                </main>
            </div>
        </div>
    );
};

export default AdminDashboard;
