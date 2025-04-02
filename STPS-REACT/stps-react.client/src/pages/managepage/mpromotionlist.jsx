import React, { useState } from "react";
import "../../style/managepage.css";

const initialPromotions = [
    { id: "001", name: "Giảm giá 20%", startDate: "2023-01-01", endDate: "2023-01-31", details: "Áp dụng toàn quốc" },
    { id: "002", name: "Giảm giá 15%", startDate: "2023-02-01", endDate: "2023-02-28", details: "Chỉ áp dụng online" },
];

const MPromotionList = ({ onAddPromotion, onEditPromotion }) => {
    const [promotions, setPromotions] = useState(initialPromotions);
    const [searchTerm, setSearchTerm] = useState("");

    const filteredPromotions = promotions.filter((promotion) =>
        promotion.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div>
            <h2>Danh sách Khuyến mãi</h2>
            <div className="d-flex justify-content-between mb-3 align-items-center">
                <div className="input-group" style={{ width: "400px" }}>
                    <input
                        type="text"
                        className="form-control rounded-start"
                        placeholder="Tìm kiếm theo tên khuyến mãi"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <button className="btn btn-primary" onClick={onAddPromotion}>Thêm khuyến mãi</button>
            </div>

            <table className="table table-striped table-bordered">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Tên Khuyến mãi</th>
                        <th>Ngày bắt đầu</th>
                        <th>Ngày kết thúc</th>
                        <th>Chi tiết</th>
                        <th>Thao tác</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredPromotions.length > 0 ? (
                        filteredPromotions.map((promotion) => (
                            <tr key={promotion.id}>
                                <td className="text-center">{promotion.id}</td>
                                <td>{promotion.name}</td>
                                <td className="text-center">{promotion.startDate}</td>
                                <td className="text-center">{promotion.endDate}</td>
                                <td>{promotion.details}</td>
                                <td className="text-center">
                                    <button className="btn btn-warning" onClick={() => onEditPromotion(promotion.id)}>🛠️</button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="6" className="text-center">Không có khuyến mãi nào phù hợp</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default MPromotionList;
