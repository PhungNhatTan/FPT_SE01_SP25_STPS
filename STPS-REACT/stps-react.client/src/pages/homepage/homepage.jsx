import React from "react";
import { Link } from "react-router-dom";
import "./style/homepage.css";
import logo from "../assets/weblogo.jpg";
import profileImg from "../assets/profileImg.png";
import banner from "../assets/banner.jpg";
import hanoi from "../assets/hanoi.jpg";
import promotion from "../assets/promotion.jpg";
import profileIcon from "../assets/profile-icon.png";
import settingsIcon from "../assets/settings-icon.png";
import logoutIcon from "../assets/logout-icon.png";



const SearchBox = () => {
    return (
        <div className="search-box">
            <input className="search-input full-width" type="text" placeholder="Nhập điểm đến" />
            <div className="search-fields">
                <div className="search-item">
                    <span>📅</span>
                    <input type="date" />
                </div>
                <div className="search-item">
                    <span>📅</span>
                    <input type="date" />
                </div>
                <div className="search-item">
                    <span>👥</span>
                    <input type="text" value="5 người lớn, 1 trẻ em" />
                </div>
            </div>
            <button className="search-button">TÌM KIẾM</button>
        </div>
    );
};

const Homepage = () => {
    return (
        <div>
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
            <br></br>
            <section className="background">
                <img src={banner} alt="Gotour Background" />
                <div className="background-overlay">
                    <SearchBox />
                </div>
            </section>
            <br></br>
            <section className="tours">
                <h2 style={{ color: "black" }}>Danh sách Tour nổi bật</h2>
                <button onClick={() => ("/tourlist")}>
                    Xem thêm
                </button>
                <div className="tour-list">
                    {["Hanoi", "Hue", "Da Nang", "Nha Trang", "Ho Chi Minh City"].map(
                        (city) => (
                            <div style={{ color: "black" }} className="tour-item" key={city}>
                                <img src={hanoi} alt={city} />
                                <p>{city}</p>
                            </div>
                        )
                    )}
                </div>
            </section>

            <section className="promo">
                <h2 style={{ color: "black" }}>Khuyến mãi</h2><button onClick={() => ("/tourlist")}>
                    Xem thêm
                </button>
                <div className="promo-list">
                    <img src={promotion} alt="Coming Soon" />
                    <img src={promotion} alt="Coming Soon" />
                    <img src={promotion} alt="Coming Soon" />
                    <img src={promotion} alt="Coming Soon" />
                </div>
            </section>

            <section className="blogs">
                <h2 style={{ color: "black" }}>Blogs</h2>
                <button onClick={() => ("/tourlist")}>Xem thêm</button>
                <div className="blog-list">
                    {[1, 2, 3, 4].map((id) => (
                        <div className="blog-item" key={id}>
                            <Link to={`/blog/${id}`}>
                                <img src={hanoi} alt={`Blog ${id}`} />
                            </Link>
                            <h3 style={{ color: "black" }}>Du lịch Hà Nội {id}</h3>
                            <p style={{ color: "black" }}>Blog content</p>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default Homepage;
