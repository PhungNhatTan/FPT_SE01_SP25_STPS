import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/weblogo.jpg";
import profileImg from "../../assets/profile-icon.png";
import settingsIcon from "../../assets/settings-icon.png";
import logoutIcon from "../../assets/logout-icon.png";
import cartIcon from "../../assets/cart-icon.png";
import "../../style/header.css";

const Header = () => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const navigate = useNavigate();
    const dropdownRef = useRef(null); // Tạo ref để tham chiếu đến dropdown

    // Đóng dropdown khi nhấp ra ngoài
    useEffect(() => {
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

    return (
        <header className="header">
            <div className="logo">
                <img src={logo} alt="Go Tour" />
                <span className="fw-bold" style={{ cursor: "pointer" }} onClick={() => navigate("/")}>
                    GO TOUR
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
                    <ul className="profile-dropdown" ref={dropdownRef}>
                        <li>
                            <img src={profileImg} alt="Thông tin cá nhân" />
                            Thông tin cá nhân
                        </li>
                        <li onClick={() => navigate("/customize-tour")}>
                            <img src={settingsIcon} alt="Tùy chọn Tour" />
                            Tùy chọn Tour
                        </li>
                        <li onClick={() => navigate("/customize-tour-saved")}>
                            <img src={cartIcon} alt="Tour đã lưu" />
                            Tour đã lưu
                        </li>
                        <li>
                            <img src={logoutIcon} alt="Đăng xuất" />
                            Đăng xuất
                        </li>
                    </ul>
                )}
            </div>
        </header>
    );
};

export default Header;