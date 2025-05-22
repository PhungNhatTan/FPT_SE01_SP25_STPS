import React, { useState, useEffect } from "react";
import { VoucherService } from "../../services/VoucherService";
import "../../style/simple-sidebar.css";

const MPromotionList = ({ onAddPromotion, onEditPromotion }) => {
    const [promotions, setPromotions] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const voucherService = new VoucherService();

    useEffect(() => {
        fetchPromotions();
    }, []);

    const fetchPromotions = async () => {
        setLoading(true);
        setError("");
        try {
            const res = await voucherService.getAllVouchers();
            setPromotions(res.data.data || []);
        } catch (err) {
            setError("Không thể tải danh sách khuyến mãi");
        }
        setLoading(false);
    };

    const handleDelete = async (id) => {
        if (window.confirm("Bạn có chắc chắn muốn xóa khuyến mãi này?")) {
            try {
                await voucherService.deleteVoucher(id);
                setPromotions(promotions.filter((promo) => promo.id !== id));
            } catch (err) {
                alert("Xóa khuyến mãi thất bại!");
            }
        }
    };

    const filteredPromotions = promotions.filter((promotion) =>
        promotion.voucherName?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Hàm cắt ngắn chi tiết
    const truncateDetail = (text, maxLength = 100) => {
        if (!text) return '';
        return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
    };

    return (
        <div>
            <div className="d-flex justify-content-between align-items-center mb-4">
                <div className="card-title">Danh sách Khuyến mãi</div>
                <div className="d-flex gap-3">
                    <div className="search-bar">
                        <input
                            type="text"
                            placeholder="Tìm kiếm theo tên khuyến mãi"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <button className="btn btn-primary" onClick={onAddPromotion}>
                        Thêm khuyến mãi
                    </button>
                </div>
            </div>

            {loading && <div className="text-center p-4">Đang tải dữ liệu...</div>}
            {error && <div className="alert alert-danger">{error}</div>}

            {filteredPromotions.length > 0 ? (
                <div className="table-container">
                    <table className="data-table">
                        <thead>
                            <tr>
                                <th style={{width: "50px"}}>ID</th>
                                <th style={{width: "25%"}}>Tên Khuyến mãi</th>
                                <th style={{width: "120px"}}>Ngày bắt đầu</th>
                                <th style={{width: "120px"}}>Ngày kết thúc</th>
                                <th>Chi tiết</th>
                                <th style={{width: "120px", textAlign: "center"}}>Thao tác</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredPromotions.map((promotion) => (
                                <tr key={promotion.id}>
                                    <td>{promotion.id}</td>
                                    <td className="truncate">{promotion.voucherName}</td>
                                    <td>{promotion.startDate?.slice(0, 10)}</td>
                                    <td>{promotion.endDate?.slice(0, 10)}</td>
                                    <td title={promotion.voucherDetail} className="truncate">{truncateDetail(promotion.voucherDetail)}</td>
                                    <td>
                                        <div className="table-actions">
                                            <button
                                                className="btn btn-icon btn-warning"
                                                onClick={() => onEditPromotion(promotion.id)}
                                                title="Chỉnh sửa"
                                            >
                                                🛠️
                                            </button>
                                            <button
                                                className="btn btn-icon btn-danger"
                                                onClick={() => handleDelete(promotion.id)}
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
                        <p>Không có khuyến mãi nào phù hợp</p>
                    </div>
                )
            )}
        </div>
    );
};

export default MPromotionList;
