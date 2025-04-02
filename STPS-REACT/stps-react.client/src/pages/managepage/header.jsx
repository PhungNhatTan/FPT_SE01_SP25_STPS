import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/weblogo.jpg";
import profileImg from "../../assets/profile-icon.png";
import settingsIcon from "../../assets/settings-icon.png";
import logoutIcon from "../../assets/logout-icon.png";
import "../../style/header.css";

const Header = () => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const navigate = useNavigate();
    return (
        <header className="header">
            <div className="logo">
                <img src={logo} alt="Go Tour" />
                <span className="fw-bold"  >
                    MANAGE PAGE for TOURISM COMPANY
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
