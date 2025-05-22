import React, { useState } from 'react';
import {
  FaUserCog,
  FaUsers,
  FaBuilding,
  FaChartBar,
  FaCogs,
  FaBars,
  FaSearch,
  FaBell,
  FaEnvelope,
  FaSignOutAlt,
  FaUserCircle,
  FaTachometerAlt,
  FaAngleRight
} from 'react-icons/fa';
import logo from "../../assets/weblogo.jpg";
import profileImg from "../../assets/profile-icon.png";
import ManagerAccountList from './manageraccountlist';
import UserManagement from './UserManagement';
import Statistic from './statistic';
import AlgorithmSettings from './algorithmsettings';
import AddAccount from './addaccount';
import UpdateAccount from './updateaccount';
import AccountDetail from './accountdetail';
import TourismCompanyList from './tourismcompanylist';
import './style/modern-dashboard.css';

const ModernDashboard = () => {
  // State
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState('UserAccount');
  const [currentPage, setCurrentPage] = useState('UserAccountList');
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [accountList, setAccountList] = useState([]);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  // Event Handlers
  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  const handleAddAccount = (account) => {
    setAccountList([...accountList, { ...account, id: Date.now().toString() }]);
    setCurrentPage('ManagerAccountList');
  };

  const handleUpdateAccount = (updatedAccount) => {
    const updatedList = accountList.map(acc =>
      acc.id === updatedAccount.id ? updatedAccount : acc
    );
    setAccountList(updatedList);
    setCurrentPage('ManagerAccountList');
    setSelectedAccount(null);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/';
  };

  // Get page title based on active tab
  const getPageTitle = () => {
    switch (activeTab) {
      case 'ManagerAccount': return 'Quản lý tài khoản quản lý';
      case 'UserAccount': return 'Quản lý tài khoản người dùng';
      case 'TourismCompany': return 'Quản lý công ty du lịch';
      case 'Statistic': return 'Thống kê';
      case 'AlgorithmSettings': return 'Cài đặt thuật toán';
      default: return 'Dashboard';
    }
  };

  // Render content based on current page
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
    if (currentPage === 'AlgorithmSettings') {
      return <AlgorithmSettings />;
    }
    if (currentPage === 'TourismCompanyList') {
      return <TourismCompanyList />;
    }
    return null;
  };

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <aside className={`sidebar ${sidebarCollapsed ? 'sidebar-collapsed' : ''}`}>
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
          <div className="menu-section">
            <div className="menu-title">Tổng quan</div>
            <ul className="menu-items">
              <li className="menu-item">
                <button
                  className={`menu-link ${activeTab === 'Dashboard' ? 'active' : ''}`}
                  onClick={() => { setActiveTab('Dashboard'); setCurrentPage('Dashboard'); }}
                >
                  <span className="menu-icon"><FaTachometerAlt /></span>
                  <span className="menu-text">Dashboard</span>
                </button>
              </li>
            </ul>
          </div>

          <div className="menu-section">
            <div className="menu-title">Quản lý</div>
            <ul className="menu-items">
              <li className="menu-item">
                <button
                  className={`menu-link ${activeTab === 'ManagerAccount' ? 'active' : ''}`}
                  onClick={() => { setActiveTab('ManagerAccount'); setCurrentPage('ManagerAccountList'); }}
                >
                  <span className="menu-icon"><FaUserCog /></span>
                  <span className="menu-text">Tài khoản quản lý</span>
                </button>
              </li>
              <li className="menu-item">
                <button
                  className={`menu-link ${activeTab === 'UserAccount' ? 'active' : ''}`}
                  onClick={() => { setActiveTab('UserAccount'); setCurrentPage('UserAccountList'); }}
                >
                  <span className="menu-icon"><FaUsers /></span>
                  <span className="menu-text">Tài khoản người dùng</span>
                </button>
              </li>
              <li className="menu-item">
                <button
                  className={`menu-link ${activeTab === 'TourismCompany' ? 'active' : ''}`}
                  onClick={() => { setActiveTab('TourismCompany'); setCurrentPage('TourismCompanyList'); }}
                >
                  <span className="menu-icon"><FaBuilding /></span>
                  <span className="menu-text">Công ty du lịch</span>
                </button>
              </li>
            </ul>
          </div>

          <div className="menu-section">
            <div className="menu-title">Báo cáo & Cài đặt</div>
            <ul className="menu-items">
              <li className="menu-item">
                <button
                  className={`menu-link ${activeTab === 'Statistic' ? 'active' : ''}`}
                  onClick={() => { setActiveTab('Statistic'); setCurrentPage('Statistic'); }}
                >
                  <span className="menu-icon"><FaChartBar /></span>
                  <span className="menu-text">Thống kê</span>
                </button>
              </li>
              <li className="menu-item">
                <button
                  className={`menu-link ${activeTab === 'AlgorithmSettings' ? 'active' : ''}`}
                  onClick={() => { setActiveTab('AlgorithmSettings'); setCurrentPage('AlgorithmSettings'); }}
                >
                  <span className="menu-icon"><FaCogs /></span>
                  <span className="menu-text">Cài đặt thuật toán</span>
                </button>
              </li>
            </ul>
          </div>
        </div>

        <div className="sidebar-footer">
          <button className="logout-button" onClick={handleLogout}>
            <FaSignOutAlt className="logout-icon" />
            <span>Đăng xuất</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className={`main-content ${sidebarCollapsed ? 'main-content-expanded' : ''}`}>
        {/* Header */}
        <header className="header">
          <h1 className="page-title">{getPageTitle()}</h1>

          <div className="header-actions">
            <div className="search-bar">
              <span className="search-icon"><FaSearch /></span>
              <input
                type="text"
                className="search-input"
                placeholder="Tìm kiếm..."
              />
            </div>

            <div className="user-menu">
              <button
                className="user-button"
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
              >
                <img src={profileImg} alt="User" className="user-avatar" />
                <div className="user-info">
                  <div className="user-name">Admin</div>
                  <div className="user-role">Administrator</div>
                </div>
                <FaAngleRight style={{ transform: userDropdownOpen ? 'rotate(90deg)' : '', transition: 'transform 0.3s' }} />
              </button>

              {userDropdownOpen && (
                <div className="user-dropdown">
                  <ul className="dropdown-menu">
                    <li className="dropdown-item">
                      <FaUserCircle className="dropdown-icon" />
                      <span>Thông tin cá nhân</span>
                    </li>
                    <li className="dropdown-item" onClick={handleLogout}>
                      <FaSignOutAlt className="dropdown-icon" />
                      <span>Đăng xuất</span>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="page-content">
          {renderContent()}
        </div>
      </main>
    </div>
  );
};

export default ModernDashboard;
