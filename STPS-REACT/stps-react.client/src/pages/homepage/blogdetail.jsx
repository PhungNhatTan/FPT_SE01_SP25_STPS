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
        content: "Hà Nội là một điểm đến tuyệt vời với hồ Gươm, phố cổ...",
    },
    {
        id: "2",
        title: "Khám Phá Huế – Thành phố di sản",
        image: hue,
        content: "Huế có nét đẹp cổ kính với lăng tẩm, chùa Thiên Mụ...",
    }
];

const BlogDetail = () => {
    const { blogId } = useParams();
    const navigate = useNavigate();

    console.log("Blog ID từ URL:", blogId);

    // So sánh với ID đã được ép kiểu
    const blog = blogsData.find(item => item.id === blogId);
    
    console.log("Blog tìm thấy:", blog);

    if (!blog) {
        return (
            <div className="container">
                <header className="header">
                    <Header />
                </header>
                <h2 style={{ color: "red", textAlign: "center" }}>🚫 Bài viết không tồn tại!</h2>
                <button className="back-btn" onClick={() => navigate("/")}>🏠 Về trang chủ</button>
            </div>
        );
    }

    return (
        <div className="container">
            <header className="header">
                <Header />
            </header>

            <h1>{blog.title}</h1>
            <img src={blog.image} alt={blog.title} className="blog-image" />
            <p>{blog.content}</p>

            <button className="back-btn" onClick={() => navigate(-1)}>⬅ Quay lại</button>
        </div>
    );
};

export default BlogDetail;
