import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/weblogo.jpg";
import profileImg from "../../assets/profile-icon.png";
import logoutIcon from "../../assets/logout-icon.png";
import { FaUserCircle, FaSignOutAlt, FaBell, FaEnvelope } from 'react-icons/fa';
import "./style/header_dashboard.css";

const HeaderDashboard = () => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setDropdownOpen(false);
        window.location.href = '/';
    };

    return (
        <header className="header">
            <div className="logo">
                <img src={logo} alt="Go Tour" />
                <span className="fw-bold">
                    GO TOUR - DASHBOARD
                </span>
            </div>

            <div className="header-right">
                {/* Notification Icons */}
                <div className="notification-icons">
                    <button className="icon-button">
                        <FaBell />
                        <span className="badge">3</span>
                    </button>
                    <button className="icon-button">
                        <FaEnvelope />
                        <span className="badge">7</span>
                    </button>
                </div>

                {/* Divider */}
                <div className="header-divider"></div>

                {/* Profile Menu */}
                <div className="profile-menu">
                    <button
                        className="profile-button"
                        onClick={() => setDropdownOpen(!dropdownOpen)}
                    >
                        <img src={profileImg} alt="Profile" />
                    </button>

                    {/* Dropdown List */}
                    {dropdownOpen && (
                        <ul className="profile-dropdown">
                            <li>
                                <FaUserCircle size={18} color="#4e73df" />
                                Thông tin cá nhân
                            </li>
                            <li onClick={handleLogout}>
                                <FaSignOutAlt size={18} color="#e74a3b" />
                                Đăng xuất
                            </li>
                        </ul>
                    )}
                </div>
            </div>
        </header>
    );
};

export default HeaderDashboard;