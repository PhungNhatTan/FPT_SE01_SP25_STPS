import React, { useState } from 'react';
import Header from './header_dashboard';
import ManagerAccountList from './manageraccountlist'; // Import danh sách tài khoản quản lý
import UserManagement from './UserManagement'; // Import component quản lý người dùng mới
import Statistic from './statistic'; // Import thống kê
import AdminRevenueStatistics from './AdminRevenueStatistics'; // Import thống kê doanh thu admin
import AlgorithmSettings from './algorithmsettings'; // Import cài đặt thuật toán
import AddAccount from './addaccount'; // Import thêm tài khoản
import UpdateAccount from './updateaccount'; // Import cập nhật tài khoản
import AccountDetail from './accountdetail'; // Import chi tiết tài khoản
import { FaUserCog, FaUsers, FaBuilding, FaChartBar, FaCogs, FaBars, FaSignOutAlt, FaMoneyBillWave } from 'react-icons/fa';
import "./style/modern-admin-dashboard.css"; // Đường dẫn tới CSS mới
import 'bootstrap/dist/css/bootstrap.min.css';
import TourismCompanyList from './tourismcompanylist';
import logo from "../../assets/weblogo.jpg";

const DashboardAdmin = () => {
    // Đặt tab mặc định là UserAccount để hiển thị quản lý người dùng
    const [activeTab, setActiveTab] = useState('UserAccount');
    const [currentPage, setCurrentPage] = useState('UserAccountList');
    const [selectedAccount, setSelectedAccount] = useState(null);
    const [accountList, setAccountList] = useState([]); // Danh sách tài khoản

    const handleAddAccount = (account) => {
        setAccountList([...accountList, { ...account, id: Date.now().toString() }]);
        setCurrentPage('ManagerAccountList'); // Quay lại danh sách sau khi thêm
    };

    const handleUpdateAccount = (updatedAccount) => {
        setAccountList(accountList.map(account =>
            account.id === updatedAccount.id ? updatedAccount : account
        ));
        setCurrentPage('ManagerAccountList'); // Quay lại danh sách sau khi cập nhật
    };

    const renderContent = () => {
        if (currentPage === 'ManagerAccountList') {
            return (
                <ManagerAccountList
                    accounts={accountList}
                    onAddAccount={() => setCurrentPage('AddAccount')}
                    onEditAccount={(account) => {
                        setSelectedAccount(account);
                        setCurrentPage('UpdateAccount');
                    }}
                    onViewAccount={(accountId) => {
                        const account = accountList.find(acc => acc.id === accountId);
                        setSelectedAccount(account);
                        setCurrentPage('AccountDetail');
                    }}
                />
            );
        }
        if (currentPage === 'AddAccount') {
            return <AddAccount onCancel={() => setCurrentPage('ManagerAccountList')} onAdd={handleAddAccount} />;
        }
        if (currentPage === 'UpdateAccount') {
            return <UpdateAccount account={selectedAccount} onUpdate={handleUpdateAccount} onCancel={() => {
                setCurrentPage('ManagerAccountList');
                setSelectedAccount(null);
            }} />;
        }
        if (currentPage === 'AccountDetail') {
            return <AccountDetail account={selectedAccount} onClose={() => setCurrentPage('ManagerAccountList')} />;
        }
        if (currentPage === 'UserAccountList') {
            return <UserManagement />;
        }
        if (currentPage === 'Statistic') {
            return <Statistic />;
        }
        if (currentPage === 'AdminRevenueStatistics') {
            return <AdminRevenueStatistics />;
        }
        if (currentPage === 'AlgorithmSettings') {
            return <AlgorithmSettings />;
        }
        if (currentPage === 'TourismCompanyList') {
            return <TourismCompanyList />;
        }
        return null;
    };

    return (
        <div className="dashboard-admin">
            <Header />
            <div className="container">
                <nav className="sidebar">
                    <div className="sidebar-brand">
                        <h2>Admin Dashboard</h2>
                    </div>
                    <div className="sidebar-divider"></div>
                    <ul className="nav flex-column">
                        <li className="nav-item">
                            <button
                                className={`nav-link ${activeTab === 'ManagerAccount' ? 'active' : ''}`}
                                onClick={() => { setActiveTab('ManagerAccount'); setCurrentPage('ManagerAccountList'); }}
                            >
                                <FaUserCog className="nav-icon" /> Tài khoản quản lý
                            </button>
                        </li>
                        <li className="nav-item">
                            <button
                                className={`nav-link ${activeTab === 'UserAccount' ? 'active' : ''}`}
                                onClick={() => { setActiveTab('UserAccount'); setCurrentPage('UserAccountList'); }}
                            >
                                <FaUsers className="nav-icon" /> Tài khoản người dùng
                            </button>
                        </li>
                        <li className="nav-item">
                            <button
                                className={`nav-link ${activeTab === 'TourismCompany' ? 'active' : ''}`}
                                onClick={() => { setActiveTab('TourismCompany'); setCurrentPage('TourismCompanyList'); }}
                            >
                                <FaBuilding className="nav-icon" /> Quản lý công ty du lịch
                            </button>
                        </li>
                        <li className="nav-item">
                            <button
                                className={`nav-link ${activeTab === 'Statistic' ? 'active' : ''}`}
                                onClick={() => { setActiveTab('Statistic'); setCurrentPage('Statistic'); }}
                            >
                                <FaChartBar className="nav-icon" /> Thống kê
                            </button>
                        </li>
                        <li className="nav-item">
                            <button
                                className={`nav-link ${activeTab === 'AdminRevenueStatistics' ? 'active' : ''}`}
                                onClick={() => { setActiveTab('AdminRevenueStatistics'); setCurrentPage('AdminRevenueStatistics'); }}
                            >
                                <FaMoneyBillWave className="nav-icon" /> Thống kê doanh thu
                            </button>
                        </li>
                        <li className="nav-item">
                            <button
                                className={`nav-link ${activeTab === 'AlgorithmSettings' ? 'active' : ''}`}
                                onClick={() => { setActiveTab('AlgorithmSettings'); setCurrentPage('AlgorithmSettings'); }}
                            >
                                <FaCogs className="nav-icon" /> Cài đặt thuật toán
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
