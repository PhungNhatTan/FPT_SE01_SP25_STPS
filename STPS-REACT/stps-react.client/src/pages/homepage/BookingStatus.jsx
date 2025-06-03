import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { BookingServices } from '../../services/BookingServices';
import '../../style/BookingStatus.css';

const BookingStatus = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [bookingDetails, setBookingDetails] = useState(null);
    const bookingService = new BookingServices();

    useEffect(() => {
        const fetchBookingDetails = async () => {
            try {
                const params = new URLSearchParams(location.search);
                const bookingId = params.get('bookingId');
                const status = params.get('status');

                if (!bookingId) {
                    setError('Booking ID not found');
                    setLoading(false);
                    return;
                }

                const response = await bookingService.getBookingDetails(bookingId);
                setBookingDetails({
                    ...response.data,
                    status: status || 'pending'
                });
            } catch (err) {
                console.error('Error fetching booking details:', err);
                setError(err.response?.data?.message || 'Failed to fetch booking details');
            } finally {
                setLoading(false);
            }
        };

        fetchBookingDetails();
    }, [location]);

    if (loading) {
        return (
            <div className="loading-container">
                <div className="loading-spinner"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="error-container">
                <div className="error-message">
                    <h2>Error</h2>
                    <p>{error}</p>
                </div>
            </div>
        );
    }

    const getStatusClass = (status) => {
        switch (status?.toLowerCase()) {
            case 'success':
                return 'status-success';
            case 'failed':
                return 'status-failed';
            default:
                return 'status-pending';
        }
    };

    return (
        <div className="booking-status-container">
            <div className="booking-status-card">
                <h1 className="booking-status-title">Booking Status</h1>

                {bookingDetails && (
                    <>
                        <div className="status-badge">
                            <span className={`status-indicator ${getStatusClass(bookingDetails.status)}`}>
                                {bookingDetails.status.toUpperCase()}
                            </span>
                        </div>

                        <div className="booking-details">
                            {bookingDetails.isRefund && bookingDetails.refund ? (
                                <>
                                    <div className="detail-row">
                                        <span className="detail-label">Số tiền hoàn:</span>
                                        <span className="detail-value">
                                            {bookingDetails.refund.refundAmount?.toLocaleString('vi-VN')} VND
                                        </span>
                                    </div>
                                    <div className="detail-row">
                                        <span className="detail-label">Trạng thái hoàn:</span>
                                        <span className="detail-value">{bookingDetails.refund.refundStatus}</span>
                                    </div>
                                    <div className="detail-row">
                                        <span className="detail-label">Ngày xử lý hoàn:</span>
                                        <span className="detail-value">
                                            {bookingDetails.refund.refundProcessedDate
                                                ? new Date(bookingDetails.refund.refundProcessedDate).toLocaleString('vi-VN')
                                                : 'N/A'}
                                        </span>
                                    </div>
                                    <div className="detail-row">
                                        <span className="detail-label">Lý do hoàn:</span>
                                        <span className="detail-value">{bookingDetails.refund.refundReason}</span>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <div className="detail-row">
                                        <span className="detail-label">Tour Name:</span>
                                        <span className="detail-value">{bookingDetails.tourName}</span>
                                    </div>
                                    <div className="detail-row">
                                        <span className="detail-label">Booking ID:</span>
                                        <span className="detail-value">{bookingDetails.bookingId}</span>
                                    </div>
                                    <div className="detail-row">
                                        <span className="detail-label">Total Amount:</span>
                                        <span className="detail-value">
                                            {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' })
                                                .format(bookingDetails.totalAmount)}
                                        </span>
                                    </div>
                                    <div className="detail-row">
                                        <span className="detail-label">Payment Status:</span>
                                        <span className="detail-value">{bookingDetails.paymentStatus}</span>
                                    </div>
                                    <div className="detail-row">
                                        <span className="detail-label">Payment Time:</span>
                                        <span className="detail-value">
                                            {bookingDetails.paymentTime ? new Date(bookingDetails.paymentTime).toLocaleString('vi-VN') : 'N/A'}
                                        </span>
                                    </div>
                                    <div className="detail-row">
                                        <span className="detail-label">Number of Guests:</span>
                                        <span className="detail-value">{bookingDetails.numberOfGuests}</span>
                                    </div>
                                    <div className="detail-row">
                                        <span className="detail-label">Tour Date:</span>
                                        <span className="detail-value">
                                            {new Date(bookingDetails.tourDate).toLocaleDateString('vi-VN')}
                                        </span>
                                    </div>
                                    <div className="detail-row">
                                        <span className="detail-label">Passenger Name:</span>
                                        <span className="detail-value">{bookingDetails.passengerName}</span>
                                    </div>
                                </>
                            )}
                        </div>

                        <div className="action-buttons">
                            <button
                                className="back-button"
                                onClick={() => navigate('/')}
                            >
                                Back to Bookings
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default BookingStatus; 