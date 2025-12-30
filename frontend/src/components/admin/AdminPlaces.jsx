import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminPlaces = () => {
    const [places, setPlaces] = useState([]);
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
            setFormData({ name: '', description: '', image_url: '', location: '', price: 0, category: '' });
            setIsEditing(false);
            setEditId(null);
            fetchPlaces();
        } catch (error) {
            console.error('Error saving place:', error);
        }
    };

    const handleEdit = (place) => {
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
            <h2 className="text-2xl font-semibold mb-4">Manage Places</h2>
            <form onSubmit={handleSubmit} className="mb-8 p-4 bg-gray-50 rounded shadow-sm">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleInputChange} className="p-2 border rounded" required />
                    <input type="text" name="category" placeholder="Category" value={formData.category} onChange={handleInputChange} className="p-2 border rounded" required />
                    <input type="number" name="price" placeholder="Price" value={formData.price} onChange={handleInputChange} className="p-2 border rounded" required />
                    <input type="text" name="location" placeholder="Location" value={formData.location} onChange={handleInputChange} className="p-2 border rounded" required />
                    <input type="text" name="image_url" placeholder="Image URL" value={formData.image_url} onChange={handleInputChange} className="p-2 border rounded" required />
                    <textarea name="description" placeholder="Description" value={formData.description} onChange={handleInputChange} className="p-2 border rounded md:col-span-2" required />
                </div>
                <button type="submit" className="mt-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">
                    {isEditing ? 'Update Place' : 'Add Place'}
                </button>
                {isEditing && (
                    <button
                        type="button"
                        onClick={() => { setIsEditing(false); setFormData({ name: '', description: '', image_url: '', location: '', price: 0, category: '' }); }}
                        className="mt-4 ml-2 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                    >
                        Cancel
                    </button>
                )}
            </form>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {places.map((place) => (
                    <div key={place._id} className="bg-white border rounded p-4 relative">
                        <img src={place.image_url} alt={place.name} className="w-full h-40 object-cover rounded mb-2" />
                        <h3 className="font-bold text-lg">{place.name}</h3>
                        <p className="text-sm text-gray-600">{place.category} - ${place.price}</p>
                        <div className="mt-4 flex space-x-2">
                            <button onClick={() => handleEdit(place)} className="px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600">Edit</button>
                            <button onClick={() => handleDelete(place._id)} className="px-3 py-1 bg-red-500 text-white rounded text-sm hover:bg-red-600">Delete</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
export default AdminPlaces;
