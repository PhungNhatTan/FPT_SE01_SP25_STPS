import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../style/homepage.css";
import banner from "../../assets/banner.jpg";
import { tourData } from "./data/tourData";
import { blogsData } from "./data/blogsData";
import { locData } from "./data/locData";
import Header from "./header";

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
    const [blogs, blogsList] = useState([]);
    const [tours, toursList] = useState([]);
    const [locs, locsList] = useState([]);

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
                    {tourData.slice(0, 12).map(tour => (
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
                    {locData.slice(0, 10).map(location => (
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
                    {blogsData.slice(0, 10).map(blog => (
                        <div className="blog-item" key={blog.id}>
                            <Link to={`/blog/${blog.id}`}>
                                <img src={blog.image} alt={blog.title} />
                            </Link>
                            <h3 style={{ color: "black" }}>{blog.title}</h3>
                            <p style={{ color: "black" }}>
                                {blog.description?.substring(0, 50) || "No description available..."}...
                            </p>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default Homepage;
