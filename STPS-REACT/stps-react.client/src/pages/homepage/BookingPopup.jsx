import React, { useState } from 'react';
import axios from 'axios';
import { API_URL } from '../../config';
import PaymentService from '../../services/PaymentService';

const BookingPopup = ({ isOpen, onClose, tour }) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const bookNow = async () => {
        try {
            setLoading(true);
            setError(null);

            // Step 1: Create booking in database
            const bookingResponse = await axios.post(`${API_URL}/api/Tours/Book`, {
                tourId: tour.id,
                userId: localStorage.getItem('userId'), // Get from your auth system
                numberOfPeople: numberOfPeople,
                totalPrice: totalPrice,
                paymentMethod: 'VNPay'
            });

            if (!bookingResponse.data.success) {
                throw new Error(bookingResponse.data.message || 'Failed to create booking');
            }

            const booking = bookingResponse.data.data;

            // Step 2: Create payment QR if payment method is VNPay
            if (booking.paymentMethod === 'VNPay') {
                const paymentResponse = await PaymentService.createPaymentQR(
                    booking.id,
                    booking.totalPrice,
                    `Payment for tour: ${tour.name}`
                );

                if (paymentResponse.success && paymentResponse.data.paymentUrl) {
                    // Step 3: Redirect to VNPay payment page
                    window.location.href = paymentResponse.data.paymentUrl;
                } else {
                    throw new Error('Failed to create payment URL');
                }
            }
        } catch (err) {
            setError(err.message || 'An error occurred while processing your booking');
            console.error('Booking error:', err);
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <div className="modal-header">
                    <h2>Book Tour</h2>
                    <button className="close-button" onClick={onClose}>&times;</button>
                </div>
                <div className="modal-body">
                    {error && (
                        <div className="error-message">
                            {error}
                        </div>
                    )}
                    
                    {/* Your existing booking form fields */}
                    
                    <div className="booking-actions">
                        <button 
                            onClick={bookNow} 
                            className="booking-btn"
                            disabled={loading}
                        >
                            {loading ? 'Processing...' : 'Xác nhận thanh toán'}
                        </button>
                    </div>
                </div>
            </div>

            <style jsx>{`
                .modal-overlay {
                    position: fixed;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background-color: rgba(0, 0, 0, 0.5);
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    z-index: 1000;
                }

                .modal-content {
                    background: white;
                    padding: 20px;
                    border-radius: 8px;
                    width: 90%;
                    max-width: 500px;
                }

                .modal-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 20px;
                }

                .close-button {
                    background: none;
                    border: none;
                    font-size: 24px;
                    cursor: pointer;
                }

                .error-message {
                    background-color: #ffebee;
                    color: #c62828;
                    padding: 10px;
                    border-radius: 4px;
                    margin-bottom: 15px;
                }

                .booking-btn {
                    background-color: #4CAF50;
                    color: white;
                    padding: 10px 20px;
                    border: none;
                    border-radius: 4px;
                    cursor: pointer;
                    font-size: 16px;
                    width: 100%;
                }

                .booking-btn:disabled {
                    background-color: #cccccc;
                    cursor: not-allowed;
                }

                .booking-btn:hover:not(:disabled) {
                    background-color: #45a049;
                }
            `}</style>
        </div>
    );
};

export default BookingPopup; 