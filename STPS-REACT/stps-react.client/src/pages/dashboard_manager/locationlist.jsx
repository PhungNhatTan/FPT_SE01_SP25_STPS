import React, { useState, useEffect } from "react";
import "./style/dashboard_manager.css";
import { LocationService } from "../../services/LocationService";

const initialLocations = [
    { id: "001", name: "Hà Nội", description: "Thủ đô của Việt Nam", priceAdult: 5000000, priceChild: 2500000, image: "", province: "Hà Nội" },
    { id: "002", name: "Đà Nẵng", description: "Thành phố biển xinh đẹp", priceAdult: 7000000, priceChild: 3500000, image: "", province: "Đà Nẵng" },
];

const LocationList = ({ onAddLocation, onEditLocation }) => {
    const [locationList, setLocationList] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const locationService = new LocationService();

    const fetchLocations = async () => {
        setLoading(true);
        setError("");
        try {
            const response = await locationService.getAllLocations();
            if (response.data.success) {
                setLocationList(response.data.data);
            } else {
                setError("Không thể tải danh sách địa điểm!");
            }
        } catch (err) {
            setError("Không thể tải danh sách địa điểm!");
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchLocations();
    }, []);

    const filteredLocations = locationList.filter((location) =>
        location.destinationName && location.destinationName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleDelete = async (id) => {
        if (window.confirm("Bạn có chắc chắn muốn xóa địa điểm này?")) {
            try {
                const response = await locationService.deleteLocation(id);
                if (response.data.success) {
                    alert("Xóa địa điểm thành công!");
                    fetchLocations();
                } else {
                    alert("Xóa địa điểm thất bại!");
                }
            } catch (err) {
                alert("Xóa địa điểm thất bại!");
            }
        }
    };

    if (loading) {
        return <div>Đang tải...</div>;
    }
    if (error) {
        return <div className="alert alert-danger">{error}</div>;
    }

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

            <div className="table-container">
                <table className="table table-striped table-bordered">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Ảnh</th>
                            <th>Tên Địa điểm</th>
                            <th>Thành phố</th>
                            <th>Mô tả</th>
                            <th>Nổi bật</th>
                            <th>Tùy chọn</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredLocations.map((location) => (
                            <tr key={location.destinationId}>
                                <td>{location.destinationId}</td>
                                <td>{location.primaryImageUrl ? <img src={location.primaryImageUrl} alt={location.destinationName} style={{width: 60, height: 40, objectFit: 'cover'}} /> : null}</td>
                                <td>{location.destinationName}</td>
                                <td>{location.cityName}</td>
                                <td>{location.description}</td>
                                <td>{location.isFeatured ? "Có" : "Không"}</td>
                                <td>
                                    <button className="btn btn-warning me-2" onClick={() => onEditLocation(location.destinationId)}>Sửa</button>
                                    <button className="btn btn-danger" onClick={() => handleDelete(location.destinationId)}>Xóa</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default LocationList;