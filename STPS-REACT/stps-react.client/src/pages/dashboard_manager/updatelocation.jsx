import React, { useEffect, useState } from "react";
import { LocationService } from "../../services/LocationService";
import { CityService } from "../../services/CityService";

const UpdateLocation = ({ locationId, onCancel }) => {
    const [cities, setCities] = useState([]);
    const [location, setLocation] = useState({
        destinationName: "",
        description: "",
        cityId: "",
        isFeatured: false
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const locationService = new LocationService();
    const cityService = new CityService();

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch cities
                const cityRes = await cityService.findAll();
                if (cityRes.data.success) setCities(cityRes.data.data);

                // Fetch location details
                const locationRes = await locationService.getLocationById(locationId);
                if (locationRes.data.success) {
                    const data = locationRes.data.data;
                    setLocation({
                        destinationName: data.destinationName,
                        description: data.description,
                        cityId: data.cityId,
                        isFeatured: data.isFeatured
                    });
                }
            } catch (err) {
                setError("Không thể tải dữ liệu!");
            }
        };
        fetchData();
    }, [locationId]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setLocation(prev => ({
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
                destinationId: parseInt(locationId),
                destinationName: location.destinationName,
                description: location.description,
                cityId: parseInt(location.cityId),
                isFeatured: location.isFeatured,
                newImages: null,
                deleteImageIds: null,
                details: null
            };
            
            const response = await locationService.updateLocation(locationId, requestData);
            if (response.data.success) {
                alert("Cập nhật địa điểm thành công!");
                onCancel();
            } else {
                setError(response.data.message || "Cập nhật địa điểm thất bại!");
            }
        } catch (err) {
            setError(err.response?.data?.message || "Cập nhật địa điểm thất bại!");
        }
        setLoading(false);
    };

    return (
        <div>
            <h2>Cập nhật địa điểm</h2>
            {error && <div className="alert alert-danger">{error}</div>}
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">Tên địa điểm</label>
                    <input
                        type="text"
                        className="form-control"
                        name="destinationName"
                        required
                        value={location.destinationName}
                        onChange={handleChange}
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Mô tả</label>
                    <textarea
                        className="form-control"
                        name="description"
                        required
                        value={location.description}
                        onChange={handleChange}
                    ></textarea>
                </div>
                <div className="mb-3">
                    <label className="form-label">Thành phố</label>
                    <select
                        className="form-control"
                        name="cityId"
                        required
                        value={location.cityId}
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
                            checked={location.isFeatured}
                            onChange={handleChange}
                        />
                        <label className="form-check-label">Nổi bật</label>
                    </div>
                </div>
                <button type="submit" className="btn btn-success me-2" disabled={loading}>{loading ? "Đang cập nhật..." : "Cập nhật"}</button>
                <button type="button" className="btn btn-secondary" onClick={onCancel}>Hủy</button>
            </form>
        </div>
    );
};

export default UpdateLocation;