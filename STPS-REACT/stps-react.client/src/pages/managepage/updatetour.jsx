import React, { useState, useEffect } from 'react';
import { TourServices } from '../../services/TourSevices';

const UpdateTour = ({ tourId, onCancel }) => {
    const [form, setForm] = useState({
        tourName: '',
        duration: '',
        description: '',
        adultPrice: '',
        childPrice: '',
        transportation: '',
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const tourService = new TourServices();

    useEffect(() => {
        if (tourId) {
            fetchTour();
        }
    }, [tourId]);

    const fetchTour = async () => {
        setLoading(true);
        setError('');
        try {
            const res = await tourService.getTourById(tourId);
            const t = res.data.data;
            setForm({
                tourName: t.tourName || '',
                duration: t.duration || '',
                description: t.description || '',
                adultPrice: t.adultPrice || '',
                childPrice: t.childPrice || '',
                transportation: t.transportation || '',
            });
        } catch (err) {
            setError('Không thể tải thông tin tour!');
        }
        setLoading(false);
    };

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            await tourService.updateTour(tourId, {
                tourId: tourId,
                tourName: form.tourName,
                description: form.description,
                duration: parseInt(form.duration),
                transportation: form.transportation,
                adultPrice: parseFloat(form.adultPrice),
                childPrice: parseFloat(form.childPrice),
                isActive: true,
                isFeatured: false
            });
            alert('Cập nhật tour thành công!');
            onCancel(); // Quay lại danh sách
        } catch (err) {
            setError('Cập nhật tour thất bại!');
        }
        setLoading(false);
    };

    return (
        <div>
            <h2>Cập nhật Tour</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">Tên Tour</label>
                    <input type="text" className="form-control" name="tourName" value={form.tourName} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label className="form-label">Thời gian (số ngày)</label>
                    <input type="number" className="form-control" name="duration" value={form.duration} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label className="form-label">Phương tiện</label>
                    <input type="text" className="form-control" name="transportation" value={form.transportation} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label className="form-label">Mô tả</label>
                    <textarea className="form-control" name="description" value={form.description} onChange={handleChange} required></textarea>
                </div>
                <div className="mb-3">
                    <label className="form-label">Giá vé người lớn</label>
                    <input type="number" className="form-control" name="adultPrice" value={form.adultPrice} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label className="form-label">Giá vé trẻ em</label>
                    <input type="number" className="form-control" name="childPrice" value={form.childPrice} onChange={handleChange} required />
                </div>
                {error && <p className="text-danger">{error}</p>}
                <button type="submit" className="btn btn-success me-2" disabled={loading}>{loading ? 'Đang lưu...' : 'Lưu'}</button>
                <button type="button" className="btn btn-secondary" onClick={onCancel}>Hủy</button>
            </form>
        </div>
    );
};

export default UpdateTour;