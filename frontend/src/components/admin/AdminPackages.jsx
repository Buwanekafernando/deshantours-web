import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPlus, FaEdit, FaTrash, FaTimes, FaBox, FaMapMarkerAlt, FaImage } from 'react-icons/fa';

const AdminPackages = () => {
    const [packages, setPackages] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        total_price: 0,
        total_days: 0,
        tripplan: []
    });
    const [isEditing, setIsEditing] = useState(false);
    const [editId, setEditId] = useState(null);

    const API_URL = 'http://localhost:8000/packages/';

    useEffect(() => {
        fetchPackages();
    }, []);

    const fetchPackages = async () => {
        try {
            const response = await axios.get(API_URL);
            setPackages(response.data);
        } catch (error) {
            console.error('Error fetching packages:', error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleDayChange = (index, field, value) => {
        const newTripPlan = [...formData.tripplan];
        newTripPlan[index][field] = value;
        setFormData({ ...formData, tripplan: newTripPlan });
    };

    const handleLocationChange = (dayIndex, locIndex, value) => {
        const newTripPlan = [...formData.tripplan];
        newTripPlan[dayIndex].location[locIndex] = value;
        setFormData({ ...formData, tripplan: newTripPlan });
    };

    const addLocation = (dayIndex) => {
        const newTripPlan = [...formData.tripplan];
        newTripPlan[dayIndex].location.push('');
        setFormData({ ...formData, tripplan: newTripPlan });
    };

    const removeLocation = (dayIndex, locIndex) => {
        const newTripPlan = [...formData.tripplan];
        newTripPlan[dayIndex].location.splice(locIndex, 1);
        setFormData({ ...formData, tripplan: newTripPlan });
    };

    const addDay = () => {
        setFormData({
            ...formData,
            tripplan: [
                ...formData.tripplan,
                { day: formData.tripplan.length + 1, location: [''], image_url: '' }
            ]
        });
    };

    const removeDay = (index) => {
        const newTripPlan = [...formData.tripplan];
        newTripPlan.splice(index, 1);
        // Re-index days
        newTripPlan.forEach((day, i) => day.day = i + 1);
        setFormData({ ...formData, tripplan: newTripPlan });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (isEditing) {
                await axios.put(`${API_URL}${editId}`, formData);
            } else {
                await axios.post(API_URL, formData);
            }
            closeModal();
            fetchPackages();
        } catch (error) {
            console.error('Error saving package:', error);
        }
    };

    const openModal = (pkg = null) => {
        if (pkg) {
            setFormData({
                name: pkg.name,
                total_price: pkg.total_price,
                total_days: pkg.total_days,
                tripplan: pkg.tripplan || []
            });
            setIsEditing(true);
            setEditId(pkg._id);
        } else {
            setFormData({ name: '', total_price: 0, total_days: 0, tripplan: [] });
            setIsEditing(false);
            setEditId(null);
        }
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setIsEditing(false);
        setEditId(null);
        setFormData({ name: '', total_price: 0, total_days: 0, tripplan: [] });
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this package?')) {
            try {
                await axios.delete(`${API_URL}${id}`);
                fetchPackages();
            } catch (error) {
                console.error('Error deleting package:', error);
            }
        }
    };

    return (
        <div>
            <div className="section-header">
                <h2 className="section-title">Packages</h2>
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => openModal()}
                    className="btn-primary"
                >
                    <FaPlus />
                    <span>Add Package</span>
                </motion.button>
            </div>

            <div className="cards-grid">
                <AnimatePresence>
                    {packages.map((pkg) => (
                        <motion.div
                            key={pkg._id}
                            layout
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            className="card"
                        >
                            <div className="card-image-container">
                                {pkg.tripplan && pkg.tripplan.length > 0 && pkg.tripplan[0].image_url ? (
                                    <img
                                        src={pkg.tripplan[0].image_url}
                                        alt={pkg.name}
                                        className="card-image"
                                        onError={(e) => { e.target.onerror = null; e.target.src = 'https://via.placeholder.com/400x300?text=No+Image'; }}
                                    />
                                ) : (
                                    <FaBox style={{ fontSize: '4rem', color: 'rgba(255,255,255,0.5)' }} />
                                )}
                                <div className="card-badge">
                                    ${pkg.total_price}
                                </div>
                            </div>
                            <div className="card-content">
                                <h3 className="card-title">{pkg.name}</h3>
                                <div className="card-meta">
                                    <span className="tag">{pkg.total_days} Days</span>
                                </div>
                                <div className="card-actions">
                                    <button
                                        onClick={() => openModal(pkg)}
                                        className="icon-btn edit"
                                    >
                                        <FaEdit />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(pkg._id)}
                                        className="icon-btn delete"
                                    >
                                        <FaTrash />
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>

            {/* Modal */}
            <AnimatePresence>
                {isModalOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="modal-overlay"
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="modal-content"
                            style={{ maxWidth: '50rem' }}
                        >
                            <div className="modal-header">
                                <h3 className="modal-title">
                                    {isEditing ? 'Edit Package' : 'New Package'}
                                </h3>
                                <button onClick={closeModal} className="close-btn">
                                    <FaTimes />
                                </button>
                            </div>
                            <form onSubmit={handleSubmit}>
                                <div className="modal-body">
                                    <div className="form-group">
                                        <label className="form-label">Package Name</label>
                                        <input
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleInputChange}
                                            className="form-input"
                                            required
                                        />
                                    </div>
                                    <div className="form-group" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                        <div>
                                            <label className="form-label">Price ($)</label>
                                            <input
                                                type="number"
                                                name="total_price"
                                                value={formData.total_price}
                                                onChange={handleInputChange}
                                                className="form-input"
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label className="form-label">Duration (Days)</label>
                                            <input
                                                type="number"
                                                name="total_days"
                                                value={formData.total_days}
                                                onChange={handleInputChange}
                                                className="form-input"
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                                            <label className="form-label">Trip Plan (Days)</label>
                                            <button
                                                type="button"
                                                onClick={addDay}
                                                className="btn-secondary"
                                                style={{ padding: '0.25rem 0.5rem', fontSize: '0.875rem' }}
                                            >
                                                <FaPlus style={{ marginRight: '0.25rem' }} /> Add Day
                                            </button>
                                        </div>

                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                            {formData.tripplan.map((day, dIndex) => (
                                                <div key={dIndex} style={{ border: '1px solid #e5e7eb', borderRadius: '0.5rem', padding: '1rem', background: '#f9fafb' }}>
                                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                                                        <span style={{ fontWeight: '600', fontSize: '0.875rem' }}>Day {day.day}</span>
                                                        <button
                                                            type="button"
                                                            onClick={() => removeDay(dIndex)}
                                                            className="icon-btn delete"
                                                            style={{ padding: '0.25rem' }}
                                                        >
                                                            <FaTimes />
                                                        </button>
                                                    </div>

                                                    <div className="form-group">
                                                        <label className="form-label" style={{ fontSize: '0.75rem' }}>Image URL</label>
                                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                                            <FaImage style={{ color: '#9ca3af' }} />
                                                            <input
                                                                type="text"
                                                                value={day.image_url}
                                                                onChange={(e) => handleDayChange(dIndex, 'image_url', e.target.value)}
                                                                className="form-input"
                                                                placeholder="https://example.com/image.jpg"
                                                            />
                                                        </div>
                                                    </div>

                                                    <div className="form-group" style={{ marginBottom: 0 }}>
                                                        <label className="form-label" style={{ fontSize: '0.75rem' }}>Locations</label>
                                                        {day.location.map((loc, lIndex) => (
                                                            <div key={lIndex} style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem' }}>
                                                                <input
                                                                    type="text"
                                                                    value={loc}
                                                                    onChange={(e) => handleLocationChange(dIndex, lIndex, e.target.value)}
                                                                    className="form-input"
                                                                    placeholder="Location name"
                                                                />
                                                                <button
                                                                    type="button"
                                                                    onClick={() => removeLocation(dIndex, lIndex)}
                                                                    className="icon-btn delete"
                                                                >
                                                                    <FaTrash />
                                                                </button>
                                                            </div>
                                                        ))}
                                                        <button
                                                            type="button"
                                                            onClick={() => addLocation(dIndex)}
                                                            style={{ color: '#2563eb', background: 'none', border: 'none', cursor: 'pointer', fontSize: '0.875rem', display: 'flex', alignItems: 'center', gap: '0.25rem' }}
                                                        >
                                                            <FaPlus /> Add Location
                                                        </button>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button
                                        type="button"
                                        onClick={closeModal}
                                        className="btn-secondary"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="btn-primary"
                                    >
                                        {isEditing ? 'Save Changes' : 'Create Package'}
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default AdminPackages;
