import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaClock, FaPhone, FaEnvelope } from 'react-icons/fa';
import logo from '../assets/logo.png';
import '../styles/Home.css'; // Reusing Home.css for now as styles are there. Ideally move to Navbar.css later.

const Navbar = () => {
    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    const formatTime = (date) => {
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
    };

    return (
        <motion.nav
            className="navbar"
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
        >
            {/* Top Contact Bar */}
            <div className="top-bar">
                <div className="top-bar-container">
                    <div className="top-bar-item">
                        <FaClock className="top-bar-icon" />
                        <span>{formatTime(currentTime)}</span>
                    </div>
                    <div className="top-bar-item">
                        <FaPhone className="top-bar-icon" />
                        <span>+94 77 787 4085 </span>
                    </div>
                    <div className="top-bar-item">
                        <FaEnvelope className="top-bar-icon" />
                        <span>deshantours@gmail.com</span>
                    </div>
                </div>
            </div>

            {/* Main Navigation */}
            <div className="nav-container">
                <motion.div
                    className="logo"
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 300 }}
                >
                    <Link to="/">
                        <img src={logo} alt="Deshan Tours" />
                    </Link>
                </motion.div>
                <ul className="nav-links">
                    <motion.li
                        initial={{ y: -20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.3, duration: 0.4 }}
                    >
                        <Link to="/">Home</Link>
                    </motion.li>
                    <motion.li
                        initial={{ y: -20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.4, duration: 0.4 }}
                    >
                        <Link to="/packages">Packages</Link>
                    </motion.li>
                    <motion.li
                        initial={{ y: -20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.5, duration: 0.4 }}
                    >
                        <Link to="/transport">Transport</Link>
                    </motion.li>
                    <motion.li
                        initial={{ y: -20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.6, duration: 0.4 }}
                    >
                        <Link to="/about">About Us</Link>
                    </motion.li>
                    <motion.li
                        initial={{ y: -20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.7, duration: 0.4 }}
                    >
                        <Link to="/contact">Contact Us</Link>
                    </motion.li>
                </ul>
            </div>
        </motion.nav>
    );
};

export default Navbar;
