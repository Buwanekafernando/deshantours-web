import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminTransport = () => {
    const [transports, setTransports] = useState([]);
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
            setFormData({ mode_type: '', image_url: '', number_of_seats: 0, guide_name: '' });
            setIsEditing(false);
            setEditId(null);
            fetchTransports();
        } catch (error) {
            console.error('Error saving transport:', error);
        }
    };

    const handleEdit = (transport) => {
        setFormData({
            mode_type: transport.mode_type,
            image_url: transport.image_url,
            number_of_seats: transport.number_of_seats,
            guide_name: transport.guide_name
        });
        setIsEditing(true);
        setEditId(transport._id);
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
            <h2 className="text-2xl font-semibold mb-4">Manage Transport</h2>
            <form onSubmit={handleSubmit} className="mb-8 p-4 bg-gray-50 rounded shadow-sm">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input type="text" name="mode_type" placeholder="Mode Type" value={formData.mode_type} onChange={handleInputChange} className="p-2 border rounded" required />
                    <input type="text" name="guide_name" placeholder="Guide Name" value={formData.guide_name} onChange={handleInputChange} className="p-2 border rounded" required />
                    <input type="number" name="number_of_seats" placeholder="Number of Seats" value={formData.number_of_seats} onChange={handleInputChange} className="p-2 border rounded" required />
                    <input type="text" name="image_url" placeholder="Image URL" value={formData.image_url} onChange={handleInputChange} className="p-2 border rounded" required />
                </div>
                <button type="submit" className="mt-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">
                    {isEditing ? 'Update Transport' : 'Add Transport'}
                </button>
                {isEditing && (
                    <button
                        type="button"
                        onClick={() => { setIsEditing(false); setFormData({ mode_type: '', image_url: '', number_of_seats: 0, guide_name: '' }); }}
                        className="mt-4 ml-2 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                    >
                        Cancel
                    </button>
                )}
            </form>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {transports.map((item) => (
                    <div key={item._id} className="bg-white border rounded p-4 relative">
                        <img src={item.image_url} alt={item.mode_type} className="w-full h-40 object-cover rounded mb-2" />
                        <h3 className="font-bold text-lg">{item.mode_type}</h3>
                        <p className="text-sm text-gray-600">Guide: {item.guide_name} | Seats: {item.number_of_seats}</p>
                        <div className="mt-4 flex space-x-2">
                            <button onClick={() => handleEdit(item)} className="px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600">Edit</button>
                            <button onClick={() => handleDelete(item._id)} className="px-3 py-1 bg-red-500 text-white rounded text-sm hover:bg-red-600">Delete</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
export default AdminTransport;
