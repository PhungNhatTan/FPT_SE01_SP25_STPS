import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../../style/blogdetail.css"; 
import Header from "./header";
import hanoi from "../../assets/hanoi.jpg";
import hue from "../../assets/hue.jpg";

const blogsData = [
    {
        id: "1",
        title: "Khám Phá Hà Nội – Thành phố của tình yêu",
        image: hanoi,
        content: "Hà Nội là một điểm đến tuyệt vời với hồ Gươm, phố cổ, và ẩm thực phong phú...",
    },
    {
        id: "2",
        title: "Khám Phá Huế – Thành phố di sản",
        image: hue,
        content: "Huế có nét đẹp cổ kính với lăng tẩm, chùa Thiên Mụ, và các món ăn đặc sản...",
    },
    {
        id: "3",
        title: "Khám Phá Huế – Thành phố di sản",
        image: hue,
        content: "Huế có nét đẹp cổ kính với lăng tẩm, chùa Thiên Mụ, và các món ăn đặc sản...",
    },
    {
        id: "4",
        title: "Khám Phá Huế – Thành phố di sản",
        image: hue,
        content: "Huế có nét đẹp cổ kính với lăng tẩm, chùa Thiên Mụ, và các món ăn đặc sản...",
    }
];

const BlogDetail = () => {
    const { blogId } = useParams();
    const navigate = useNavigate();

    const blog = blogsData.find((item) => item.id === blogId);

    if (!blog) {
        return (
            <div className="container">
                <header className="header">
                    <Header />
                </header>
                <h2 className="error-message">🚫 Bài viết không tồn tại!</h2>
                <button className="back-btn" onClick={() => navigate("/")}>🏠 Về trang chủ</button>
            </div>
        );
    }

    return (
        <div>
            <header className="header">
                <Header />
            </header>

            <h1 className="blog-title"><strong>{blog.title}</strong></h1>
            <img src={blog.image} alt={blog.title} className="blog-image" />
            <p className="blog-content">{blog.content}</p>
            <h2 className="related-title"><strong>Các bài viết khác</strong></h2>
            <div className="related-blogs">
                {blogsData.map((item) => (
                    <div key={item.id} className="related-item" onClick={() => navigate(`/blog/${item.id}`)}>
                        <img src={item.image} alt={item.title} className="related-image" />
                        <h3 className="related-title">{item.title}</h3>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default BlogDetail;