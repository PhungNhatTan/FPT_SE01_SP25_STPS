import React, { useState } from "react";
import "./style/dashboard_manager.css";

const initialLocations = [
    { id: "001", name: "Hà Nội", description: "Thủ đô của Việt Nam", adultPrice: 5000000, childPrice: 2500000 },
    { id: "002", name: "Đà Nẵng", description: "Thành phố biển xinh đẹp", adultPrice: 7000000, childPrice: 3500000 },
];

const LocationList = ({ onAddLocation, onEditLocation }) => {
    const [locationList, setLocationList] = useState(initialLocations);
    const [searchTerm, setSearchTerm] = useState("");

    const filteredLocations = locationList.filter((location) =>
        location.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleDelete = (id) => {
        if (window.confirm("Bạn có chắc chắn muốn xóa địa điểm này?")) {
            setLocationList(locationList.filter((location) => location.id !== id));
        }
    };

    return (
        <div>
            <h2>Danh sách Địa điểm</h2>
            <div className="d-flex justify-content-between mb-3 align-items-center">
                <div className="input-group" style={{ width: "400px" }}>
                    <input
                        type="text"
                        className="form-control rounded-start"
                        placeholder="Tìm kiếm theo tên địa điểm"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <button className="btn btn-primary" onClick={onAddLocation}>
                    Thêm mới Địa điểm
                </button>
            </div>

            <table className="table table-striped table-bordered">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Tên Địa điểm</th>
                        <th>Mô tả</th>
                        <th>Giá người lớn (VNĐ)</th>
                        <th>Giá trẻ em (VNĐ)</th>
                        <th>Tùy chọn</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredLocations.map((location) => (
                        <tr key={location.id}>
                            <td>{location.id}</td>
                            <td>{location.name}</td>
                            <td>{location.description}</td>
                            <td>{location.adultPrice.toLocaleString()} VNĐ</td>
                            <td>{location.childPrice.toLocaleString()} VNĐ</td>
                            <td>
                                <button className="btn btn-warning me-2" onClick={() => onEditLocation(location.id)}>Sửa</button>
                                <button className="btn btn-danger" onClick={() => handleDelete(location.id)}>Xóa</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default LocationList;