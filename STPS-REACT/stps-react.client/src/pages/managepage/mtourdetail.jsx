import React from 'react';

const MTourDetail = ({ tour, onBack }) => {
    if (!tour) {
        return <div>Không có thông tin tour.</div>;
    }

    return (
        <div>
            <h2>Chi tiết Tour: {tour.name}</h2>
            <p><strong>ID:</strong> {tour.id}</p>
            <p><strong>Thời gian:</strong> {tour.duration}</p>
            <p><strong>Mô tả:</strong> {tour.description}</p>
            <p><strong>Giá vé:</strong> {tour.price.toLocaleString()} VND</p>
            <button className="btn btn-secondary" onClick={onBack}>Quay lại</button>
        </div>
    );
};

export default MTourDetail;