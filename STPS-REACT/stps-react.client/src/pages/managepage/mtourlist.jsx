import React, { useState, useEffect } from "react";
import { TourServices } from "../../services/TourSevices";
import "../../style/simple-sidebar.css";

const MTourList = ({ onAddTour, onEditTour, onViewDetail }) => {
    const [tourList, setTourList] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const tourService = new TourServices();

    useEffect(() => {
        fetchTours();
    }, []);

    const fetchTours = async () => {
        setLoading(true);
        setError("");
        try {
            const res = await tourService.getAllTours();
            setTourList(res.data.data || []);
        } catch (err) {
            setError("Không thể tải danh sách tour");
        }
        setLoading(false);
    };

    const handleDelete = async (id) => {
        if (window.confirm("Bạn có chắc chắn muốn xóa tour này?")) {
            try {
                await tourService.deleteTour(id);
                setTourList(tourList.filter((tour) => tour.tourId !== id));
            } catch (err) {
                alert("Xóa tour thất bại!");
            }
        }
    };

    // Lọc danh sách tour theo từ khóa tìm kiếm
    const filteredTours = tourList.filter((tour) =>
        tour.tourName?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Hàm cắt ngắn mô tả
    const truncateDescription = (text, maxLength = 100) => {
        if (!text) return '';
        return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
    };

    return (
        <div>
            <div className="d-flex justify-content-between align-items-center mb-4">
                <div className="card-title">Danh sách Tour</div>
                <div className="d-flex gap-3">
                    <div className="search-bar">
                        <input
                            type="text"
                            placeholder="Tìm kiếm theo tên tour"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <button className="btn btn-primary" onClick={onAddTour}>
                        Thêm mới Tour
                    </button>
                </div>
            </div>

            {loading && <div className="text-center p-4">Đang tải dữ liệu...</div>}
            {error && <div className="alert alert-danger">{error}</div>}

            {filteredTours.length > 0 ? (
                <div className="table-container">
                    <table className="data-table">
                        <thead>
                            <tr>
                                <th style={{width: "50px"}}>ID</th>
                                <th style={{width: "20%"}}>Tên Tour</th>
                                <th style={{width: "100px"}}>Thời gian</th>
                                <th>Mô tả</th>
                                <th style={{width: "15%"}}>Giá vé người lớn</th>
                                <th style={{width: "15%"}}>Giá vé trẻ em</th>
                                <th style={{width: "120px", textAlign: "center"}}>Thao tác</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredTours.map((tour) => (
                                <tr key={tour.tourId} onClick={() => onViewDetail(tour)} style={{ cursor: "pointer" }}>
                                    <td>{tour.tourId}</td>
                                    <td className="truncate">{tour.tourName}</td>
                                    <td>{tour.duration} ngày</td>
                                    <td title={tour.description} className="truncate">{truncateDescription(tour.description)}</td>
                                    <td>{tour.adultPrice?.toLocaleString()} VND</td>
                                    <td>{tour.childPrice?.toLocaleString()} VND</td>
                                    <td>
                                        <div className="table-actions">
                                            <button
                                                className="btn btn-icon btn-warning"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    onEditTour(tour.tourId);
                                                }}
                                                title="Chỉnh sửa"
                                            >
                                                🛠️
                                            </button>
                                            <button
                                                className="btn btn-icon btn-danger"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleDelete(tour.tourId);
                                                }}
                                                title="Xóa"
                                            >
                                                🗑️
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                !loading && (
                    <div className="text-center p-5 text-muted">
                        <p>Không tìm thấy tour phù hợp.</p>
                    </div>
                )
            )}
        </div>
    );
};

export default MTourList;