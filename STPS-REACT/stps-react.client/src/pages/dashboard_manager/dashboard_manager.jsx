import React, { useState } from 'react';
import Header from './header_dashboard'; // Import header
import ManageLocations from './managelocations'; // Import component quản lý địa điểm
import ManageBlogs from './manageblogs'; // Import component quản lý blogs
import "./style/dashboard_manager.css"; // Đường dẫn tới CSS
import 'bootstrap/dist/css/bootstrap.min.css';

const DashboardManager = () => {
    const [activeTab, setActiveTab] = useState('ManageLocations');

    const renderContent = () => {
        if (activeTab === 'ManageLocations') {
            return <ManageLocations />;
        }
        if (activeTab === 'ManageBlogs') {
            return <ManageBlogs />;
        }
        return null;
    };

    return (
        <div className="dashboard-manager">
            <Header />
            <div className="container">
                <nav className="sidebar">
                    <ul className="nav flex-column">
                        <li className="nav-item">
                            <button
                                className={`nav-link ${activeTab === 'ManageLocations' ? 'active' : ''}`}
                                onClick={() => setActiveTab('ManageLocations')}
                            >
                                Quản lý địa điểm
                            </button>
                        </li>
                        <li className="nav-item">
                            <button
                                className={`nav-link ${activeTab === 'ManageBlogs' ? 'active' : ''}`}
                                onClick={() => setActiveTab('ManageBlogs')}
                            >
                                Quản lý Blogs
                            </button>
                        </li>
                    </ul>
                </nav>
                <div className="content">
                    {renderContent()}
                </div>
            </div>
        </div>
    );
};

export default DashboardManager; // Đảm bảo có export default