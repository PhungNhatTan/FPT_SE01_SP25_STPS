import React from "react";

const AddPromotion = ({ onCancel }) => {

    return (
        <div>
            <h2>Thêm mới Khuyến mãi</h2>
            <form >
                <div className="mb-3">
                    <label className="form-label">Tên Khuyến mãi</label>
                    <input type="text" className="form-control" required />
                </div>
                <div className="mb-3">
                    <label className="form-label">Ngày bắt đầu</label>
                    <input type="text" className="form-control" required />
                    </div>
                <div className="mb-3">
                    <label className="form-label">Ngày kết thúc</label>
                    <input type="text" className="form-control" required />
                    </div>
                <div className="mb-3">
                    <label className="form-label">Chi tiết</label>
                    <input type="text" className="form-control" required />
                    </div>
                <button type="submit" className="btn btn-success me-2">Lưu</button>
                <button type="button" className="btn btn-secondary" onClick={onCancel}>Hủy</button>
            </form>
        </div>
    );
};

export default AddPromotion;
