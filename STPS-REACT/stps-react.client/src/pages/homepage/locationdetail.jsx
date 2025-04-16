import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../../style/blogdetail.css"; 
import Header from "./header";
import { locData } from "./data/locData"; // import dữ liệu địa điểm

const LocationDetail = () => {
    const { locId } = useParams();  // Lấy locId từ URL (chuỗi)
    const navigate = useNavigate();

    // Chuyển locId thành chuỗi và so sánh với item.id trong locData (cũng là chuỗi)
    const location = locData.find((item) => item.id === locId);  // So sánh với locId là chuỗi

    if (!location) {
        return (
            <div className="container">
                <header className="header">
                    <Header />
                </header>
                <h2 className="error-message">🚫 Địa điểm không tồn tại!</h2>
                <button className="back-btn" onClick={() => navigate("/")}>🏠 Về trang chủ</button>
            </div>
        );
    }

    return (
        <div>
            <header className="header">
                <Header />
            </header>

            <h1 className="blog-title"><strong>{location.name}</strong></h1>
            <img src={location.image} alt={location.name} className="blog-image" />
            <p className="blog-content">{location.description}</p>
            <h2 className="related-title"><strong>Các địa điểm khác</strong></h2>
            <div className="related-blogs">
                {locData.slice(0, 8).map((item) => (
                    <div key={item.id} className="related-item" onClick={() => navigate(`/location/${item.id}`)}>
                        <img src={item.image} alt={item.name} className="related-image" />
                        <h3 className="related-title">{item.name}</h3>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default LocationDetail;
