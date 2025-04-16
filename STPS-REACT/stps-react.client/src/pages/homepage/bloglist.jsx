import React from "react";
import { Link } from "react-router-dom";
import "../../style/bloglist.css"; // Đảm bảo đường dẫn đúng
import Header from "./header";
import { blogsData } from "./data/blogsData";

const BlogList = () => {
    return (
        <div className="blog-list">
            <header className="header">
                <Header />
            </header>
            
            <h1 className="blog-list-title">Các Bài Viết Mới</h1>
            <div className="blog-items">
                {blogsData.map((blog) => (
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
