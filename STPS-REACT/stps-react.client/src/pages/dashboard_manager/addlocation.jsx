import React, { useState, useEffect } from "react";
import { LocationService } from "../../services/LocationService";
import { CityService } from "../../services/CityService";

const AddLocation = ({ onCancel }) => {
    const [cities, setCities] = useState([]);
    const [newLocation, setNewLocation] = useState({
        destinationName: "",
        description: "",
        cityId: "",
        isFeatured: false
    });
    const locationService = new LocationService();
    const cityService = new CityService();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchCities = async () => {
            try {
                const res = await cityService.findAll();
                if (res.data.success) setCities(res.data.data);
            } catch {}
        };
        fetchCities();
    }, []);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setNewLocation(prev => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        try {
            const requestData = {
                destinationName: newLocation.destinationName,
                description: newLocation.description,
                cityId: parseInt(newLocation.cityId),
                isFeatured: newLocation.isFeatured,
                images: null,
                details: null
            };
            
            const response = await locationService.addLocation(requestData);
            if (response.data.success) {
                alert("Thêm địa điểm thành công!");
                onCancel();
            } else {
                setError(response.data.message || "Thêm địa điểm thất bại!");
            }
        } catch (err) {
            setError(err.response?.data?.message || "Thêm địa điểm thất bại!");
        }
        setLoading(false);
    };

    return (
        <div>
            <h2>Thêm mới Địa điểm</h2>
            {error && <div className="alert alert-danger">{error}</div>}
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">Tên địa điểm</label>
                    <input
                        type="text"
                        className="form-control"
                        name="destinationName"
                        required
                        value={newLocation.destinationName}
                        onChange={handleChange}
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Mô tả</label>
                    <textarea
                        className="form-control"
                        name="description"
                        required
                        value={newLocation.description}
                        onChange={handleChange}
                    ></textarea>
                </div>
                <div className="mb-3">
                    <label className="form-label">Thành phố</label>
                    <select
                        className="form-control"
                        name="cityId"
                        required
                        value={newLocation.cityId}
                        onChange={handleChange}
                    >
                        <option value="">Chọn thành phố</option>
                        {cities.map(city => (
                            <option key={city.cityId} value={city.cityId}>{city.cityName}</option>
                        ))}
                    </select>
                </div>
                <div className="mb-3">
                    <div className="form-check">
                        <input
                            type="checkbox"
                            className="form-check-input"
                            name="isFeatured"
                            checked={newLocation.isFeatured}
                            onChange={handleChange}
                        />
                        <label className="form-check-label">Nổi bật</label>
                    </div>
                </div>
                <button type="submit" className="btn btn-success me-2" disabled={loading}>{loading ? "Đang lưu..." : "Lưu"}</button>
                <button type="button" className="btn btn-secondary" onClick={onCancel}>Hủy</button>
            </form>
        </div>
    );
};

export default AddLocation;