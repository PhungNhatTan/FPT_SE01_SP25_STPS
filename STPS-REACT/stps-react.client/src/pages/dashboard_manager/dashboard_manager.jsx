import React, { useState } from 'react';
import LocationList from './locationlist'; // Import component quản lý địa điểm
import AddLocation from './addlocation'; // Import component thêm địa điểm
import UpdateLocation from './updatelocation'; // Import component cập nhật địa điểm
import BlogList from './bloglist'; // Import component quản lý blogs
import AddBlog from './addblog'; // Import component thêm blog
import UpdateBlog from './updateblog'; // Import component cập nhật blog
import {
  FaMapMarkerAlt,
  FaBlog,
  FaSignOutAlt,
  FaSearch,
  FaBell,
  FaUserCircle,
  FaHome,
  FaUsers,
  FaTicketAlt,
  FaBars,
  FaTachometerAlt
} from 'react-icons/fa';
import logo from "../../assets/weblogo.jpg";
import "../../style/simple-sidebar.css"; // Sử dụng CSS mới cho sidebar
import 'bootstrap/dist/css/bootstrap.min.css';

const DashboardManager = () => {
    const [activeTab, setActiveTab] = useState('ManageLocations');
    const [currentPage, setCurrentPage] = useState('LocationList');
    const [selectedLocationId, setSelectedLocationId] = useState(null);
    const [selectedBlogId, setSelectedBlogId] = useState(null);
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

    // Toggle sidebar
    const toggleSidebar = () => {
        setSidebarCollapsed(!sidebarCollapsed);
    };

    // Handle logout
    const handleLogout = () => {
        // Xóa tất cả thông tin người dùng khỏi localStorage
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        localStorage.removeItem('userId');

        console.log("User logged out, all user data removed from localStorage");

        // Chuyển hướng về trang chủ
        window.location.href = '/';
    };

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
        <div className="app-container">
            {/* Sidebar */}
            <aside className={`simple-sidebar ${sidebarCollapsed ? 'collapsed' : ''}`}>
                <div className="sidebar-header">
                    <div className="sidebar-logo">
                        <img src={logo} alt="Logo" />
                        <span>GOTOUR</span>
                    </div>
                    <button className="sidebar-toggle" onClick={toggleSidebar}>
                        <FaBars />
                    </button>
                </div>

                <div className="sidebar-menu">
                    <div className="menu-category">Quản lý</div>
                    <ul className="menu-items">
                        <li className="menu-item">
                            <button
                                className={`menu-link ${activeTab === 'ManageLocations' ? 'active' : ''}`}
                                onClick={() => { setActiveTab('ManageLocations'); setCurrentPage('LocationList'); }}
                                title="Quản lý địa điểm"
                            >
                                <span className="menu-icon"><FaMapMarkerAlt /></span>
                                <span className="menu-text">Địa điểm</span>
                            </button>
                        </li>
                        <li className="menu-item">
                            <button
                                className={`menu-link ${activeTab === 'ManageBlogs' ? 'active' : ''}`}
                                onClick={() => { setActiveTab('ManageBlogs'); setCurrentPage('BlogList'); }}
                                title="Quản lý Blogs"
                            >
                                <span className="menu-icon"><FaBlog /></span>
                                <span className="menu-text">Blogs</span>
                            </button>
                        </li>
                    </ul>
                </div>

                <div className="sidebar-footer">
                    <button className="logout-btn" onClick={handleLogout} title="Đăng xuất">
                        <span className="logout-icon"><FaSignOutAlt /></span>
                        <span className="logout-text">Đăng xuất</span>
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className={`main-content ${sidebarCollapsed ? 'expanded' : ''}`}>
                {/* Header */}
                <header className="content-header">
                    <div className="page-title">
                        {activeTab === 'Dashboard' && 'Tổng quan'}
                        {activeTab === 'ManageLocations' && 'Quản lý địa điểm'}
                        {activeTab === 'ManageBlogs' && 'Quản lý Blogs'}
                        {activeTab === 'ManageUsers' && 'Quản lý người dùng'}
                        {activeTab === 'ManageBookings' && 'Quản lý đặt tour'}
                    </div>
                    <div className="header-actions">
                        <div className="user-menu">
                            <div className="user-role">Manager</div>
                            <div className="avatar">
                                <FaUserCircle />
                            </div>
                        </div>
                    </div>
                </header>

                {/* Page Content */}
                <div className="content-body">
                    <div className="content-card">
                        {renderContent()}
                    </div>
                </div>
            </main>
        </div>
    );
};

export default DashboardManager; // Đảm bảo có export default