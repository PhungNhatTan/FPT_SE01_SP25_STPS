import React, { useState } from "react";
import logo from "../assets/weblogo.jpg";
import profileImg from "../assets/profile-icon.png";
import settingsIcon from "../assets/settings-icon.png";
import logoutIcon from "../assets/logout-icon.png";
import "./style/header.css";

const Header = () => {
    const [dropdownOpen, setDropdownOpen] = useState(false);

    return (
        <header className="header">
            {/* Logo */}
            <div className="logo">
                <img src={logo} alt="Go Tour" />
                <span className="fw-bold">GO TOUR</span>
            </div>

            {/* Profile */}
            <div className="profile-menu">
                <button
                    className="profile-button"
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                >
                    <img src={profileImg} alt="Profile" />
                </button>

                {dropdownOpen && (
                    <ul className="profile-dropdown">
                        <li>
                            <img src={profileImg} alt="Thông tin cá nhân" />
                            <span>Thông tin cá nhân</span>
                        </li>
                        <li>
                            <img src={settingsIcon} alt="Tùy chọn Tour" />
                            <span>Tùy chọn Tour</span>
                        </li>
                        <li>
                            <img src={logoutIcon} alt="Đăng xuất" />
                            <span>Đăng xuất</span>
                        </li>
                    </ul>
                )}
            </div>
        </header>
    );
};

export default Header;
