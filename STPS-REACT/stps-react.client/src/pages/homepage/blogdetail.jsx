import React from "react";
import "./style/BlogDetail.css";
import img from "../assets/Hanoi.jpg"
import hanoi from "../assets/hanoi.jpg";

const BlogDetail = () => {
    return (
        <div className="container">
            <h1>Khám Phá Paris – Thành phố của tình yêu</h1>
            <img
                src={img}
                alt="Paris"
                className="blog-image"
            />
            <p>
                content
            </p>
            <p>
                content
            </p>
            <a href="/home/homepage.jsx" className="back-btn">
                ⬅ Quay lại
            </a>

            <section className="blogs">
                <h2 style={{ color: "black" }}>Blogs</h2>
                <button>
                    Xem thêm
                </button>
                <div className="blog-list">
                    <div className="blog-item">
                        <img src={hanoi} alt="Blog 1" />
                        <h3 style={{ color: "black" }}>Du lịch Hà Nội</h3>
                        <p style={{ color: "black" }}>Blog content</p>
                    </div>
                    <div className="blog-item">
                        <img src={hanoi} alt="Blog 1" />
                        <h3 style={{ color: "black" }}>Du lịch Hà Nội</h3>
                        <p style={{ color: "black" }}>Blog content</p>
                    </div>
                    <div className="blog-item">
                        <img src={hanoi} alt="Blog 2" />
                        <h3 style={{ color: "black" }}>Du lịch Hà Nội</h3>
                        <p style={{ color: "black" }}>Blog content</p>
                    </div>
                    <div className="blog-item">
                        <img src={hanoi} alt="Blog 3" />
                        <h3 style={{ color: "black" }}>Du lịch Hà Nội</h3>
                        <p style={{ color: "black" }}>Blog content</p>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default BlogDetail;
