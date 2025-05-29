import React, { useState } from 'react';
import RefundService from '../services/RefundService';

const CancelBookingModal = ({ booking, isOpen, onClose, onCancelSuccess }) => {
    const [formData, setFormData] = useState({
        customerBankAccount: '',
        customerBankName: '',
        customerAccountHolderName: '',
        reason: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!formData.customerBankAccount || !formData.customerBankName || !formData.customerAccountHolderName) {
            setError('Vui lòng điền đầy đủ thông tin tài khoản ngân hàng');
            return;
        }

        setLoading(true);
        setError('');
        
        try {
            const refundData = {
                bookingId: booking.bookingId,
                ...formData
            };
            
            const response = await RefundService.createRefundRequest(refundData);
            
            if (response.success) {
                alert('Yêu cầu hủy tour đã được gửi thành công! Tiền sẽ được hoàn lại trong vòng 24h.');
                onCancelSuccess && onCancelSuccess();
                onClose();
            } else {
                setError(response.message || 'Không thể hủy tour');
            }
        } catch (err) {
            console.error('Error cancelling booking:', err);
            setError('Có lỗi xảy ra khi hủy tour');
        }
        
        setLoading(false);
    };

    if (!isOpen || !booking) return null;

    // Tính toán số tiền hoàn lại
    const refundAmount = booking.totalAmount * 0.9; // 90%
    const cancellationFee = booking.totalAmount * 0.1; // 10%

    return (
        <div className="modal fade show" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <div className="modal-dialog modal-lg">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Hủy tour - {booking.tourName}</h5>
                        <button type="button" className="btn-close" onClick={onClose}></button>
                    </div>
                    <div className="modal-body">
                        <div className="alert alert-warning">
                            <h6>Điều khoản hủy tour:</h6>
                            <ul>
                                <li>Phí hủy tour: 10% tổng giá trị</li>
                                <li>Số tiền hoàn lại: 90% tổng giá trị</li>
                                <li>Tiền sẽ được hoàn lại trong vòng 24 giờ</li>
                            </ul>
                        </div>

                        <div className="row mb-3">
                            <div className="col-md-6">
                                <strong>Tổng tiền tour:</strong> {booking.totalAmount?.toLocaleString()} VND
                            </div>
                            <div className="col-md-6">
                                <strong>Phí hủy (10%):</strong> {cancellationFee.toLocaleString()} VND
                            </div>
                        </div>
                        <div className="row mb-4">
                            <div className="col-12">
                                <h6 className="text-success">Số tiền hoàn lại: {refundAmount.toLocaleString()} VND</h6>
                            </div>
                        </div>

                        <form onSubmit={handleSubmit}>
                            <h6>Thông tin tài khoản nhận hoàn tiền:</h6>
                            
                            <div className="mb-3">
                                <label className="form-label">Số tài khoản *</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="customerBankAccount"
                                    value={formData.customerBankAccount}
                                    onChange={handleChange}
                                    placeholder="Nhập số tài khoản"
                                    required
                                />
                            </div>

                            <div className="mb-3">
                                <label className="form-label">Tên ngân hàng *</label>
                                <select
                                    className="form-control"
                                    name="customerBankName"
                                    value={formData.customerBankName}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="">Chọn ngân hàng</option>
                                    <option value="Vietcombank">Vietcombank</option>
                                    <option value="Techcombank">Techcombank</option>
                                    <option value="BIDV">BIDV</option>
                                    <option value="VietinBank">VietinBank</option>
                                    <option value="Agribank">Agribank</option>
                                    <option value="MB Bank">MB Bank</option>
                                    <option value="ACB">ACB</option>
                                    <option value="VPBank">VPBank</option>
                                    <option value="Sacombank">Sacombank</option>
                                    <option value="TPBank">TPBank</option>
                                </select>
                            </div>

                            <div className="mb-3">
                                <label className="form-label">Tên chủ tài khoản *</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="customerAccountHolderName"
                                    value={formData.customerAccountHolderName}
                                    onChange={handleChange}
                                    placeholder="Nhập tên chủ tài khoản"
                                    required
                                />
                            </div>

                            <div className="mb-3">
                                <label className="form-label">Lý do hủy (tùy chọn)</label>
                                <textarea
                                    className="form-control"
                                    name="reason"
                                    value={formData.reason}
                                    onChange={handleChange}
                                    rows="3"
                                    placeholder="Nhập lý do hủy tour..."
                                ></textarea>
                            </div>

                            {error && (
                                <div className="alert alert-danger">{error}</div>
                            )}

                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={onClose}>
                                    Đóng
                                </button>
                                <button 
                                    type="submit" 
                                    className="btn btn-danger"
                                    disabled={loading}
                                >
                                    {loading ? 'Đang xử lý...' : 'Xác nhận hủy tour'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CancelBookingModal;
