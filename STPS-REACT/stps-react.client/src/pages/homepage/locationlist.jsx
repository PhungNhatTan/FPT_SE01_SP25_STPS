import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../../style/locationlist.css";
import Header from "./header";
import { DesnitionService } from "../../services/DesnitionService";
import DESTINATION_DEFAULT_IMAGE from "../../assets/images/des_default.jpeg";

const LocationList = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [destinations, setDestinations] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const destinationService = new DesnitionService();

    useEffect(() => {
        fetchDestinations();
    }, []);

    const fetchDestinations = async () => {
        setLoading(true);
        setError("");
        try {
            const response = await destinationService.findAll();
            if (response.data && response.data.success) {
                setDestinations(response.data.data || []);
            } else {
                setError("Không thể tải danh sách địa điểm");
            }
        } catch (err) {
            console.error("Lỗi khi tải danh sách địa điểm:", err);
            setError("Không thể tải danh sách địa điểm");
        } finally {
            setLoading(false);
        }
    };

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleSearch = async () => {
        if (!searchQuery.trim()) {
            fetchDestinations();
            return;
        }

        setLoading(true);
        setError("");
        try {
            const response = await destinationService.searchDestinations(searchQuery);
            if (response.data && response.data.success) {
                setDestinations(response.data.data || []);
                if (response.data.data.length === 0) {
                    setError("Không tìm thấy địa điểm phù hợp");
                }
            } else {
                setError("Không thể tìm kiếm địa điểm");
            }
        } catch (err) {
            console.error("Lỗi khi tìm kiếm địa điểm:", err);
            setError("Lỗi khi tìm kiếm địa điểm");
        } finally {
            setLoading(false);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    return (
        <div className="location-list">
            <header className="header">
                <Header />
            </header>

            <div className="location-list-container">
                <h2 className="page-title">Danh sách địa điểm du lịch</h2>

                {/* Ô tìm kiếm */}
                <div className="search-box">
                    <input
                        type="text"
                        placeholder="Tìm kiếm địa điểm..."
                        value={searchQuery}
                        onChange={handleSearchChange}
                        onKeyPress={handleKeyPress}
                        className="search-input"
                    />
                    <button onClick={handleSearch} className="search-button">Tìm kiếm</button>
                </div>

                {/* Hiển thị trạng thái loading */}
                {loading && (
                    <div className="loading-container">
                        <div className="spinner"></div>
                        <p>Đang tải dữ liệu...</p>
                    </div>
                )}

                {/* Hiển thị thông báo lỗi */}
                {error && !loading && (
                    <div className="error-message">
                        <p>{error}</p>
                    </div>
                )}

                {/* Hiển thị các địa điểm */}
                <div className="location-items-container">
                    {!loading && !error && destinations.map(destination => (
                        <div key={destination.destinationId} className="location-item">
                            <img
                                src={destination.imageCover || DESTINATION_DEFAULT_IMAGE}
                                alt={destination.destinationName}
                                className="location-image"
                                onError={(e) => {
                                    e.target.onerror = null;
                                    e.target.src = DESTINATION_DEFAULT_IMAGE;
                                }}
                            />
                            <div className="location-content">
                                <h3 className="location-title">{destination.destinationName}</h3>
                                <p className="location-description">{destination.description}</p>
                                <p className="location-city">Thành phố: {destination.cityName}</p>
                                <Link to={`/location/${destination.destinationId}`} className="view-more-button">Xem thêm</Link>
                            </div>
                        </div>
                    ))}

                    {/* Hiển thị thông báo khi không có địa điểm nào */}
                    {!loading && !error && destinations.length === 0 && (
                        <div className="no-results">
                            <p>Không có địa điểm nào được tìm thấy.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default LocationList;
