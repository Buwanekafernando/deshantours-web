import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaFacebookF, FaInstagram, FaWhatsapp } from 'react-icons/fa';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import '../styles/Contact.css';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        whatsapp: '',
        subject: '', // What needs to be done
        message: ''
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        // Clear error when user types
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const validateForm = () => {
        const newErrors = {};
        if (!formData.name.trim()) newErrors.name = 'Name is required';
        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Email is invalid';
        }
        if (!formData.whatsapp.trim()) newErrors.whatsapp = 'WhatsApp number is required';
        if (!formData.subject.trim()) newErrors.subject = 'This field is required';
        if (!formData.message.trim()) newErrors.message = 'Message is required';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            console.log('Form submitted:', formData);
            alert('Thank you for contacting us! We will get back to you soon.');
            setFormData({
                name: '',
                email: '',
                whatsapp: '',
                subject: '',
                message: ''
            });
        }
    };

    return (
        <div className="contact-page">
            <Navbar />

            {/* Hero Section */}
            <section className="contact-hero">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <h1>Get in Touch</h1>
                    <p>We'd Love to Hear From You</p>
                    <button className="book-now-btn">Book Now</button>
                </motion.div>
            </section>

            <div className="contact-container">
                {/* Contact Form Section */}
                <motion.div
                    className="form-section"
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                >
                    <h2>Send us a Message</h2>
                    <form className="contact-form" onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label>Your Name</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="John Doe"
                            />
                            {errors.name && <span className="error-msg">{errors.name}</span>}
                        </div>

                        <div className="form-group">
                            <label>Email Address</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="john@example.com"
                            />
                            {errors.email && <span className="error-msg">{errors.email}</span>}
                        </div>

                        <div className="form-group">
                            <label>WhatsApp Number</label>
                            <input
                                type="tel"
                                name="whatsapp"
                                value={formData.whatsapp}
                                onChange={handleChange}
                                placeholder="+94 77 123 4567"
                            />
                            {errors.whatsapp && <span className="error-msg">{errors.whatsapp}</span>}
                        </div>

                        <div className="form-group">
                            <label>What needs to be done?</label>
                            <input
                                type="text"
                                name="subject"
                                value={formData.subject}
                                onChange={handleChange}
                                placeholder="Tour Inquiry, Custom Package, etc."
                            />
                            {errors.subject && <span className="error-msg">{errors.subject}</span>}
                        </div>

                        <div className="form-group">
                            <label>Message</label>
                            <textarea
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                placeholder="Tell us more about your travel plans..."
                            ></textarea>
                            {errors.message && <span className="error-msg">{errors.message}</span>}
                        </div>

                        <button type="submit" className="submit-btn">Send Message</button>
                    </form>
                </motion.div>

                {/* Contact Info Section */}
                <motion.div
                    className="info-section"
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                >
                    <h3>Contact Information</h3>

                    <div className="info-item">
                        <div className="info-icon">
                            <FaPhone />
                        </div>
                        <div className="info-content">
                            <h4>Phone Number</h4>
                            <p>+94 77 787 4085</p>
                            <p>+94 71 234 5678</p>
                        </div>
                    </div>

                    <div className="info-item">
                        <div className="info-icon">
                            <FaEnvelope />
                        </div>
                        <div className="info-content">
                            <h4>Email Address</h4>
                            <p>deshantours@gmail.com</p>
                            <p>info@deshantours.com</p>
                        </div>
                    </div>

                    <div className="info-item">
                        <div className="info-icon">
                            <FaMapMarkerAlt />
                        </div>
                        <div className="info-content">
                            <h4>Office Availability</h4>
                            <p>Available 24/7 for inquiries</p>
                            <p>Colombo, Sri Lanka</p>
                        </div>
                    </div>

                    <div className="social-links">
                        <h4>Connect with us</h4>
                        <div className="social-icons">
                            <a href="#" className="social-icon"><FaFacebookF /></a>
                            <a href="#" className="social-icon"><FaInstagram /></a>
                            <a href="#" className="social-icon"><FaWhatsapp /></a>
                        </div>
                    </div>
                </motion.div>
            </div>
            <Footer />
        </div>
    );
};

export default Contact;
