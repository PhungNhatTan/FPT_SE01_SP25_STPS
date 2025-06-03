import React, { useState, useEffect } from 'react';
import { TourServices } from '../../services/TourSevices';
import { getCompanyByUserId } from '../../services/TourismCompanyService';
import { getUserIdFromToken } from '../../utils/JwtHelper';
import {getFullImageUrl} from "../../utils/ImageHelper";

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
    const [userCompany, setUserCompany] = useState(null);
    const [currentTour, setCurrentTour] = useState(null);
    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const tourService = new TourServices();

    useEffect(() => {
        if (tourId) {
            fetchTour();
        }
        fetchUserCompany();
    }, [tourId]);

    const fetchUserCompany = async () => {
        try {
            const userId = getUserIdFromToken();
            console.log('UpdateTour - User ID:', userId);
            if (userId) {
                const response = await getCompanyByUserId(parseInt(userId));
                console.log('UpdateTour - Company response:', response);
                if (response.data.success) {
                    console.log('UpdateTour - User company:', response.data.data);
                    setUserCompany(response.data.data);
                } else {
                    console.log('UpdateTour - No company found for user');
                }
            } else {
                console.log('UpdateTour - No user ID found');
            }
        } catch (err) {
            console.error('UpdateTour - Error fetching user company:', err);
        }
    };

    const fetchTour = async () => {
        setLoading(true);
        setError('');
        try {
            const res = await tourService.getTourById(tourId);
            const t = res.data.data;
            console.log('UpdateTour - Current tour:', t);
            setCurrentTour(t);
            setForm({
                tourName: t.tourName || '',
                duration: t.duration || '',
                description: t.description || '',
                adultPrice: t.adultPrice || '',
                childPrice: t.childPrice || '',
                transportation: t.transportation || '',
            });
        } catch (err) {
            console.error('UpdateTour - Error fetching tour:', err);
            setError('Không thể tải thông tin tour!');
        }
        setLoading(false);
    };

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log('UpdateTour - Submit check:');
        console.log('- User company:', userCompany);
        console.log('- Current tour:', currentTour);
        console.log('- Tour company ID:', currentTour?.tourismCompanyId);
        console.log('- User company ID:', userCompany?.id);

        // Check if user has permission to edit this tour
        // Tạm thời comment để debug
        /*
        if (userCompany && currentTour && currentTour.tourismCompanyId !== userCompany.id) {
            console.log('UpdateTour - Permission denied');
            setError('Bạn không có quyền chỉnh sửa tour này!');
            return;
        }
        */

        setLoading(true);
        setError('');
        try {
            const formData = new FormData();
            formData.append('tourId', tourId);
            formData.append('tourName', form.tourName);
            formData.append('description', form.description);
            formData.append('duration', form.duration);
            formData.append('transportation', form.transportation);
            formData.append('adultPrice', form.adultPrice);
            formData.append('childPrice', form.childPrice);
            formData.append('isActive', true);
            formData.append('isFeatured', false);
            formData.append('tourismCompanyId', userCompany?.id || currentTour?.tourismCompanyId);
            if (image) {
                formData.append('image', image);
            }

            const response = await tourService.updateTour(tourId, formData);
            console.log('UpdateTour - Update response:', response);

            alert('Cập nhật tour thành công!');
            onCancel(); // Quay lại danh sách
        } catch (err) {
            console.error('UpdateTour - Error updating tour:', err);
            console.error('UpdateTour - Error details:', err.response);
            setError(`Cập nhật tour thất bại: ${err.response?.data?.message || err.message}`);
        }
        setLoading(false);
    };

    return (
        <div>
            <h2>Cập nhật Tour</h2>

            {/* Debug info */}
            {userCompany && (
                <div className="alert alert-info mb-3">
                    <strong>Công ty:</strong> {userCompany.companyName} (ID: {userCompany.id})
                </div>
            )}
            {currentTour && (
                <div className="alert alert-secondary mb-3">
                    <strong>Tour:</strong> {currentTour.tourName} |
                    <strong> Company ID:</strong> {currentTour.tourismCompanyId || 'null'}
                </div>
            )}

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
                <div className="mb-3">
                    <label className="form-label">Ảnh đại diện mới (tối đa 2MB)</label>
                    <input type="file" className="form-control" accept="image/*"
                        onChange={e => {
                            const file = e.target.files[0];
                            if (file) {
                                if (file.size > 2 * 1024 * 1024) {
                                    setError('Ảnh đại diện không được vượt quá 2MB!');
                                    setImage(null);
                                    setImagePreview(null);
                                    return;
                                }
                                setError('');
                                setImage(file);
                                setImagePreview(URL.createObjectURL(file));
                            }
                        }}
                    />
                </div>
                {imagePreview && (
                    <div className="mb-3">
                        <img src={imagePreview} alt="Ảnh đại diện mới" style={{ maxWidth: '200px', maxHeight: '200px' }} className="mx-auto" />
                    </div>
                )}
                {currentTour?.imageCover && !imagePreview && (
                    <div className="mb-3">
                        <img src={getFullImageUrl(currentTour?.imageCover)} alt="Ảnh đại diện"  style={{ maxWidth: '200px', maxHeight: '200px' }} />
                    </div>
                )}
                {error && <p className="text-danger">{error}</p>}
                <button type="submit" className="btn btn-success me-2" disabled={loading}>{loading ? 'Đang lưu...' : 'Lưu'}</button>
                <button type="button" className="btn btn-secondary" onClick={onCancel}>Hủy</button>
            </form>
        </div>
    );
};

export default UpdateTour;