import React, { useState } from 'react';
import AdminPackages from '../components/admin/AdminPackages';
import AdminPlaces from '../components/admin/AdminPlaces';
import AdminTransport from '../components/admin/AdminTransport';
import AdminHotels from '../components/admin/AdminHotels';

const AdminDashboard = () => {
    const [activeTab, setActiveTab] = useState('packages');

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <div className="max-w-7xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
                <h1 className="text-3xl font-bold p-6 border-b">Admin Dashboard</h1>
                <div className="flex border-b bg-gray-50">
                    {['packages', 'places', 'transport', 'hotels'].map((tab) => (
                        <button
                            key={tab}
                            className={`flex-1 py-4 text-center font-medium focus:outline-none transition-colors duration-200 ${activeTab === tab
                                    ? 'bg-blue-600 text-white shadow-sm'
                                    : 'text-gray-600 hover:bg-gray-200 hover:text-gray-900'
                                }`}
                            onClick={() => setActiveTab(tab)}
                        >
                            {tab.charAt(0).toUpperCase() + tab.slice(1)}
                        </button>
                    ))}
                </div>
                <div className="p-6">
                    {activeTab === 'packages' && <AdminPackages />}
                    {activeTab === 'places' && <AdminPlaces />}
                    {activeTab === 'transport' && <AdminTransport />}
                    {activeTab === 'hotels' && <AdminHotels />}
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
