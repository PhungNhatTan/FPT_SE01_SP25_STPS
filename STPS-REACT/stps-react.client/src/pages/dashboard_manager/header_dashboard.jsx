import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/weblogo.jpg";
import profileImg from "../../assets/profile-icon.png";
import logoutIcon from "../../assets/logout-icon.png";
import "./style/header_dashboard.css";

const HeaderDashboard = () => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const navigate = useNavigate();

    const handleLogout = () => {
        // Xóa tất cả thông tin người dùng khỏi localStorage
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        localStorage.removeItem('userId');

        console.log("User logged out, all user data removed from localStorage");

        setDropdownOpen(false);

        // Chuyển hướng về trang chủ
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
                            <img src={profileImg} alt="Thông tin cá nhân" />
                            Thông tin cá nhân
                        </li>
                        <li onClick={handleLogout}>
                            <img src={logoutIcon} alt="Đăng xuất" />
                            Đăng xuất
                        </li>
                    </ul>
                )}
            </div>
        </header>
    );
};

export default HeaderDashboard;