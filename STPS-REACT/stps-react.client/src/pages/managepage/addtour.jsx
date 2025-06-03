import React, { useState, useEffect } from 'react';
import { TourServices } from '../../services/TourSevices';
import { getCompanyByUserId } from '../../services/TourismCompanyService';
import { getUserIdFromToken } from '../../utils/JwtHelper';

const AddTour = ({ onCancel }) => {
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
    const [loadingCompany, setLoadingCompany] = useState(true);
    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const tourService = new TourServices();

    // Load user's company on component mount
    useEffect(() => {
        const fetchUserCompany = async () => {
            try {
                const userId = getUserIdFromToken();
                console.log("AddTour - User ID from token:", userId);

                if (userId) {
                    console.log("AddTour - Fetching company for user:", userId);
                    const response = await getCompanyByUserId(parseInt(userId));
                    console.log("AddTour - Company response:", response);

                    if (response.data.success) {
                        console.log("AddTour - User company:", response.data.data);
                        setUserCompany(response.data.data);
                    } else {
                        console.log("AddTour - No company found for user");
                        setError('Bạn chưa có công ty du lịch. Vui lòng liên hệ admin để được cấp quyền.');
                    }
                } else {
                    setError('Không thể lấy thông tin người dùng. Vui lòng đăng nhập lại.');
                }
            } catch (err) {
                console.error('AddTour - Error fetching user company:', err);
                console.error('AddTour - Error details:', err.response);
                setError('Không thể tải thông tin công ty. Bạn có thể chưa có quyền tạo tour.');
            } finally {
                setLoadingCompany(false);
            }
        };

        fetchUserCompany();
    }, []);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (file.size > 2 * 1024 * 1024) { // 2MB
                setError('Ảnh đại diện không được vượt quá 2MB!');
                setImage(null);
                setImagePreview(null);
                return;
            }
            setError('');
            setImage(file);
            setImagePreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Check if user has company
        if (!userCompany) {
            setError('Bạn cần có công ty du lịch để tạo tour!');
            return;
        }

        setLoading(true);
        setError('');
        try {
            const formData = new FormData();
            formData.append('tourName', form.tourName);
            formData.append('description', form.description);
            formData.append('duration', form.duration);
            formData.append('transportation', form.transportation);
            formData.append('adultPrice', form.adultPrice);
            formData.append('childPrice', form.childPrice);
            formData.append('isActive', true);
            formData.append('isFeatured', false);
            formData.append('tourismCompanyId', userCompany.id);
            if (image) {
                formData.append('image', image);
            }

            console.log('AddTour - Submitting tour data:', formData);
            const response = await tourService.addTour(formData);
            console.log('AddTour - Response:', response);

            alert('Thêm tour thành công!');
            onCancel(); // Quay lại danh sách
        } catch (err) {
            console.error('AddTour - Error adding tour:', err);
            console.error('AddTour - Error details:', err.response);
            setError(`Thêm tour thất bại: ${err.response?.data?.message || err.message}`);
        }
        setLoading(false);
    };

    // Show loading while fetching company info
    if (loadingCompany) {
        return (
            <div>
                <h2>Thêm mới Tour</h2>
                <div className="text-center p-4">
                    <div className="spinner-border" role="status">
                        <span className="visually-hidden">Đang tải...</span>
                    </div>
                    <p>Đang tải thông tin công ty...</p>
                </div>
            </div>
        );
    }

    // Show error if no company or other errors
    if (error && !userCompany) {
        return (
            <div>
                <h2>Thêm mới Tour</h2>
                <div className="alert alert-danger" role="alert">
                    {error}
                </div>
                <button className="btn btn-secondary" onClick={onCancel}>
                    Quay lại
                </button>
            </div>
        );
    }

    return (
        <div>
            <h2>Thêm mới Tour</h2>
            {userCompany && (
                <div className="alert alert-info mb-3">
                    <strong>Công ty:</strong> {userCompany.companyName}
                </div>
            )}
            {error && (
                <div className="alert alert-danger" role="alert">
                    {error}
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
                    <label className="form-label">Ảnh đại diện (tối đa 2MB)</label>
                    <input type="file" className="form-control" accept="image/*" onChange={handleImageChange} />
                </div>
                    {imagePreview && (
                        <div className="mb-3">
                            <img src={imagePreview} alt="Ảnh đại diện" style={{ maxWidth: '200px', maxHeight: '200px' }} className="mx-auto" />
                        </div>
                    )}
                {error && <p className="text-danger">{error}</p>}
                <button type="submit" className="btn btn-success me-2" disabled={loading}>{loading ? 'Đang lưu...' : 'Lưu'}</button>
                <button type="button" className="btn btn-secondary" onClick={onCancel}>Hủy</button>
            </form>
        </div>
    );
};

export default AddTour;
