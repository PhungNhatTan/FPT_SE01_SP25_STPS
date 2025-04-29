import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../../style/locationlist.css"; // Đảm bảo đường dẫn đúng
import Header from "./header";
import { locData } from "./data/locData";

const LocationList = () => {
    const [searchQuery, setSearchQuery] = useState("");  // State để lưu giá trị tìm kiếm

    // Hàm xử lý thay đổi trong ô tìm kiếm
    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    // Lọc danh sách địa điểm theo tên địa điểm
    const filteredLocations = locData.filter(location =>
        location.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="location-list">
            <header className="header">
                <Header />
            </header>

            {/* Ô tìm kiếm */}
            <div className="search-box">
                <input
                    type="text"
                    placeholder="Tìm kiếm địa điểm..."
                    value={searchQuery}
                    onChange={handleSearchChange}
                    className="search-input"
                />
            </div>

            {/* Hiển thị các địa điểm đã lọc */}
            {filteredLocations.map(location => (
                <div key={location.id} className="location-item">
                    <img src={location.image} alt={location.name} className="location-image" />
                    <div className="location-content">
                        <h3 className="location-title">{location.name}</h3>
                        <p className="location-description">{location.description}</p>
                        <p className="location-price">Giá vé người lớn: {location.priceAdult}</p>
                        <p className="location-price">Giá vé trẻ em: {location.priceChild}</p>
                        <Link to={`/location/${location.id}`} className="view-more-button">Xem thêm</Link>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default LocationList;
