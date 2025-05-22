import React, { useState } from 'react';
import MTourList from './mtourlist';
import MPromotionList from './mpromotionlist';
import Statistic from './statistic';
import AddTour from './addtour';
import UpdateTour from './updatetour';
import MTourDetail from './mtourdetail';
import AddPromotion from './addpromotion';
import UpdatePromotion from './updatepromotion';
import MPromotionDetail from './mpromotiondetail';
import {
  FaPlane,
  FaPercent,
  FaChartBar,
  FaSignOutAlt,
  FaSearch,
  FaBell,
  FaUserCircle,
  FaBars,
  FaTachometerAlt
} from 'react-icons/fa';
import logo from "../../assets/weblogo.jpg";
import "../../style/simple-sidebar.css"; // Sử dụng CSS mới cho sidebar
import 'bootstrap/dist/css/bootstrap.min.css';

const ManagePage = () => {
    const [activeTab, setActiveTab] = useState('Tour');
    const [currentPage, setCurrentPage] = useState('TourList');
    const [selectedTourId, setSelectedTourId] = useState(null);
    const [selectedPromotionId, setSelectedPromotionId] = useState(null);
    const [selectedTour, setSelectedTour] = useState(null);
    const [selectedPromotion, setSelectedPromotion] = useState(null);
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

    // Toggle sidebar
    const toggleSidebar = () => {
        setSidebarCollapsed(!sidebarCollapsed);
    };

    // Handle logout
    const handleLogout = () => {
        // Implement logout logic here
        alert('Đăng xuất thành công');
        // Redirect to login page or home page
        window.location.href = '/';
    };

    const renderContent = () => {
        if (activeTab === 'Tour') {
            if (currentPage === 'TourList') {
                return (
                    <MTourList
                        onAddTour={() => setCurrentPage('AddTour')}
                        onEditTour={(id) => { setSelectedTourId(id); setCurrentPage('UpdateTour'); }}
                        onViewDetail={(tour) => { setSelectedTour(tour); setCurrentPage('TourDetail'); }} // Cập nhật để chuyển sang chi tiết tour
                    />
                );
            }
            if (currentPage === 'AddTour') {
                return <AddTour onCancel={() => setCurrentPage('TourList')} />;
            }
            if (currentPage === 'UpdateTour') {
                return <UpdateTour tourId={selectedTourId} onCancel={() => setCurrentPage('TourList')} />;
            }
            if (currentPage === 'TourDetail') {
                return <MTourDetail tour={selectedTour} onBack={() => { setCurrentPage('TourList'); setSelectedTour(null); }} />;
            }
        }
        if (activeTab === 'KhuyenMai') {
            if (currentPage === 'PromotionList') {
                return (
                    <MPromotionList
                        onAddPromotion={() => setCurrentPage('AddPromotion')}
                        onEditPromotion={(id) => { setSelectedPromotionId(id); setCurrentPage('UpdatePromotion'); }}
                        onViewDetail={(promotion) => { setSelectedPromotion(promotion); setCurrentPage('PromotionDetail'); }} // Cập nhật để chuyển sang chi tiết khuyến mãi
                    />
                );
            }
            if (currentPage === 'AddPromotion') {
                return <AddPromotion onCancel={() => setCurrentPage('PromotionList')} />;
            }
            if (currentPage === 'UpdatePromotion') {
                return <UpdatePromotion promotionId={selectedPromotionId} onCancel={() => setCurrentPage('PromotionList')} />;
            }
            if (currentPage === 'PromotionDetail') {
                return <MPromotionDetail promotion={selectedPromotion} onBack={() => { setCurrentPage('PromotionList'); setSelectedPromotion(null); }} />;
            }
        }
        if (activeTab === 'ThongKe') {
            return <Statistic />;
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
                                className={`menu-link ${activeTab === 'Dashboard' ? 'active' : ''}`}
                                onClick={() => { setActiveTab('Dashboard'); }}
                                title="Tổng quan"
                            >
                                <span className="menu-icon"><FaTachometerAlt /></span>
                                <span className="menu-text">Tổng quan</span>
                            </button>
                        </li>
                        <li className="menu-item">
                            <button
                                className={`menu-link ${activeTab === 'Tour' ? 'active' : ''}`}
                                onClick={() => { setActiveTab('Tour'); setCurrentPage('TourList'); }}
                                title="Quản lý Tour"
                            >
                                <span className="menu-icon"><FaPlane /></span>
                                <span className="menu-text">Quản lý Tour</span>
                            </button>
                        </li>
                        <li className="menu-item">
                            <button
                                className={`menu-link ${activeTab === 'KhuyenMai' ? 'active' : ''}`}
                                onClick={() => { setActiveTab('KhuyenMai'); setCurrentPage('PromotionList'); }}
                                title="Quản lý khuyến mãi"
                            >
                                <span className="menu-icon"><FaPercent /></span>
                                <span className="menu-text">Khuyến mãi</span>
                            </button>
                        </li>
                        <li className="menu-item">
                            <button
                                className={`menu-link ${activeTab === 'ThongKe' ? 'active' : ''}`}
                                onClick={() => setActiveTab('ThongKe')}
                                title="Thống kê"
                            >
                                <span className="menu-icon"><FaChartBar /></span>
                                <span className="menu-text">Thống kê</span>
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
                        {activeTab === 'Tour' && 'Quản lý Tour'}
                        {activeTab === 'KhuyenMai' && 'Quản lý Khuyến mãi'}
                        {activeTab === 'ThongKe' && 'Thống kê'}
                    </div>
                    <div className="header-actions">
                        <div className="search-box">
                            <FaSearch className="search-icon" />
                            <input type="text" placeholder="Tìm kiếm..." />
                        </div>
                        <div className="user-menu">
                            <button className="notification-btn">
                                <FaBell />
                                <span className="badge">2</span>
                            </button>
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

export default ManagePage;