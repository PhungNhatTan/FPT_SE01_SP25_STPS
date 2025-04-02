import React, { useState } from 'react';
import Header from './header';
import MTourList from './mtourlist';
import MPromotionList from './mpromotionlist';
import Statistic from './statistic';
import AddTour from './addtour';
import UpdateTour from './updatetour';
import MTourDetail from './mtourdetail'; // Import MTourDetail
import AddPromotion from './addpromotion';
import UpdatePromotion from './updatepromotion';
import MPromotionDetail from './mpromotiondetail'; // Import MPromotionDetail
import "../../style/managepage.css";
import 'bootstrap/dist/css/bootstrap.min.css';

const ManagePage = () => {
    const [activeTab, setActiveTab] = useState('Tour');
    const [currentPage, setCurrentPage] = useState('TourList');
    const [selectedTourId, setSelectedTourId] = useState(null);
    const [selectedPromotionId, setSelectedPromotionId] = useState(null);
    const [selectedTour, setSelectedTour] = useState(null); // State cho tour đã chọn
    const [selectedPromotion, setSelectedPromotion] = useState(null); // State cho khuyến mãi đã chọn

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
        <div className="manage-page">
            <Header />
            <div className="container">
                <nav className="sidebar">
                    <ul className="nav flex-column">
                        <li className="nav-item">
                            <button
                                className={`nav-link ${activeTab === 'Tour' ? 'active' : ''}`}
                                onClick={() => { setActiveTab('Tour'); setCurrentPage('TourList'); }}
                            >
                                Tour
                            </button>
                        </li>
                        <li className="nav-item">
                            <button
                                className={`nav-link ${activeTab === 'KhuyenMai' ? 'active' : ''}`}
                                onClick={() => { setActiveTab('KhuyenMai'); setCurrentPage('PromotionList'); }}
                            >
                                Khuyến mãi
                            </button>
                        </li>
                        <li className="nav-item">
                            <button
                                className={`nav-link ${activeTab === 'ThongKe' ? 'active' : ''}`}
                                onClick={() => setActiveTab('ThongKe')}
                            >
                                Thống kê
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

export default ManagePage;