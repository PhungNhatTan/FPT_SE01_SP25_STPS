import React from "react";
import { Link } from "react-router-dom";
import "../../style/locationlist.css"; // Đảm bảo đường dẫn đúng
import Header from "./header";
import bana from "../../assets/banahills.jpg";

const locData = [
    { id: "1", image: bana, name: "Bà Nà Hills", description: "Mô tả về Bà Nà Hills.", priceAdult: "10.000.000", priceChild: "5.000.000" },
    { id: "2", image: bana, name: "Địa điểm 2", description: "Mô tả về Địa điểm 2.", priceAdult: "8.000.000", priceChild: "4.000.000" },
    // Thêm các địa điểm khác
];

const LocationList = () => {
    return (
        <div className="location-list">
            <header className="header">
                    <Header />
                </header>
            {locData.map(location => (
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