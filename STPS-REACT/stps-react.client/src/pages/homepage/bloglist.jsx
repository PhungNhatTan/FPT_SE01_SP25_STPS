import React from "react";
import { Link } from "react-router-dom";
import "../../style/bloglist.css"; // Đảm bảo đường dẫn đúng
import Header from "./header";
<<<<<<< HEAD
import { blogsData } from "./data/blogsData";
=======
import hanoi from "../../assets/hanoi.jpg";
import hue from "../../assets/hue.jpg";

const blogData = [
    { id: "1", image: hanoi, title: "Khám Phá Hà Nội – Thành phố của tình yêu", description: "Hà Nội là một điểm đến tuyệt vời với hồ Gươm, phố cổ, và ẩm thực phong phú..." },
    { id: "2", image: hue, title: "Khám Phá Huế – Thành phố di sản", description: "Huế có nét đẹp cổ kính với lăng tẩm, chùa Thiên Mụ, và các món ăn đặc sản..." },
    { id: "3", image: hue, title: "Khám Phá Sapa – Đỉnh Fansipan", description: "Sapa nổi tiếng với khí hậu mát mẻ, cảnh đẹp thiên nhiên và nền văn hóa phong phú..." },
    { id: "4", image: hanoi, title: "Khám Phá Đà Nẵng – Thành phố của ánh sáng", description: "Đà Nẵng nổi bật với bãi biển xinh đẹp, Bà Nà Hills và các cây cầu nổi tiếng..." },
    { id: "5", image: hanoi, title: "Khám Phá Hà Nội – Thành phố của tình yêu", description: "Hà Nội là một điểm đến tuyệt vời với hồ Gươm, phố cổ, và ẩm thực phong phú..." },
    { id: "6", image: hue, title: "Khám Phá Huế – Thành phố di sản", description: "Huế có nét đẹp cổ kính với lăng tẩm, chùa Thiên Mụ, và các món ăn đặc sản..." },
    { id: "7", image: hue, title: "Khám Phá Sapa – Đỉnh Fansipan", description: "Sapa nổi tiếng với khí hậu mát mẻ, cảnh đẹp thiên nhiên và nền văn hóa phong phú..." },
    { id: "8", image: hanoi, title: "Khám Phá Đà Nẵng – Thành phố của ánh sáng", description: "Đà Nẵng nổi bật với bãi biển xinh đẹp, Bà Nà Hills và các cây cầu nổi tiếng..." },
    { id: "9", image: hanoi, title: "Khám Phá Hà Nội – Thành phố của tình yêu", description: "Hà Nội là một điểm đến tuyệt vời với hồ Gươm, phố cổ, và ẩm thực phong phú..." },
    { id: "10", image: hue, title: "Khám Phá Huế – Thành phố di sản", description: "Huế có nét đẹp cổ kính với lăng tẩm, chùa Thiên Mụ, và các món ăn đặc sản..." },
    // Thêm các bài viết khác ở đây
];
>>>>>>> 42250ed1b2d0a2c032506d1745bc3dbfcb675190

const BlogList = () => {
    return (
        <div className="blog-list">
            <header className="header">
                <Header />
            </header>
            
            <h1 className="blog-list-title">Các Bài Viết Mới</h1>
            <div className="blog-items">
<<<<<<< HEAD
                {blogsData.map((blog) => (
=======
                {blogData.map((blog) => (
>>>>>>> 42250ed1b2d0a2c032506d1745bc3dbfcb675190
                    <div key={blog.id} className="blog-item">
                        <Link to={`/blog/${blog.id}`}>
                            <img src={blog.image} alt={blog.title} className="blog-image" />
                            <h3 className="blog-title">{blog.title}</h3>
                            <p className="blog-description">{blog.description}</p>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default BlogList;
