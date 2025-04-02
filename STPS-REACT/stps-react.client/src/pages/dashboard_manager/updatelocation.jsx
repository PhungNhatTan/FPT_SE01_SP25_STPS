import React, { useEffect, useState } from "react";

const UpdateLocation = ({ locationId, onCancel }) => {
    const [location, setLocation] = useState({
        id: locationId,
        name: "",
        description: "",
        adultPrice: "",
        childPrice: "",
    });

    useEffect(() => {
        // Fetch location details based on locationId
        // Ví dụ: setLocation(fetchedLocation);
    }, [locationId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setLocation({ ...location, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Logic để cập nhật địa điểm
        console.log("Cập nhật địa điểm:", location);
        onCancel(); // Quay lại danh sách
    };

    return (
        <div>
            <h2>Cập nhật địa điểm</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">Tên địa điểm</label>
                    <input
                        type="text"
                        className="form-control"
                        name="name"
                        value={location.name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Mô tả</label>
                    <textarea
                        className="form-control"
                        name="description"
                        value={location.description}
                        onChange={handleChange}
                        required
                    ></textarea>
                </div>
                <div className="mb-3">
                    <label className="form-label">Giá vé người lớn</label>
                    <input
                        type="number"
                        className="form-control"
                        name="adultPrice"
                        value={location.adultPrice}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Giá vé trẻ em</label>
                    <input
                        type="number"
                        className="form-control"
                        name="childPrice"
                        value={location.childPrice}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-success me-2">Cập nhật</button>
                <button type="button" className="btn btn-secondary" onClick={onCancel}>Hủy</button>
            </form>
        </div>
    );
};

export default UpdateLocation;