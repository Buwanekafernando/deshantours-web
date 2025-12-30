import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminPackages = () => {
    const [packages, setPackages] = useState([]);
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (isEditing) {
                await axios.put(`${API_URL}${editId}`, formData);
            } else {
                await axios.post(API_URL, formData);
            }
            setFormData({ name: '', total_price: 0, total_days: 0, tripplan: [] });
            setIsEditing(false);
            setEditId(null);
            fetchPackages();
        } catch (error) {
            console.error('Error saving package:', error);
        }
    };

    const handleEdit = (pkg) => {
        setFormData({
            name: pkg.name,
            total_price: pkg.total_price,
            total_days: pkg.total_days,
            tripplan: pkg.tripplan || []
        });
        setIsEditing(true);
        setEditId(pkg._id);
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
            <h2 className="text-2xl font-semibold mb-4">Manage Packages</h2>

            <form onSubmit={handleSubmit} className="mb-8 p-4 bg-gray-50 rounded shadow-sm">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                        type="text"
                        name="name"
                        placeholder="Package Name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="p-2 border rounded"
                        required
                    />
                    <input
                        type="number"
                        name="total_price"
                        placeholder="Total Price"
                        value={formData.total_price}
                        onChange={handleInputChange}
                        className="p-2 border rounded"
                        required
                    />
                    <input
                        type="number"
                        name="total_days"
                        placeholder="Total Days"
                        value={formData.total_days}
                        onChange={handleInputChange}
                        className="p-2 border rounded"
                        required
                    />
                    {/* Tripplan handling is simplified for now, can be expanded for full JSON editing or complex UI */}
                </div>
                <button type="submit" className="mt-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">
                    {isEditing ? 'Update Package' : 'Add Package'}
                </button>
                {isEditing && (
                    <button
                        type="button"
                        onClick={() => { setIsEditing(false); setFormData({ name: '', total_price: 0, total_days: 0, tripplan: [] }); }}
                        className="mt-4 ml-2 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                    >
                        Cancel
                    </button>
                )}
            </form>

            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border">
                    <thead>
                        <tr>
                            <th className="py-2 px-4 border-b">Name</th>
                            <th className="py-2 px-4 border-b">Price</th>
                            <th className="py-2 px-4 border-b">Days</th>
                            <th className="py-2 px-4 border-b">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {packages.map((pkg) => (
                            <tr key={pkg._id} className="text-center">
                                <td className="py-2 px-4 border-b">{pkg.name}</td>
                                <td className="py-2 px-4 border-b">${pkg.total_price}</td>
                                <td className="py-2 px-4 border-b">{pkg.total_days}</td>
                                <td className="py-2 px-4 border-b space-x-2">
                                    <button
                                        onClick={() => handleEdit(pkg)}
                                        className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDelete(pkg._id)}
                                        className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminPackages;
