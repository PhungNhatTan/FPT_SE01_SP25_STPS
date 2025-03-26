import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../style/TourList.css";
import hanoi from "../../assets/hanoi.jpg";
import danang from "../../assets/Da Nang.jpg";
import Header from "./header";

const tours = [
    {
        id: 1,
        name: "TOUR HÀ NỘI",
        location: "Mô tả tour",
        price: "Giá: ",
        image: hanoi,
    },
    {
        id: 2,
        name: "TOUR ĐÀ NẴNG",
        location: "Mô tả tour",
        price: "Giá: ",
        image: danang,
    },
    {
        id: 3,
        name: "TOUR HÀ NỘI",
        location: "Mô tả tour",
        price: "Giá: ",
        image: hanoi,
    },
    {
        id: 4,
        name: "TOUR HÀ NỘI",
        location: "Mô tả tour",
        price: "Giá: ",
        image: hanoi,
    },
];

const TourList = () => {
    const navigate = useNavigate();
    const [adults, setAdults] = useState(1);
    const [children, setChildren] = useState(0);
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    // Đóng dropdown khi click bên ngoài
    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setIsOpen(false);
        }
    };

    React.useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);
    return (
        <div className="container-fluid">
            <header className="header">
                <Header />
            </header>
            {/* Thanh tìm kiếm */}
            <div className="search-bar d-flex justify-content-between align-items-center p-3">
                <input type="text" className="form-control search-input" placeholder="Da Nang" />
                <input type="date" className="form-control search-input" />
                <input type="date" className="form-control search-input" />
                <div className="search-input-group d-flex gap-2">
                    <div className="position-relative" ref={dropdownRef}>
                        {/* Nút hiển thị dropdown */}
                        <button className="form-control text-start" onClick={() => setIsOpen(!isOpen)}>
                            {adults} người lớn, {children} trẻ em
                        </button>

                        {/* Nội dung dropdown */}
                        {isOpen && (
                            <div className="dropdown-menu show p-3" style={{ width: "250px" }}>
                                <div className="d-flex justify-content-between align-items-center mb-2">
                                    <span>Người lớn</span>
                                    <div>
                                        <button
                                            className="btn btn-outline-secondary btn-sm"
                                            onClick={() => setAdults(Math.max(1, adults - 1))}
                                        >-</button>
                                        <span className="mx-2">{adults}</span>
                                        <button
                                            className="btn btn-outline-secondary btn-sm"
                                            onClick={() => setAdults(adults + 1)}
                                        >+</button>
                                    </div>
                                </div>

                                <div className="d-flex justify-content-between align-items-center">
                                    <span>Trẻ em</span>
                                    <div>
                                        <button
                                            className="btn btn-outline-secondary btn-sm"
                                            onClick={() => setChildren(Math.max(0, children - 1))}
                                        >-</button>
                                        <span className="mx-2">{children}</span>
                                        <button
                                            className="btn btn-outline-secondary btn-sm"
                                            onClick={() => setChildren(children + 1)}
                                        >+</button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
                <button className="btn btn-primary">Tìm kiếm</button>
            </div>

            <div className="row mt-3">
                {/* Bộ lọc bên trái */}
                <div className="col-md-3">
                    <h5>Tìm kiếm</h5>
                    <input type="text" className="form-control mb-3" placeholder="Search..." />

                    <h5>Giá tiền</h5>
                    <div className="budget-filter d-flex">
                        <input type="number" className="form-control me-2" placeholder="Min" />
                        <input type="number" className="form-control" placeholder="Max" />
                    </div>

                    {[1, 2].map((opinion) => (
                        <div key={opinion} className="filter-section">
                            <h5>Khu vực</h5>
                            <div>
                                <label><input type="checkbox" /> Phước Mỹ <br /></label>
                                <label><input type="checkbox" /> Hòa Hải <br /></label>
                                <label><input type="checkbox" /> Hải Châu <br /></label>
                                <label><input type="checkbox" /> Sơn Trà <br /></label>
                            </div>
                            <h5>Loại hình nơi ở</h5>
                            <div>
                                <label><input type="checkbox" /> Khách sạn <br /></label>
                                <label><input type="checkbox" /> Biệt thự nghỉ dưỡng <br /></label>
                                <label><input type="checkbox" /> Căn hộ <br /></label>
                                <label><input type="checkbox" /> Resort <br /></label>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Danh sách tour bên phải */}
                <div className="col-md-9">
                    <div className="d-flex justify-content-between align-items-center mb-3">
                        <h4>Sắp xếp</h4>
                        <div>
                            <button className="btn btn-outline-dark mx-1">Phù hợp nhất</button>
                            <button className="btn btn-outline-dark mx-1">Giá cao nhất</button>
                            <button className="btn btn-outline-dark mx-1">Giá thấp nhất</button>
                            <button className="btn btn-outline-dark mx-1">Được đánh giá nhiều nhất</button>
                            <button className="btn btn-danger mx-1">Khuyến mại</button>
                        </div>
                    </div>

                    {tours.map((tour) => (
                        <div key={tour.id} className="card mb-3 tour-card">
                            <div className="row g-0">
                                <div className="col-md-4">
                                    <img src={tour.image} className="img-fluid tour-image" alt={tour.name} />
                                </div>
                                <div className="col-md-8">
                                    <div className="card-body">
                                        <h5 className="card-title">{tour.name}</h5>
                                        <p className="card-text">
                                            <i className="bi bi-geo-alt-fill"></i> {tour.location}
                                        </p>
                                        <p className="card-text">{tour.price}</p>
                                        <button className="btn btn-primary" onClick={() => navigate(`/tour/${tour.id}`)}>
                                            Xem thêm
                                        </button>  {/* ✅ Điều hướng khi bấm */}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default TourList;
