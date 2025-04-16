import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../../style/blogdetail.css"; 
import Header from "./header";
import { blogsData } from "./data/blogsData";

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
            <p className="blog-content">{blog.description}</p>
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