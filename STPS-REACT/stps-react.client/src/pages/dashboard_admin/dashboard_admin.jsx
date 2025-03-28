import React, { useState } from 'react';
import Header from './header_dashboard';
import ManagerAccountList from './manageraccountlist'; // Import danh sách tài khoản quản lý
import UserAccountList from './useraccountlist'; // Import danh sách tài khoản người dùng
import Statistic from './statistic'; // Import thống kê
import AlgorithmSettings from './algorithmsettings'; // Import cài đặt thuật toán
import AddAccount from './addaccount'; // Import thêm tài khoản
import UpdateAccount from './updateaccount'; // Import cập nhật tài khoản
import AccountDetail from './accountdetail'; // Import chi tiết tài khoản
import "./style/dashboard_admin.css"; // Đường dẫn tới CSS
import 'bootstrap/dist/css/bootstrap.min.css';

const DashboardAdmin = () => {
    const [activeTab, setActiveTab] = useState('ManagerAccount');
    const [currentPage, setCurrentPage] = useState('ManagerAccountList');
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
            return <UserAccountList onViewAccount={(accountId) => {
                const account = accountList.find(acc => acc.id === accountId);
                setSelectedAccount(account);
                setCurrentPage('AccountDetail');
            }} />;
        }
        if (currentPage === 'Statistic') {
            return <Statistic />;
        }
        if (currentPage === 'AlgorithmSettings') {
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
