import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../../style/BookingStatus.css';
import { BookingServices } from "../../services/BookingServices";

const CompanyPaymentStatus = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [paymentDetails, setPaymentDetails] = useState(null);
    const bookingService = new BookingServices();

    useEffect(() => {
        const fetchPaymentDetails = async () => {
            try {
                const params = new URLSearchParams(location.search);
                const transactionId = params.get('transactionId');
                const status = params.get('status');

                if (!transactionId) {
                    setError('Transaction ID not found');
                    setLoading(false);
                    return;
                }

                const response = await bookingService.getCompanyPaymentDetails(transactionId);
                console.log('API Response:', response); // Debug log

                if (response.status === 200 && response.data) {
                    setPaymentDetails({
                        ...response.data.data,
                        status: status || response.data.data.paymentStatus || 'pending'
                    });
                } else {
                    setError(response.message || 'No payment details found');
                }
            } catch (err) {
                console.error('Error fetching payment details:', err);
                setError(err.response?.data?.message || 'Failed to fetch payment details');
            } finally {
                setLoading(false);
            }
        };

        fetchPaymentDetails();
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
                    <button 
                        className="back-button"
                        onClick={() => navigate('/company/dashboard')}
                    >
                        Back to Dashboard
                    </button>
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
            case 'pending':
                return 'status-pending';
            default:
                return 'status-unknown';
        }
    };

    if (!paymentDetails) {
        return (
            <div className="error-container">
                <div className="error-message">
                    <h2>No Data</h2>
                    <p>No payment details available</p>
                    <button 
                        className="back-button"
                        onClick={() => navigate('/company/dashboard')}
                    >
                        Back to Dashboard
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="booking-status-container">
            <div className="booking-status-card">
                <h1 className="booking-status-title">Company Payment Status</h1>

                <div className="status-badge">
                    <span className={`status-indicator ${getStatusClass(paymentDetails.status)}`}>
                        {(paymentDetails.status || paymentDetails.paymentStatus || 'pending').toUpperCase()}
                    </span>
                </div>

                <div className="booking-details">
                    <div className="detail-row">
                        <span className="detail-label">Company Name:</span>
                        <span className="detail-value">{paymentDetails.companyName}</span>
                    </div>
                    <div className="detail-row">
                        <span className="detail-label">Transaction ID:</span>
                        <span className="detail-value">{paymentDetails.transactionId}</span>
                    </div>
                    <div className="detail-row">
                        <span className="detail-label">Total Amount:</span>
                        <span className="detail-value">
                            {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' })
                                .format(paymentDetails.amount)}
                        </span>
                    </div>
                    <div className="detail-row">
                        <span className="detail-label">Payment Status:</span>
                        <span className="detail-value">{paymentDetails.paymentStatus}</span>
                    </div>
                    <div className="detail-row">
                        <span className="detail-label">Payment Time:</span>
                        <span className="detail-value">
                            {paymentDetails.paymentTime ? new Date(paymentDetails.paymentTime).toLocaleString('vi-VN') : 'N/A'}
                        </span>
                    </div>
                    <div className="detail-row">
                        <span className="detail-label">Number of Transactions:</span>
                        <span className="detail-value">{paymentDetails.numberOfTransactions}</span>
                    </div>
                    <div className="detail-row">
                        <span className="detail-label">Payment Description:</span>
                        <span className="detail-value">{paymentDetails.paymentDetails}</span>
                    </div>
                </div>

                {paymentDetails.revenueTransactions && paymentDetails.revenueTransactions.length > 0 && (
                    <div className="revenue-transactions">
                        <h3>Revenue Transactions</h3>
                        {paymentDetails.revenueTransactions.map((transaction, index) => (
                            <div key={index} className="transaction-item">
                                <div className="detail-row">
                                    <span className="detail-label">Booking ID:</span>
                                    <span className="detail-value">{transaction.bookingId}</span>
                                </div>
                                <div className="detail-row">
                                    <span className="detail-label">Amount:</span>
                                    <span className="detail-value">
                                        {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' })
                                            .format(transaction.amount)}
                                    </span>
                                </div>
                                <div className="detail-row">
                                    <span className="detail-label">Processed Date:</span>
                                    <span className="detail-value">
                                        {new Date(transaction.processedDate).toLocaleString('vi-VN')}
                                    </span>
                                </div>
                                <div className="detail-row">
                                    <span className="detail-label">Notes:</span>
                                    <span className="detail-value">{transaction.notes}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                <div className="action-buttons">
                    <button
                        className="back-button"
                        onClick={() => navigate('/company/dashboard')}
                    >
                        Back to Dashboard
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CompanyPaymentStatus;