import React from 'react';
import { motion } from 'framer-motion';
import { FaStar } from 'react-icons/fa';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import minneriyaImg from '../assets/Minneriya.jpg';
import nineArchImg from '../assets/Nine-Arch-Bridge.jpg';
import unawatunaImg from '../assets/Unawatuna.jpg';
import '../styles/Home.css';

const Home = () => {
    const popularLocations = [
        { id: 1, name: 'Minneriya', image: minneriyaImg },
        { id: 2, name: 'Nine Arch Bridge', image: nineArchImg },
        { id: 3, name: 'Unawatuna Beach', image: unawatunaImg }
    ];

    const packages = [
        { id: 1, title: 'Adventure Package', price: '$299', duration: '5 Days', image: 'https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?w=800' },
        { id: 2, title: 'Beach Paradise', price: '$399', duration: '7 Days', image: 'https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?w=800' },
        { id: 3, title: 'Cultural Tour', price: '$349', duration: '6 Days', image: 'https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?w=800' },
        { id: 4, title: 'Wildlife Safari', price: '$449', duration: '4 Days', image: 'https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?w=800' },
        { id: 5, title: 'Hill Country', price: '$279', duration: '5 Days', image: 'https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?w=800' },
        { id: 6, title: 'Complete Tour', price: '$599', duration: '10 Days', image: 'https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?w=800' }
    ];

    const activities = [
        { id: 1, name: 'Safari', image: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=400' },
        { id: 2, name: 'Hiking', image: 'https://images.unsplash.com/photo-1551632811-561732d1e306?w=400' },
        { id: 3, name: 'Beach', image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400' },
        { id: 4, name: 'Surfing', image: 'https://images.unsplash.com/photo-1502680390469-be75c86b636f?w=400' },
        { id: 5, name: 'Gems', image: 'https://images.unsplash.com/photo-1611955167811-4711904bb9f8?w=400' },
        { id: 6, name: 'Gems', image: 'https://images.unsplash.com/photo-1611955167811-4711904bb9f8?w=400' }
    ];

    const reviews = [
        {
            id: 1,
            name: 'Ravi Tharanga',
            rating: 5,
            text: 'Best self-drive and service provider in Sri Lanka. Highly recommended for anyone looking to explore the beautiful island. The team was professional and the experience was unforgettable!',
            avatar: 'https://ui-avatars.com/api/?name=Ravi+Tharanga&background=FF8C00&color=fff'
        },
        {
            id: 2,
            name: 'Nimal Silva',
            rating: 5,
            text: 'Best self-drive and service provider in Sri Lanka. Highly recommended for anyone looking to explore the beautiful island. The team was professional and the experience was unforgettable!',
            avatar: 'https://ui-avatars.com/api/?name=Nimal+Silva&background=FF8C00&color=fff'
        },
        {
            id: 3,
            name: 'Saman Perera',
            rating: 5,
            text: 'Best self-drive and service provider in Sri Lanka. Highly recommended for anyone looking to explore the beautiful island. The team was professional and the experience was unforgettable!',
            avatar: 'https://ui-avatars.com/api/?name=Saman+Perera&background=FF8C00&color=fff'
        }
    ];

    return (
        <div className="home">
            {/* Hero Section */}
            <section className="hero">
                <Navbar />

                <motion.div
                    className="hero-content"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                >
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.7 }}
                    >
                        Time to plan your next
                    </motion.h1>
                    <motion.h2
                        className="hero-subtitle"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6, delay: 0.9 }}
                    >
                        Adventure
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.6, delay: 1.1 }}
                    >
                        Let us plan it for you
                    </motion.p>
                    <motion.button
                        className="cta-button"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 1.3 }}
                        whileHover={{ scale: 1.05, boxShadow: "0 8px 25px rgba(255, 140, 0, 0.5)" }}
                        whileTap={{ scale: 0.95 }}
                    >
                        Get Started
                    </motion.button>
                </motion.div>
            </section>

            {/* Popular Locations */}
            <section className="popular-locations">


                <motion.div
                    className="section-header"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false, amount: 0.3 }}
                    transition={{ duration: 0.6 }}
                >

                    <h2>Explore All Popular Locations</h2>
                </motion.div>
                <div className="locations-grid">
                    <motion.div
                        className="location-large"
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: false, amount: 0.3 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        whileHover={{ scale: 1.02 }}
                    >
                        <img src={popularLocations[0].image} alt={popularLocations[0].name} />
                        <div className="location-overlay">
                            <h3>{popularLocations[0].name}</h3>
                        </div>
                    </motion.div>
                    <div className="location-small-grid">
                        <motion.div
                            className="location-small"
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: false, amount: 0.3 }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                            whileHover={{ scale: 1.02 }}
                        >
                            <img src={popularLocations[1].image} alt={popularLocations[1].name} />
                            <div className="location-overlay">
                                <h3>{popularLocations[1].name}</h3>
                            </div>
                        </motion.div>
                        <motion.div
                            className="location-small"
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: false, amount: 0.3 }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                            whileHover={{ scale: 1.02 }}
                        >
                            <img src={popularLocations[2].image} alt={popularLocations[2].name} />
                            <div className="location-overlay">
                                <h3>{popularLocations[2].name}</h3>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Packages Section */}
            <section className="packages">
                <motion.div
                    className="section-header"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false, amount: 0.3 }}
                    transition={{ duration: 0.6 }}
                >

                    <h2>Packages</h2>
                </motion.div>
                <div className="packages-grid">
                    {packages.map((pkg, index) => (
                        <motion.div
                            key={pkg.id}
                            className="package-card"
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: false, amount: 0.3 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            whileHover={{ y: -10, transition: { duration: 0.3 } }}
                        >
                            <img src={pkg.image} alt={pkg.title} />
                            <div className="package-content">
                                <h3>{pkg.title}</h3>
                                <p className="duration">{pkg.duration}</p>
                                <motion.button
                                    className="package-button"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    Explore Now
                                </motion.button>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Things to Do */}
            <section className="things-to-do">
                <motion.h2
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false, amount: 0.3 }}
                    transition={{ duration: 0.6 }}
                >
                    Things to do in Sri Lanka
                </motion.h2>
                <div className="activities-grid">
                    {activities.map((activity, index) => (
                        <motion.div
                            key={activity.id}
                            className="activity-card"
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: false, amount: 0.3 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            whileHover={{ scale: 1.05, transition: { duration: 0.3 } }}
                        >
                            <img src={activity.image} alt={activity.name} />
                            <div className="activity-name">
                                <span>{activity.name}</span>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Reviews Section */}
            <section className="reviews">
                <motion.h2
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false, amount: 0.3 }}
                    transition={{ duration: 0.6 }}
                >
                    Our favorite travelers
                </motion.h2>
                <div className="reviews-grid">
                    {reviews.map((review, index) => (
                        <motion.div
                            key={review.id}
                            className="review-card"
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: false, amount: 0.3 }}
                            transition={{ duration: 0.5, delay: index * 0.2 }}
                            whileHover={{ y: -5, transition: { duration: 0.3 } }}
                        >
                            <p className="review-text">{review.text}</p>
                            <div className="reviewer-info">
                                <img src={review.avatar} alt={review.name} className="reviewer-avatar" />
                                <div className="reviewer-details">
                                    <h4>{review.name}</h4>
                                    <div className="rating">
                                        {[...Array(review.rating)].map((_, i) => (
                                            <FaStar key={i} className="star" />
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default Home;
