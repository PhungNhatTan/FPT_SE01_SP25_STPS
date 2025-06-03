import React, { useState } from 'react';
import PaymentService from '../services/PaymentService';

const PaymentModal = ({ visible, onClose, bookingId, amount, tourName }) => {
    const [loading, setLoading] = useState(false);
    const [paymentData, setPaymentData] = useState(null);

    const handlePayment = async () => {
        try {
            setLoading(true);
            const response = await PaymentService.createVNPayPayment(
                bookingId,
                amount,
                `Payment for tour ${tourName}`
            );

            if (response.success) {
                setPaymentData(response.data);
            } else {
                alert('Failed to create payment');
            }
        } catch (error) {
            console.error('Payment error:', error);
            alert('Error creating payment');
        } finally {
            setLoading(false);
        }
    };

    const handleRedirectToPayment = () => {
        if (paymentData?.paymentUrl) {
            window.location.href = paymentData.paymentUrl;
        }
    };

    if (!visible) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <div className="modal-header">
                    <h2>Payment</h2>
                    <button className="close-button" onClick={onClose}>&times;</button>
                </div>
                <div className="modal-body">
                    {loading ? (
                        <div className="loading-container">
                            <div className="spinner"></div>
                            <p>Creating payment...</p>
                        </div>
                    ) : !paymentData ? (
                        <div className="payment-init">
                            <h3>Payment Amount: {amount.toLocaleString('vi-VN')} VND</h3>
                            <button className="payment-button" onClick={handlePayment}>
                                Proceed to Payment
                            </button>
                        </div>
                    ) : (
                        <div className="payment-options">
                            <h3>Choose Payment Method</h3>
                            <div className="payment-methods">
                                <button 
                                    className="payment-button"
                                    onClick={handleRedirectToPayment}
                                >
                                    Pay with VNPay
                                </button>
                                
                                {paymentData.paymentUrl && (
                                    <div className="qr-code">
                                        <img 
                                            src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(paymentData.paymentUrl)}`}
                                            alt="Payment QR Code"
                                        />
                                        <p>Scan QR code to pay</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
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

                .loading-container {
                    text-align: center;
                    padding: 20px;
                }

                .spinner {
                    border: 4px solid #f3f3f3;
                    border-top: 4px solid #3498db;
                    border-radius: 50%;
                    width: 40px;
                    height: 40px;
                    animation: spin 1s linear infinite;
                    margin: 0 auto;
                }

                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }

                .payment-button {
                    background-color: #4CAF50;
                    color: white;
                    padding: 10px 20px;
                    border: none;
                    border-radius: 4px;
                    cursor: pointer;
                    font-size: 16px;
                    margin: 10px 0;
                }

                .payment-button:hover {
                    background-color: #45a049;
                }

                .qr-code {
                    margin-top: 20px;
                    text-align: center;
                }

                .qr-code img {
                    max-width: 200px;
                    margin: 0 auto;
                }
            `}</style>
        </div>
    );
};

export default PaymentModal; 