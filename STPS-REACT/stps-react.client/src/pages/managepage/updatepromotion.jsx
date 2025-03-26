import React, { useState, useEffect } from "react";

const UpdatePromotion = ({ promotionId, onCancel, getPromotionById }) => {
    const [promotion, setPromotion] = useState({ name: "", startDate: "", endDate: "", details: "" });

    useEffect(() => {
        if (promotionId && getPromotionById) {
            const promo = getPromotionById(promotionId);
            if (promo) {
                setPromotion(promo);
            } else {
                console.warn("Không tìm thấy khuyến mãi với ID:", promotionId);
            }
        }
    }, [promotionId, getPromotionById]);

    const handleChange = (e) => {
        setPromotion({ ...promotion, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Cập nhật khuyến mãi", promotion);
        // Có thể gọi một hàm để lưu thông tin khuyến mãi đã cập nhật ở đây
        onCancel();
    };

    return (
        <div>
            <h2>Cập nhật Khuyến mãi</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">Tên Khuyến mãi</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        name="name" 
                        value={promotion.name} 
                        onChange={handleChange} 
                        required 
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Ngày bắt đầu</label>
                    <input 
                        type="date" 
                        className="form-control" 
                        name="startDate" 
                        value={promotion.startDate} 
                        onChange={handleChange} 
                        required 
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Ngày kết thúc</label>
                    <input 
                        type="date" 
                        className="form-control" 
                        name="endDate" 
                        value={promotion.endDate} 
                        onChange={handleChange} 
                        required 
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Chi tiết</label>
                    <textarea 
                        className="form-control" 
                        name="details" 
                        value={promotion.details} 
                        onChange={handleChange} 
                        required
                    ></textarea>
                </div>
                <button type="submit" className="btn btn-success me-2">Lưu</button>
                <button type="button" className="btn btn-secondary" onClick={onCancel}>Hủy</button>
            </form>
        </div>
    );
};

export default UpdatePromotion;