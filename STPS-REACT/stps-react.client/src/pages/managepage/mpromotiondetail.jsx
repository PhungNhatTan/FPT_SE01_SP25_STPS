import React from 'react';

const MPromotionDetail = ({ promotion, onBack }) => {
    if (!promotion) {
        return <div>Không có thông tin khuyến mãi.</div>;
    }

    return (
        <div>
            <h2>Chi tiết Khuyến mãi: {promotion.name}</h2>
            <p><strong>ID:</strong> {promotion.id}</p>
            <p><strong>Ngày bắt đầu:</strong> {promotion.startDate}</p>
            <p><strong>Ngày kết thúc:</strong> {promotion.endDate}</p>
            <p><strong>Chi tiết:</strong> {promotion.details}</p>
            <button className="btn btn-secondary" onClick={onBack}>Quay lại</button>
        </div>
    );
};

export default MPromotionDetail;