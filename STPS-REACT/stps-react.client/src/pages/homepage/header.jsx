import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/weblogo.jpg";
import profileImg from "../../assets/profile-icon.png";
import settingsIcon from "../../assets/settings-icon.png";
import logoutIcon from "../../assets/logout-icon.png";
import cartIcon from "../../assets/cart-icon.png";
import historyIcon from "../../assets/history-icon.png";
import "../../style/header.css";

const Header = () => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();
    const dropdownRef = useRef(null);

    useEffect(() => {
        // Check if user is logged in
        const token = localStorage.getItem('token');
        setIsLoggedIn(!!token);

        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setDropdownOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handleLogout = () => {
        // Xóa tất cả thông tin người dùng khỏi localStorage
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        localStorage.removeItem('userId');

        console.log("User logged out, all user data removed from localStorage");

        setIsLoggedIn(false);
        setDropdownOpen(false);

        // Chuyển hướng về trang chủ
        window.location.href = '/';
    };

    return (
        <header className="header">
            <div className="logo">
                <img src={logo} alt="Go Tour" />
                <span className="fw-bold" style={{ cursor: "pointer" }} onClick={() => navigate("/")}>
                    GO TOUR
                </span>
            </div>

            <div className="profile-menu">
                {isLoggedIn ? (
                    <>
                        <button
                            className="profile-button"
                            onClick={() => setDropdownOpen(!dropdownOpen)}
                        >
                            <img src={profileImg} alt="Profile" />
                        </button>

                        {/* Dropdown List */}
                        {dropdownOpen && (
                            <ul className="profile-dropdown" ref={dropdownRef}>
                                <li onClick={() => navigate("/profile")}>
                                    <img src={profileImg} alt="Thông tin cá nhân" />
                                    Thông tin cá nhân
                                </li>
                                <li onClick={() => navigate("/customize-tour")}>
                                    <img src={settingsIcon} alt="Tùy chọn Tour" />
                                    Tùy chọn Tour
                                </li>
                                <li onClick={() => navigate("/saved-tour")}>
                                    <img src={cartIcon} alt="Tour đã lưu" />
                                    Tour đã lưu
                                </li>
                                <li onClick={() => navigate("/history")}>
                                    <img src={historyIcon} alt="Lịch sử" />
                                    Lịch sử đặt Tour
                                </li>
                                <li onClick={handleLogout}>
                                    <img src={logoutIcon} alt="Đăng xuất" />
                                    Đăng xuất
                                </li>
                            </ul>
                        )}
                    </>
                ) : (
                    <div className="auth-buttons" style={{ display: 'flex', gap: '10px' }}>
                        <button
                            className="register-button"
                            onClick={() => navigate("/register")}
                            style={{
                                backgroundColor: 'transparent',
                                color: '#007bff',
                                padding: '8px 16px',
                                border: '1px solid #007bff',
                                borderRadius: '5px',
                                fontSize: '14px',
                                cursor: 'pointer',
                                transition: 'all 0.3s ease',
                            }}
                        >
                            Đăng ký
                        </button>
                        <button
                            className="login-button"
                            onClick={() => navigate("/login")}
                            style={{
                                backgroundColor: '#007bff',
                                color: 'white',
                                padding: '8px 16px',
                                border: 'none',
                                borderRadius: '5px',
                                fontSize: '14px',
                                cursor: 'pointer',
                                transition: 'background-color 0.3s ease',
                            }}
                        >
                            Đăng nhập
                        </button>
                    </div>
                )}
            </div>
        </header>
    );
};

export default Header;