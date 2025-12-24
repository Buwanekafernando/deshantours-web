import React from 'react';
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
import '../styles/Home.css'; // Reusing Home.css for styles

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-content">
                <div className="footer-section">
                    <h3>Address</h3>
                    <p>123 Galle Road,</p>
                    <p>Colombo 03,</p>
                    <p>Sri Lanka</p>
                </div>
                <div className="footer-section">
                    <h3>Contact</h3>
                    <p><FaPhone /> +94 77 123 4567</p>
                    <p><FaEnvelope /> info@deshantours.com</p>
                    <p><FaMapMarkerAlt /> Find us on map</p>
                </div>
                <div className="footer-section">
                    <h3>Office Hours</h3>
                    <p>Monday - Friday</p>
                    <p>9:00 AM - 6:00 PM</p>
                    <p>Saturday: 9:00 AM - 2:00 PM</p>
                </div>
                <div className="footer-cta">
                    <h2>Let's plan your next trip</h2>
                    <button className="footer-button">Contact Us</button>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
