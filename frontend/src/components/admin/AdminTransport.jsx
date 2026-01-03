import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPlus, FaEdit, FaTrash, FaTimes, FaBusAlt, FaUserTie } from 'react-icons/fa';

const AdminTransport = () => {
    const [transports, setTransports] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState({
        mode_type: '',
        image_url: '',
        number_of_seats: 0,
        guide_name: ''
    });
    const [isEditing, setIsEditing] = useState(false);
    const [editId, setEditId] = useState(null);

    const API_URL = 'http://localhost:8000/transport/';

    useEffect(() => {
        fetchTransports();
    }, []);

    const fetchTransports = async () => {
        try {
            const response = await axios.get(API_URL);
            setTransports(response.data);
        } catch (error) {
            console.error('Error fetching transports:', error);
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
            fetchTransports();
        } catch (error) {
            console.error('Error saving transport:', error);
        }
    };

    const openModal = (transport = null) => {
        if (transport) {
            setFormData({
                mode_type: transport.mode_type,
                image_url: transport.image_url,
                number_of_seats: transport.number_of_seats,
                guide_name: transport.guide_name
            });
            setIsEditing(true);
            setEditId(transport._id);
        } else {
            setFormData({ mode_type: '', image_url: '', number_of_seats: 0, guide_name: '' });
            setIsEditing(false);
            setEditId(null);
        }
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setIsEditing(false);
        setEditId(null);
        setFormData({ mode_type: '', image_url: '', number_of_seats: 0, guide_name: '' });
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this transport?')) {
            try {
                await axios.delete(`${API_URL}${id}`);
                fetchTransports();
            } catch (error) {
                console.error('Error deleting transport:', error);
            }
        }
    };

    return (
        <div>
            <div className="section-header">
                <h2 className="section-title">Transport</h2>
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => openModal()}
                    className="btn-primary"
                    style={{ backgroundColor: '#4f46e5' }} // Indigo override
                >
                    <FaPlus />
                    <span>Add Transport</span>
                </motion.button>
            </div>

            <div className="cards-grid">
                <AnimatePresence>
                    {transports.map((item) => (
                        <motion.div
                            key={item._id}
                            layout
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            className="card"
                        >
                            <div className="card-image-container" style={{ background: '#f3f4f6', height: '10rem' }}>
                                <img
                                    src={item.image_url}
                                    alt={item.mode_type}
                                    className="card-image"
                                    onError={(e) => { e.target.onerror = null; e.target.src = 'https://via.placeholder.com/400x300?text=Transport+Image'; }}
                                />
                                <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.7), transparent)', padding: '1rem' }}>
                                    <h3 style={{ color: 'white', fontSize: '1.25rem', fontWeight: 700, margin: 0 }}>{item.mode_type}</h3>
                                </div>
                            </div>
                            <div className="card-content">
                                <div style={{ marginBottom: '1rem' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '0.5rem', color: '#374151' }}>
                                        <FaUserTie style={{ marginRight: '0.5rem', color: '#4f46e5' }} />
                                        <span style={{ fontSize: '0.875rem', fontWeight: 500 }}>Guide: {item.guide_name}</span>
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', color: '#374151' }}>
                                        <FaBusAlt style={{ marginRight: '0.5rem', color: '#4f46e5' }} />
                                        <span style={{ fontSize: '0.875rem', fontWeight: 500 }}>{item.number_of_seats} Seats</span>
                                    </div>
                                </div>
                                <div className="card-actions">
                                    <button
                                        onClick={() => openModal(item)}
                                        className="icon-btn edit"
                                    >
                                        <FaEdit />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(item._id)}
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
                        >
                            <div className="modal-header">
                                <h3 className="modal-title">
                                    {isEditing ? 'Edit Transport' : 'Add New Transport'}
                                </h3>
                                <button onClick={closeModal} className="close-btn">
                                    <FaTimes />
                                </button>
                            </div>
                            <form onSubmit={handleSubmit}>
                                <div className="modal-body">
                                    <div className="form-group">
                                        <label className="form-label">Mode Type</label>
                                        <input
                                            type="text"
                                            name="mode_type"
                                            placeholder="e.g. Luxury Van, Car"
                                            value={formData.mode_type}
                                            onChange={handleInputChange}
                                            className="form-input"
                                            required
                                        />
                                    </div>
                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                        <div className="form-group">
                                            <label className="form-label">Guide Name</label>
                                            <input
                                                type="text"
                                                name="guide_name"
                                                value={formData.guide_name}
                                                onChange={handleInputChange}
                                                className="form-input"
                                                required
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label className="form-label">Seats</label>
                                            <input
                                                type="number"
                                                name="number_of_seats"
                                                value={formData.number_of_seats}
                                                onChange={handleInputChange}
                                                className="form-input"
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className="form-group">
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
                                        style={{ backgroundColor: '#4f46e5' }}
                                    >
                                        {isEditing ? 'Save Changes' : 'Add Transport'}
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

export default AdminTransport;
