import React, { useState } from 'react';
import Header from './header_dashboard';
import ManagerAccountList from './manageraccountlist'; // Import danh sách tài khoản quản lý
import UserAccountList from './useraccountlist'; // Import danh sách tài khoản người dùng
import Statistic from './statistic'; // Import thống kê
import AlgorithmSettings from './algorithmsettings'; // Import cài đặt thuật toán
import "./style/dashboard_admin.css"; // Đường dẫn tới CSS
import 'bootstrap/dist/css/bootstrap.min.css';

const DashboardAdmin = () => {
    const [activeTab, setActiveTab] = useState('ManagerAccount');
    const [currentPage, setCurrentPage] = useState('ManagerAccountList');

    const renderContent = () => {
        if (activeTab === 'ManagerAccount') {
            if (currentPage === 'ManagerAccountList') {
                return <ManagerAccountList />;
            }
        }
        if (activeTab === 'UserAccount') {
            return <UserAccountList />;
        }
        if (activeTab === 'Statistic') {
            return <Statistic />;
        }
        if (activeTab === 'AlgorithmSettings') {
            return <AlgorithmSettings />;
        }
        return null;
    };

    return (
        <div className="dashboard-admin">
            <Header />
            <div className="container">
                <nav className="sidebar">
                    <ul className="nav flex-column">
                        <li className="nav-item">
                            <button
                                className={`nav-link ${activeTab === 'ManagerAccount' ? 'active' : ''}`}
                                onClick={() => { setActiveTab('ManagerAccount'); setCurrentPage('ManagerAccountList'); }}
                            >
                                Tài khoản quản lý
                            </button>
                        </li>
                        <li className="nav-item">
                            <button
                                className={`nav-link ${activeTab === 'UserAccount' ? 'active' : ''}`}
                                onClick={() => { setActiveTab('UserAccount'); setCurrentPage('UserAccountList'); }}
                            >
                                Tài khoản người dùng
                            </button>
                        </li>
                        <li className="nav-item">
                            <button
                                className={`nav-link ${activeTab === 'Statistic' ? 'active' : ''}`}
                                onClick={() => { setActiveTab('Statistic'); setCurrentPage('Statistic'); }}
                            >
                                Thống kê
                            </button>
                        </li>
                        <li className="nav-item">
                            <button
                                className={`nav-link ${activeTab === 'AlgorithmSettings' ? 'active' : ''}`}
                                onClick={() => { setActiveTab('AlgorithmSettings'); setCurrentPage('AlgorithmSettings'); }}
                            >
                                Cài đặt thuật toán
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

export default DashboardAdmin; // Đảm bảo có export default