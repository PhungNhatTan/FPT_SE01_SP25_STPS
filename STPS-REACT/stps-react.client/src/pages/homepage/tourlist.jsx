import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../style/tourlist.css";
import Header from "./header";
import { TourServices } from "../../services/TourSevices";
import TOUR_DEFAULT_IMAGE from "../../assets/images/tour_default.jpg";
import {getFullImageUrl} from "../../utils/ImageHelper";

const TourList = () => {
    const navigate = useNavigate();
    const [adults, setAdults] = useState(1);
    const [children, setChildren] = useState(0);
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(10000000);
    const [duration, setDuration] = useState("");

    const [selectedRegions, setSelectedRegions] = useState([]);
    const [selectedTypes, setSelectedTypes] = useState([]);
    const [sortOrder, setSortOrder] = useState(null);

    const [tours, setTours] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const tourService = new TourServices();
    const dropdownRef = useRef(null);

    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setIsOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        fetchTours();
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const fetchTours = async () => {
        setLoading(true);
        setError("");
        try {
            const response = await tourService.getAllTours();
            if (response.data && response.data.success) {
                setTours(response.data.data || []);
            } else {
                setError("Không thể tải danh sách tour");
            }
        } catch (err) {
            console.error("Lỗi khi tải danh sách tour:", err);
            setError("Không thể tải danh sách tour");
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = async () => {
        setLoading(true);
        setError("");
        try {
            const searchParams = {
                destination: searchTerm,
                minPrice: minPrice || null,
                maxPrice: maxPrice || null,
                duration: duration ? parseInt(duration) : null
            };

            const response = await tourService.searchTours(searchParams);
            if (response.data && response.data.success) {
                setTours(response.data.data || []);
            } else {
                setError("Không tìm thấy tour phù hợp");
            }
        } catch (err) {
            console.error("Lỗi khi tìm kiếm tour:", err);
            setError("Lỗi khi tìm kiếm tour");
        } finally {
            setLoading(false);
        }
    };

    const handleRegionChange = (e) => {
        const value = e.target.value;
        setSelectedRegions(prev =>
            e.target.checked ? [...prev, value] : prev.filter(r => r !== value)
        );
    };

    const handleTypeChange = (e) => {
        const value = e.target.value;
        setSelectedTypes(prev =>
            e.target.checked ? [...prev, value] : prev.filter(t => t !== value)
        );
    };

    const handleSort = (order) => {
        setSortOrder(order);

        // Sắp xếp danh sách tour theo giá
        const sortedTours = [...tours];
        if (order === "asc") {
            sortedTours.sort((a, b) => a.adultPrice - b.adultPrice);
        } else if (order === "desc") {
            sortedTours.sort((a, b) => b.adultPrice - a.adultPrice);
        }
        setTours(sortedTours);
    };

    // Lọc dữ liệu tour theo loại và khu vực (client-side filtering)
    const filteredTours = tours.filter(tour => {
        // Thêm logic lọc theo loại và khu vực nếu cần
        // Hiện tại chỉ hiển thị tất cả tour từ API
        return true;
    });

    return (
        <div className="container-fluid">
            <header className="header">
                <Header />
            </header>

            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <div className="search-bar">
                            <input
                                type="text"
                                className="form-control search-input"
                                placeholder="Địa điểm"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                            <input
                                type="number"
                                className="form-control search-input"
                                placeholder="Số ngày"
                                value={duration}
                                onChange={(e) => setDuration(e.target.value)}
                            />
                            <div className="search-input-group">
                                <div className="position-relative w-100" ref={dropdownRef}>
                                    <button className="form-control text-start w-100" onClick={() => setIsOpen(!isOpen)}>
                                        {adults} người lớn, {children} trẻ em
                                    </button>
                                    {isOpen && (
                                        <div className="dropdown-menu show p-3" style={{ width: "100%" }}>
                                            <div className="d-flex justify-content-between align-items-center mb-2">
                                                <span>Người lớn</span>
                                                <div>
                                                    <button className="btn btn-outline-secondary btn-sm"
                                                        onClick={() => setAdults(Math.max(1, adults - 1))}>-</button>
                                                    <span className="mx-2">{adults}</span>
                                                    <button className="btn btn-outline-secondary btn-sm"
                                                        onClick={() => setAdults(adults + 1)}>+</button>
                                                </div>
                                            </div>
                                            <div className="d-flex justify-content-between align-items-center">
                                                <span>Trẻ em</span>
                                                <div>
                                                    <button className="btn btn-outline-secondary btn-sm"
                                                        onClick={() => setChildren(Math.max(0, children - 1))}>-</button>
                                                    <span className="mx-2">{children}</span>
                                                    <button className="btn btn-outline-secondary btn-sm"
                                                        onClick={() => setChildren(children + 1)}>+</button>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                            <button className="btn btn-primary" onClick={handleSearch}>Tìm kiếm</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="row mt-3">
                <div className="col-md-3">
                    <h5>Giá tiền</h5>
                    <div className="budget-filter d-flex mb-3">
                        <input
                            type="number"
                            className="form-control me-2"
                            placeholder="Min"
                            value={minPrice}
                            onChange={(e) => setMinPrice(Math.max(0, e.target.value))}
                        />
                        <input
                            type="number"
                            className="form-control"
                            placeholder="Max"
                            step={100000}
                            value={maxPrice}
                            onChange={(e) => setMaxPrice(Number(e.target.value))}
                        />
                    </div>

                    <div className="filter-section">
                        <h5>Khu vực</h5>
                        <label>
                            <input type="checkbox" value="Miền Bắc" onChange={handleRegionChange} /> Miền Bắc<br />
                        </label>
                        <label>
                            <input type="checkbox" value="Miền Trung" onChange={handleRegionChange} /> Miền Trung<br />
                        </label>
                        <label>
                            <input type="checkbox" value="Miền Nam" onChange={handleRegionChange} /> Miền Nam<br />
                        </label>
                    </div>

                    <div className="filter-section">
                        <h5>Loại hình điểm đến</h5>
                        <label>
                            <input type="checkbox" value="Biển" onChange={handleTypeChange} /> Biển<br />
                        </label>
                        <label>
                            <input type="checkbox" value="Núi" onChange={handleTypeChange} /> Núi<br />
                        </label>
                        <label>
                            <input type="checkbox" value="Sông" onChange={handleTypeChange} /> Sông<br />
                        </label>
                        <label>
                            <input type="checkbox" value="Đồng bằng" onChange={handleTypeChange} /> Đồng bằng<br />
                        </label>
                    </div>
                </div>

                <div className="col-md-9">
                    <div className="d-flex justify-content-between align-items-center mb-3">
                        <h4>Sắp xếp</h4>
                        <div>
                            <button className="btn btn-outline-dark mx-1" onClick={() => handleSort(null)}>Phù hợp nhất</button>
                            <button className="btn btn-outline-dark mx-1" onClick={() => handleSort("desc")}>Giá cao nhất</button>
                            <button className="btn btn-outline-dark mx-1" onClick={() => handleSort("asc")}>Giá thấp nhất</button>
                            <button className="btn btn-outline-dark mx-1">Được đánh giá nhiều nhất</button>
                            <button className="btn btn-danger mx-1">Khuyến mại</button>
                        </div>
                    </div>

                    {loading ? (
                        <div className="text-center my-5">
                            <div className="spinner-border text-primary" role="status">
                                <span className="visually-hidden">Đang tải...</span>
                            </div>
                            <p className="mt-2">Đang tải danh sách tour...</p>
                        </div>
                    ) : error ? (
                        <div className="alert alert-danger" role="alert">
                            {error}
                        </div>
                    ) : filteredTours.length > 0 ? (
                        filteredTours.map((tour) => (
                            <div key={tour.tourId} className="card mb-3 tour-card">
                                <div className="row g-0">
                                    <div className="col-md-4">
                                        <img
                                            src={getFullImageUrl(tour.primaryImageUrl) || TOUR_DEFAULT_IMAGE}
                                            className="img-fluid tour-image"
                                            alt={tour.tourName}
                                            style={{ height: "200px", objectFit: "cover", width: "100%" }}
                                        />
                                    </div>
                                    <div className="col-md-8">
                                        <div className="card-body">
                                            <h5 className="card-title"><strong>{tour.tourName}</strong></h5>
                                            <p className="card-text"><i className="bi bi-geo-alt-fill"></i> {tour.description?.substring(0, 100)}...</p>
                                            <p className="card-text">Thời gian: {tour.duration} ngày</p>
                                            <p className="card-text">Phương tiện: {tour.transportation}</p>
                                            <p className="card-text">Giá vé người lớn: {tour.adultPrice?.toLocaleString()} VND</p>
                                            <p className="card-text">Giá vé trẻ em: {tour.childPrice?.toLocaleString()} VND</p>
                                            <button className="btn btn-primary" onClick={() => navigate(`/tour/${tour.tourId}`)}>Xem thêm</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-center text-muted my-5">Không có tour phù hợp.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default TourList;
