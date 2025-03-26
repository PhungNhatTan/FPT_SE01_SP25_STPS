import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../style/homepage.css";
import logo from "../../assets/weblogo.jpg";
import profileImg from "../../assets/profileImg.png";
import banner from "../../assets/banner.jpg";
import hanoi from "../../assets/hanoi.jpg";
import hue from "../../assets/Hue.jpg";
import promotion from "../../assets/promotion.jpg";
import profileIcon from "../../assets/profile-icon.png";
import settingsIcon from "../../assets/settings-icon.png";
import logoutIcon from "../../assets/logout-icon.png";
import Header from "./header";

const blogsData = [
    {
        id: "1",
        title: "Khám Phá Hà Nội – Thành phố của tình yêu",
        image: hanoi,
        content: "Hà Nội là một điểm đến tuyệt vời với hồ Gươm, phố cổ...",
    },
    {
        id: "2",
        title: "Khám Phá Huế – Thành phố di sản",
        image: hue,
        content: "Huế có nét đẹp cổ kính với lăng tẩm, chùa Thiên Mụ...",
    },
    {
        id: "3",
        title: "Khám Phá Huế – Thành phố di sản",
        image: hue,
        content: "Huế có nét đẹp cổ kính với lăng tẩm, chùa Thiên Mụ...",
    },
    {
        id: "4",
        title: "Khám Phá Huế – Thành phố di sản",
        image: hue,
        content: "Huế có nét đẹp cổ kính với lăng tẩm, chùa Thiên Mụ...",
    }
];

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
    const navigate = useNavigate();
    return (
        <div>
            <header className="header">
                <Header />
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
                <button onClick={() => navigate("/tourlist")}>
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
                <div className="blogs-header">
                    <h2>Blogs</h2>
                    <button onClick={() => navigate("/blogs")}>Xem thêm</button>
                </div>

                <div className="blog-list">
                    {blogsData.map((blog) => (
                        <div className="blog-item" key={blog.id}>
                            <Link to={`/blog/${blog.id}`}>
                                <img src={blog.image} alt={blog.title} />
                            </Link>
                            <h3 style={{ color: "black" }}>{blog.title}</h3>
                            <p style={{ color: "black" }}>{blog.content.substring(0, 50)}...</p>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default Homepage;
