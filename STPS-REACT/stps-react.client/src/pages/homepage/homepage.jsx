import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../style/homepage.css";
import banner from "../../assets/banner.jpg";
import hanoi from "../../assets/hanoi.jpg";
import hue from "../../assets/Hue.jpg";
import bana from "../../assets/banahills.jpg";
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
    },
    {
        id: "5",
        title: "Khám Phá Huế – Thành phố di sản",
        image: hue,
        content: "Huế có nét đẹp cổ kính với lăng tẩm, chùa Thiên Mụ...",
    }
];

const tourData = [
    { id: 1, name: "Hà Nội", image: hanoi },
    { id: 2, name: "Huế", image: hue },
    { id: 3, name: "Đà Nẵng", image: hanoi },
    { id: 4, name: "Nha Trang", image: hanoi },
    { id: 5, name: "Thành phố Hồ Chí Minh", image: hanoi },
    { id: 6, name: "Thành phố Hồ Chí Minh", image: hanoi },
    { id: 7, name: "Thành phố Hồ Chí Minh", image: hanoi },
];

const locData = [
    { id: 1, image: bana, name: "Bà Nà Hills" },
    { id: 2, image: bana, name: "Bà Nà Hills" },
    { id: 3, image: bana, name: "Bà Nà Hills" },
    { id: 4, image: bana, name: "Bà Nà Hills" },
    { id: 5, image: bana, name: "Bà Nà Hills" },
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
            <section className="background">
                <img src={banner} alt="Gotour Background" />
                <div className="background-overlay">
                    <SearchBox />
                </div>
            </section>
            <br />

            {/* Danh sách Tour nổi bật */}
            <section className="tours">
                <div className="list-header">
                    <h2 style={{ color: "black" }}>Danh sách Tour nổi bật</h2>
                    <button className="btn btn-primary" onClick={() => navigate("/tourlist")}>
                        Xem thêm
                    </button>
                </div>
                <div className="blog-list tour-list">
                    {tourData.slice(0, 6).map(tour => (
                        <div className="blog-item tour-item" key={tour.id}>
                            <Link to={`/tour/${tour.id}`}>
                                <img src={tour.image} alt={tour.name} />
                            </Link>
                            <h3 style={{ color: "black" }}>{tour.name}</h3>
                        </div>
                    ))}
                </div>
            </section>

            {/* Địa điểm */}
            <section className="promo">
                <div className="list-header">
                    <h2 style={{ color: "black" }}>Danh sách Địa điểm du lịch</h2>
                    <button className="btn btn-primary" onClick={() => navigate("/locationlist")}>
                        Xem thêm
                    </button>
                </div>
                <div className="blog-list promo-list">
                    {locData.map(location => ( // Chỉ hiển thị 4 địa điểm
                        <div className="blog-item" key={location.id}>
                            <Link to={`/location/${location.id}`}>
                                <img src={location.image} alt="Khuyến mãi" />
                            </Link>
                            <p style={{ color: "black" }}>{location.name}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Blogs */}
            <section className="blogs">
                <div className="list-header">
                    <h2>Blogs</h2>
                    <button className="btn btn-primary" onClick={() => navigate("/bloglist")}>
                        Xem thêm
                    </button>
                </div>
                <div className="blog-list">
                    {blogsData.map(blog => (
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