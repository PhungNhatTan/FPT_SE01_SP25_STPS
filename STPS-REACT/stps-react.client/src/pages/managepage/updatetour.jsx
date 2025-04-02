import React, { useState, useEffect } from 'react';

const UpdateTour = ({ tour, onUpdate, onCancel }) => {
    const [tourInfo, setTourInfo] = useState({
        id: '',
        name: '',
        duration: '',
        description: '',
        price: '',
    });

    useEffect(() => {
        if (tour) {
            setTourInfo({
                id: tour.id,
                name: tour.name,
                duration: tour.duration,
                description: tour.description,
                price: tour.price,
            });
        }
    }, [tour]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setTourInfo({ ...tourInfo, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onUpdate(tourInfo);
    };

    return (
        <div>
            <h2>Cập nhật Tour: {tourInfo.name}</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">Tên Tour</label>
                    <input
                        type="text"
                        className="form-control"
                        name="name"
                        value={tourInfo.name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Thời gian</label>
                    <input
                        type="text"
                        className="form-control"
                        name="duration"
                        value={tourInfo.duration}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Mô tả</label>
                    <textarea
                        className="form-control"
                        name="description"
                        value={tourInfo.description}
                        onChange={handleChange}
                        required
                    ></textarea>
                </div>
                <div className="mb-3">
                    <label className="form-label">Giá vé</label>
                    <input
                        type="number"
                        className="form-control"
                        name="price"
                        value={tourInfo.price}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-success me-2">Lưu</button>
                <button type="button" className="btn btn-secondary" onClick={onCancel}>Hủy</button>
            </form>
        </div>
    );
};

export default UpdateTour;