import React, { useState } from "react";

const AddLocation = ({ onCancel }) => {
    const [newLocation, setNewLocation] = useState({
        name: "",
        description: "",
        adultPrice: "",
        childPrice: "",
    });

    const handleSubmit = (e) => {
        e.preventDefault(); // Ngăn chặn hành vi mặc định của form
        console.log("Thêm địa điểm:", newLocation);
        // Logic để thêm địa điểm vào danh sách
        onCancel(); // Quay lại danh sách
    };

    return (
        <div>
            <h2>Thêm mới Địa điểm</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">Tên địa điểm</label>
                    <input
                        type="text"
                        className="form-control"
                        required
                        value={newLocation.name}
                        onChange={(e) => setNewLocation({ ...newLocation, name: e.target.value })}
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Mô tả</label>
                    <textarea
                        className="form-control"
                        required
                        value={newLocation.description}
                        onChange={(e) => setNewLocation({ ...newLocation, description: e.target.value })}
                    ></textarea>
                </div>
                <div className="mb-3">
                    <label className="form-label">Giá người lớn (VNĐ)</label>
                    <input
                        type="number"
                        className="form-control"
                        required
                        value={newLocation.adultPrice}
                        onChange={(e) => setNewLocation({ ...newLocation, adultPrice: e.target.value })}
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Giá trẻ em (VNĐ)</label>
                    <input
                        type="number"
                        className="form-control"
                        required
                        value={newLocation.childPrice}
                        onChange={(e) => setNewLocation({ ...newLocation, childPrice: e.target.value })}
                    />
                </div>
                <button type="submit" className="btn btn-success me-2">Lưu</button>
                <button type="button" className="btn btn-secondary" onClick={onCancel}>Hủy</button>
            </form>
        </div>
    );
};

export default AddLocation;