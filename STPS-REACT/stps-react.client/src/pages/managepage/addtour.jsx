import React from 'react';

const AddTour = ({ onCancel }) => {
    return (
        <div>
            <h2>Thêm mới Tour</h2>
            <form>
                <div className="mb-3">
                    <label className="form-label">Tên Tour</label>
                    <input type="text" className="form-control" required />
                </div>
                <div className="mb-3">
                    <label className="form-label">Thời gian</label>
                    <input type="text" className="form-control" required />
                </div>
                <div className="mb-3">
                    <label className="form-label">Mô tả</label>
                    <textarea className="form-control" required></textarea>
                </div>
                <div className="mb-3">
                    <label className="form-label">Giá vé</label>
                    <input type="number" className="form-control" required />
                </div>
                <button type="submit" className="btn btn-success me-2">Lưu</button>
                <button type="button" className="btn btn-secondary" onClick={onCancel}>Hủy</button>
            </form>
        </div>
    );
};

export default AddTour;
