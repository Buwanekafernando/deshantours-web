import React from 'react';
import { motion } from 'framer-motion';
import { FaCloud } from 'react-icons/fa'; // Using cloud icon as placeholder like in image
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import './Packages.css';
import heroImg from '../assets/sri-lankan-leopard-yala.jpg';

const Packages = () => {
    const categories = [
        { id: 1, title: 'Family Tour' },
        { id: 2, title: 'WildLife Tour' },
        { id: 3, title: 'General Tour' },
        { id: 4, title: 'Culture Tour' },
        { id: 5, title: 'Couple Tour' },
        { id: 6, title: 'Luxury Tour' }
    ];

    return (
        <div className="packages-page">
            <Navbar />

            {/* Hero Section */}
            <section
                className="packages-hero"
                style={{
                    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(${heroImg})`
                }}
            >
                <div className="packages-hero-content">
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        Tour Packages
                    </motion.h1>

                    <motion.div
                        className="filter-bar"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.3, duration: 0.5 }}
                    >
                        <div className="interest-in">Interest In</div>
                        <div className="filter-inputs">
                            <div className="filter-input-group">
                                <select defaultValue="">
                                    <option value="" disabled>Tour Type</option>
                                    <option value="family">Family</option>
                                    <option value="wildlife">Wildlife</option>
                                    <option value="culture">Culture</option>
                                    <option value="luxury">Luxury</option>
                                </select>
                            </div>
                            <div className="filter-input-group">
                                <select defaultValue="">
                                    <option value="" disabled>Travel Month</option>
                                    <option value="jan">January</option>
                                    <option value="feb">February</option>
                                    <option value="mar">March</option>
                                    <option value="apr">April</option>
                                    <option value="may">May</option>
                                    {/* Add other months */}
                                </select>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Tour Packages Grid */}
            <section className="packages-categories">
                <h2>Tour Packages</h2>
                <div className="categories-grid">
                    {categories.map((category, index) => (
                        <motion.div
                            key={category.id}
                            className="category-card"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1, duration: 0.5 }}
                            whileHover={{ scale: 1.05 }}
                        >
                            <FaCloud className="category-icon" style={{ color: 'white', marginTop: '30px', fontSize: '5rem' }} />
                            <h3 className="category-title">{category.title}</h3>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Plan Your Own Tour Form */}
            <section className="planning-section">
                <h2>Plan Your Own Tour</h2>
                <form className="planning-form" onSubmit={(e) => e.preventDefault()}>
                    <div className="form-group">
                        <input type="text" placeholder="Your Name" required />
                    </div>
                    <div className="form-group">
                        <input type="email" placeholder="Email Address" required />
                    </div>
                    <div className="form-group">
                        <select defaultValue="">
                            <option value="" disabled>Select Tour Type</option>
                            <option value="family">Family Tour</option>
                            <option value="wildlife">Wildlife Tour</option>
                            <option value="culture">Culture Tour</option>
                            <option value="luxury">Luxury Tour</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <textarea rows="5" placeholder="Tell us about your travel plans (Top destinations, activities, etc.)"></textarea>
                    </div>
                    <button type="submit" className="submit-btn">Plan My Tour</button>
                </form>
            </section>

            <Footer />
        </div>
    );
};

export default Packages;
