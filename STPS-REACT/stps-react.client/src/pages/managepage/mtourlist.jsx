import React, { useState } from "react";
import "../../style/managepage.css";

const initialTours = [
    { id: "005", name: "Hà Nội", duration: "3N2Đ", description: "Khám phá Hà Nội", price: 9999000 },
    { id: "006", name: "Đà Nẵng", duration: "4N3Đ", description: "Tận hưởng biển Đà Nẵng", price: 11999000 },
    { id: "007", name: "Sài Gòn", duration: "2N1Đ", description: "Ẩm thực Sài Gòn", price: 7999000 },
];

const MTourList = ({ onAddTour, onEditTour, onViewDetail }) => {
    const [tourList, setTourList] = useState(initialTours);
    const [searchTerm, setSearchTerm] = useState("");

    // Xử lý khi bấm xóa
    const handleDelete = (id) => {
        if (window.confirm("Bạn có chắc chắn muốn xóa tour này?")) {
            setTourList(tourList.filter((tour) => tour.id !== id));
        }
    };

    // Lọc danh sách tour theo từ khóa tìm kiếm
    const filteredTours = tourList.filter((tour) =>
        tour.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div>
            <h2>Danh sách Tour</h2>
            <div className="d-flex justify-content-between mb-3 align-items-center">
                <div className="input-group" style={{ width: "400px" }}>
                    <input
                        type="text"
                        className="form-control rounded-start"
                        placeholder="Tìm kiếm theo tên tour"
                        aria-label="Tìm kiếm theo tên tour"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <button className="btn btn-primary" onClick={onAddTour}>
                    Thêm mới Tour
                </button>
            </div>

            {filteredTours.length > 0 ? (
                <table className="table table-striped table-bordered">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Tên Tour</th>
                            <th>Thời gian</th>
                            <th>Mô tả</th>
                            <th>Giá vé</th>
                            <th>Tùy chọn</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredTours.map((tour) => (
                            <tr key={tour.id} onClick={() => onViewDetail(tour)} style={{ cursor: "pointer" }}>
                                <td>{tour.id}</td>
                                <td>{tour.name}</td>
                                <td>{tour.duration}</td>
                                <td>{tour.description}</td>
                                <td>{tour.price.toLocaleString()} VND</td>
                                <td>
                                    <button className="btn btn-warning me-2" onClick={(e) => { e.stopPropagation(); onEditTour(tour.id); }}>🛠️</button>
                                    <button className="btn btn-danger" onClick={(e) => { e.stopPropagation(); handleDelete(tour.id); }}>🗑️</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p className="text-center text-muted">Không tìm thấy tour phù hợp.</p>
            )}
        </div>
    );
};

export default MTourList;