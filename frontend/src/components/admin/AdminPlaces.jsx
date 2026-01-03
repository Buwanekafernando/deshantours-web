import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPlus, FaEdit, FaTrash, FaTimes, FaMapMarkerAlt } from 'react-icons/fa';

const AdminPlaces = () => {
    const [places, setPlaces] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        image_url: '',
        location: '',
        price: 0,
        category: ''
    });
    const [isEditing, setIsEditing] = useState(false);
    const [editId, setEditId] = useState(null);

    const API_URL = 'http://localhost:8000/places/';

    useEffect(() => {
        fetchPlaces();
    }, []);

    const fetchPlaces = async () => {
        try {
            const response = await axios.get(API_URL);
            setPlaces(response.data);
        } catch (error) {
            console.error('Error fetching places:', error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
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
            fetchPlaces();
        } catch (error) {
            console.error('Error saving place:', error);
        }
    };

    const openModal = (place = null) => {
        if (place) {
            setFormData({
                name: place.name,
                description: place.description,
                image_url: place.image_url,
                location: place.location,
                price: place.price,
                category: place.category
            });
            setIsEditing(true);
            setEditId(place._id);
        } else {
            setFormData({ name: '', description: '', image_url: '', location: '', price: 0, category: '' });
            setIsEditing(false);
            setEditId(null);
        }
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setIsEditing(false);
        setEditId(null);
        setFormData({ name: '', description: '', image_url: '', location: '', price: 0, category: '' });
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this place?')) {
            try {
                await axios.delete(`${API_URL}${id}`);
                fetchPlaces();
            } catch (error) {
                console.error('Error deleting place:', error);
            }
        }
    };

    return (
        <div>
            <div className="section-header">
                <h2 className="section-title">Places</h2>
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => openModal()}
                    className="btn-primary"
                    style={{ backgroundColor: '#9333ea' }} // Purple override
                >
                    <FaPlus />
                    <span>Add Place</span>
                </motion.button>
            </div>

            <div className="cards-grid">
                <AnimatePresence>
                    {places.map((place) => (
                        <motion.div
                            key={place._id}
                            layout
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            className="card"
                        >
                            <div className="card-image-container" style={{ background: '#f3f4f6' }}>
                                <img
                                    src={place.image_url}
                                    alt={place.name}
                                    className="card-image"
                                    onError={(e) => { e.target.onerror = null; e.target.src = 'https://via.placeholder.com/400x300?text=No+Image'; }}
                                />
                                <div className="card-badge">
                                    ${place.price}
                                </div>
                            </div>
                            <div className="card-content">
                                <h3 className="card-title">{place.name}</h3>
                                <div className="card-meta">
                                    <span style={{ display: 'flex', alignItems: 'center' }}>
                                        <FaMapMarkerAlt style={{ marginRight: '0.25rem' }} /> {place.location}
                                    </span>
                                </div>
                                <p style={{ fontSize: '0.875rem', color: '#4b5563', marginBottom: '1rem', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{place.description}</p>
                                <span className="tag" style={{ alignSelf: 'flex-start', backgroundColor: '#f3e8ff', color: '#7e22ce' }}>
                                    {place.category}
                                </span>
                                <div className="card-actions">
                                    <button
                                        onClick={() => openModal(place)}
                                        className="icon-btn edit"
                                    >
                                        <FaEdit />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(place._id)}
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
                            style={{ maxWidth: '42rem' }}
                        >
                            <div className="modal-header">
                                <h3 className="modal-title">
                                    {isEditing ? 'Edit Place' : 'Add New Place'}
                                </h3>
                                <button onClick={closeModal} className="close-btn">
                                    <FaTimes />
                                </button>
                            </div>
                            <form onSubmit={handleSubmit}>
                                <div className="modal-body">
                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                        <div className="form-group" style={{ gridColumn: 'span 2' }}>
                                            <label className="form-label">Name</label>
                                            <input
                                                type="text"
                                                name="name"
                                                value={formData.name}
                                                onChange={handleInputChange}
                                                className="form-input"
                                                required
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label className="form-label">Location</label>
                                            <input
                                                type="text"
                                                name="location"
                                                value={formData.location}
                                                onChange={handleInputChange}
                                                className="form-input"
                                                required
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label className="form-label">Category</label>
                                            <input
                                                type="text"
                                                name="category"
                                                value={formData.category}
                                                onChange={handleInputChange}
                                                className="form-input"
                                                required
                                            />
                                        </div>

                                        <div className="form-group">
                                            <label className="form-label">Price ($)</label>
                                            <input
                                                type="number"
                                                name="price"
                                                value={formData.price}
                                                onChange={handleInputChange}
                                                className="form-input"
                                                required
                                            />
                                        </div>
                                        <div className="form-group" style={{ gridColumn: 'span 2' }}>
                                            <label className="form-label">Image URL</label>
                                            <input
                                                type="text"
                                                name="image_url"
                                                value={formData.image_url}
                                                onChange={handleInputChange}
                                                className="form-input"
                                                required
                                            />
                                        </div>
                                        <div className="form-group" style={{ gridColumn: 'span 2' }}>
                                            <label className="form-label">Description</label>
                                            <textarea
                                                name="description"
                                                rows="4"
                                                value={formData.description}
                                                onChange={handleInputChange}
                                                className="form-textarea"
                                                style={{ resize: 'none' }}
                                                required
                                            ></textarea>
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
                                        style={{ backgroundColor: '#9333ea' }}
                                    >
                                        {isEditing ? 'Save Changes' : 'Add Place'}
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

export default AdminPlaces;
