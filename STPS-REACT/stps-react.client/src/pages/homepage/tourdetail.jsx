import React from "react";
import "./style/tourdetail.css";
import logo from "../assets/weblogo.jpg";
import profileImg from "../assets/profileImg.png";
import profileIcon from "../assets/profile-icon.png";
import settingsIcon from "../assets/settings-icon.png";
import logoutIcon from "../assets/logout-icon.png";

const TourDetail = () => {
    return (
        <div>
            {/* Header */}
            <header className="header">
                <div className="logo">
                    <img src={logo} alt="Go Tour" />
                    <span style={{ color: "black" }}>GO TOUR</span>
                </div>
                <div className="profile-menu" style={{ position: "absolute", zIndex: "1000" }}>
                    <button className="profile-button">
                        <img src={profileImg} alt="Profile" />
                    </button>
                    <ul className="profile-dropdown">
                        <li style={{ color: "black" }}>
                            <img src={profileIcon} alt="Thông tin cá nhân" />
                            Thông tin cá nhân
                        </li>
                        <li style={{ color: "black" }}>
                            <img src={settingsIcon} alt="Tùy chọn Tour" />
                            Tùy chọn Tour
                        </li>
                        <li style={{ color: "black" }}>
                            <img src={logoutIcon} alt="Đăng xuất" />
                            Đăng xuất
                        </li>
                    </ul>
                </div>
            </header>

            {/* Showcase */}
            <section className="showcase">
            </section>
            <h1>Tour Tham quan Hà Nội</h1>
            {/* Nội dung */}
            <div className="container">
                <section className="content">
                    <h2>Giới thiệu</h2>
                    <p>Content giới thiệu Tour</p>

                    <h2>Thông tin tour</h2>
                        <a>
                            <strong>Thời gian:</strong> 3 Ngày 2 Đêm
                        </a><br></br>
                        <a>
                            <strong>Phương tiện:</strong> Xe du lịch
                    </a><br></br>
                        <a>
                            <strong>Giá:</strong> 4.990.000 VND
                    </a><br></br>

                    <h2>Điểm nổi bật</h2>
                    <ul style={{ color: "black" } }>
                        <li>Tham quan Lăng Chủ tịch Hồ Chí Minh</li>
                        <li>Tham quan cột cờ Hà Nội</li>
                        <li>Tham quan Hồ Gươm</li>
                        <li>Tham quan Quốc Tử Giám</li>
                        <li>Trải nghiệm phố cổ Hà Nội</li>
                    </ul>
                </section>
            </div>

            {/* Chương trình tour */}
            <div className="container">
                <section className="tour-program">
                    <h2>Chương trình tour</h2>
                    <div className="day">
                        <h3>Ngày 1: Khởi hành - Paris (Pháp)</h3>
                        <p>Quý khách tập trung tại sân bay để làm thủ tục bay đến Paris.</p>
                    </div>
                    <div className="day">
                        <h3>Ngày 2: Tham quan Paris</h3>
                        <p>
                            Tham quan Tháp Eiffel, Khải Hoàn Môn, Nhà thờ Đức Bà, Bảo tàng
                            Louvre và dòng sông Seine thơ mộng.
                        </p>
                    </div>
                    <div className="day">
                        <h3>Ngày 3: Paris - Luxembourg</h3>
                        <p>Di chuyển đến Luxembourg, khám phá Quảng trường D’Armes.</p>
                    </div>

                    {/* Nút đặt vé */}
                    <a href="/BookTicket">
                        <button className="booking-btn">Đặt vé ngay</button>
                    </a>
                </section>
            </div>
        </div>
    );
};

export default TourDetail;
