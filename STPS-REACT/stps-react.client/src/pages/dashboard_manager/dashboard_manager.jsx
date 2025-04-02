import React, { useState } from 'react';
import Header from './header_dashboard'; // Import header
import LocationList from './locationlist'; // Import component quản lý địa điểm
import AddLocation from './addlocation'; // Import component thêm địa điểm
import UpdateLocation from './updatelocation'; // Import component cập nhật địa điểm
import BlogList from './bloglist'; // Import component quản lý blogs
import AddBlog from './addblog'; // Import component thêm blog
import UpdateBlog from './updateblog'; // Import component cập nhật blog
import "./style/dashboard_manager.css"; // Đường dẫn tới CSS
import 'bootstrap/dist/css/bootstrap.min.css';

const DashboardManager = () => {
    const [activeTab, setActiveTab] = useState('ManageLocations');
    const [currentPage, setCurrentPage] = useState('LocationList');
    const [selectedLocationId, setSelectedLocationId] = useState(null);
    const [selectedBlogId, setSelectedBlogId] = useState(null);

    const renderContent = () => {
        if (activeTab === 'ManageLocations') {
            if (currentPage === 'LocationList') {
                return (
                    <LocationList 
                        onAddLocation={() => setCurrentPage('AddLocation')} 
                        onEditLocation={(id) => { setSelectedLocationId(id); setCurrentPage('UpdateLocation'); }} 
                    />
                );
            }
            if (currentPage === 'AddLocation') {
                return <AddLocation onCancel={() => setCurrentPage('LocationList')} />;
            }
            if (currentPage === 'UpdateLocation') {
                return <UpdateLocation locationId={selectedLocationId} onCancel={() => setCurrentPage('LocationList')} />;
            }
        }

        if (activeTab === 'ManageBlogs') {
            if (currentPage === 'BlogList') {
                return (
                    <BlogList 
                        onAddBlog={() => setCurrentPage('AddBlog')} 
                        onEditBlog={(id) => { setSelectedBlogId(id); setCurrentPage('UpdateBlog'); }} 
                    />
                );
            }
            if (currentPage === 'AddBlog') {
                return <AddBlog onCancel={() => setCurrentPage('BlogList')} />;
            }
            if (currentPage === 'UpdateBlog') {
                return <UpdateBlog blogId={selectedBlogId} onCancel={() => setCurrentPage('BlogList')} />;
            }
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
                                onClick={() => { setActiveTab('ManageLocations'); setCurrentPage('LocationList'); }}
                            >
                                Quản lý địa điểm
                            </button>
                        </li>
                        <li className="nav-item">
                            <button
                                className={`nav-link ${activeTab === 'ManageBlogs' ? 'active' : ''}`}
                                onClick={() => { setActiveTab('ManageBlogs'); setCurrentPage('BlogList'); }}
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