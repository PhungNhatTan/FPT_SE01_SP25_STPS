import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../style/TourList.css";
import { tourData } from "./data/tourData";
import Header from "./header";

const TourList = () => {
    const navigate = useNavigate();
    const [adults, setAdults] = useState(1);
    const [children, setChildren] = useState(0);
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [minPrice, setMinPrice] = useState(0);

    const maxTourPrice = Math.max(...tourData.map(tour => {
        const price = tour.priceald ? parseInt(tour.priceald.replace(/\D/g, ""), 10) : 0;
        return price;
    }));
    const [maxPrice, setMaxPrice] = useState(maxTourPrice);

    const [selectedRegions, setSelectedRegions] = useState([]);
    const [selectedTypes, setSelectedTypes] = useState([]);

    const [sortOrder, setSortOrder] = useState(null); // State cho sắp xếp theo giá

    const dropdownRef = useRef(null);

    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setIsOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

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
    };

    // Lọc và sắp xếp dữ liệu tour
    const filteredTours = tourData.filter(tour => {
        const priceald = tour.priceald ? parseInt(tour.priceald.replace(/\D/g, ""), 10) : 0;

        const matchesSearch = tour.name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesPrice = (minPrice ? priceald >= minPrice : true) &&
            (maxPrice ? priceald <= maxPrice : true);
        const matchesRegion = selectedRegions.length === 0 || selectedRegions.includes(tour.region);
        const matchesType = selectedTypes.length === 0 || selectedTypes.includes(tour.type);

        return matchesSearch && matchesPrice && matchesRegion && matchesType;
    }).sort((a, b) => {
        if (sortOrder === "asc") {
            return (a.priceald ? parseInt(a.priceald.replace(/\D/g, ""), 10) : 0) - (b.priceald ? parseInt(b.priceald.replace(/\D/g, ""), 10) : 0);
        }
        if (sortOrder === "desc") {
            return (b.priceald ? parseInt(b.priceald.replace(/\D/g, ""), 10) : 0) - (a.priceald ? parseInt(a.priceald.replace(/\D/g, ""), 10) : 0);
        }
        return 0; // No sorting if no sort order is set
    });

    return (
        <div className="container-fluid">
            <header className="header">
                <Header />
            </header>

            <div className="search-bar d-flex justify-content-between align-items-center p-3">
                <input
                    type="text"
                    className="form-control search-input"
                    placeholder="Địa điểm"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <input type="date" className="form-control search-input" />
                <input type="date" className="form-control search-input" />
                <div className="search-input-group d-flex align-items-center gap-2">
                    <div className="position-relative" ref={dropdownRef}>
                        <button className="form-control text-start" onClick={() => setIsOpen(!isOpen)}>
                            {adults} người lớn, {children} trẻ em
                        </button>
                        {isOpen && (
                            <div className="dropdown-menu show p-3" style={{ width: "250px" }}>
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
                <button className="btn btn-primary">Tìm kiếm</button>
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
                            onChange={(e) => setMaxPrice(Math.min(maxTourPrice, Number(e.target.value)))}
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

                    {filteredTours.map((tour) => (
                        <div key={tour.id} className="card mb-3 tour-card">
                            <div className="row g-0">
                                <div className="col-md-4">
                                    <img src={tour.image} className="img-fluid tour-image" alt={tour.name} />
                                </div>
                                <div className="col-md-8">
                                    <div className="card-body">
                                        <h5 className="card-title"><strong>{tour.name}</strong></h5>
                                        <p className="card-text"><i className="bi bi-geo-alt-fill"></i> {tour.location}</p>
                                        <p className="card-text">Giá vé người lớn: {tour.priceald}</p>
                                        <p className="card-text">Giá vé trẻ em: {tour.pricechil}</p>
                                        <button className="btn btn-primary" onClick={() => navigate(`/tour/${tour.id}`)}>Xem thêm</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}

                    {filteredTours.length === 0 && <p className="text-muted">Không có tour phù hợp.</p>}
                </div>
            </div>
        </div>
    );
};

export default TourList;
