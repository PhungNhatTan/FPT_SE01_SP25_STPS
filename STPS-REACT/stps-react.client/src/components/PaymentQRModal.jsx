import React, { useState, useEffect } from 'react';
import PaymentService from '../services/PaymentService';

const PaymentQRModal = ({ bookingId, isOpen, onClose, onPaymentSuccess }) => {
    const [paymentData, setPaymentData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [confirming, setConfirming] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        if (isOpen && bookingId) {
            createPaymentQR();
        }
    }, [isOpen, bookingId]); // eslint-disable-line react-hooks/exhaustive-deps

    const createPaymentQR = async () => {
        setLoading(true);
        setError('');
        setPaymentData(null);

        console.log('Creating payment QR for booking:', bookingId);

        try {
            const response = await PaymentService.createPaymentQR(bookingId);
            console.log('Payment QR response:', response);
            console.log('Response structure:', JSON.stringify(response, null, 2));

            // Check if response has success property or direct data
            if (response && (response.success || response.data || response.bookingId)) {
                // If response has success property, use response.data
                // Otherwise, use response directly (API might return data directly)
                const paymentInfo = response.success ? response.data : response;
                setPaymentData(paymentInfo);
                console.log('Payment data set:', paymentInfo);
                console.log('Payment data structure:', JSON.stringify(paymentInfo, null, 2));
            } else {
                const errorMsg = response?.message || 'Không thể tạo QR thanh toán';
                console.error('Payment QR failed:', errorMsg);
                setError(errorMsg);
            }
        } catch (err) {
            console.error('Error creating payment QR:', err);
            const errorMsg = err.response?.data?.message || err.message || 'Có lỗi xảy ra khi tạo QR thanh toán';
            setError(`Lỗi API: ${errorMsg}`);
        }
        setLoading(false);
    };

    const confirmPayment = async () => {
        if (!paymentData?.transactionId) return;

        setConfirming(true);
        setError('');
        try {
            const response = await PaymentService.confirmPayment(bookingId, paymentData.transactionId);
            if (response.success) {
                alert('Thanh toán thành công!');
                onPaymentSuccess && onPaymentSuccess();
                onClose();
            } else {
                setError(response.message || 'Xác nhận thanh toán thất bại');
            }
        } catch (err) {
            console.error('Error confirming payment:', err);
            setError('Có lỗi xảy ra khi xác nhận thanh toán');
        }
        setConfirming(false);
    };

    console.log('PaymentQRModal render:', { isOpen, bookingId, loading, error, paymentData });

    if (!isOpen) return null;

    const modalStyles = {
        overlay: {
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0,0,0,0.8)',
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px',
            boxSizing: 'border-box'
        },
        modal: {
            width: '90%',
            maxWidth: '1200px',
            maxHeight: '90vh',
            backgroundColor: 'white',
            borderRadius: '20px',
            boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden'
        },
        header: {
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            borderRadius: '20px 20px 0 0',
            padding: '24px 32px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            color: 'white'
        },
        title: {
            margin: 0,
            fontSize: '24px',
            fontWeight: 'bold',
            display: 'flex',
            alignItems: 'center'
        },
        closeBtn: {
            background: 'none',
            border: 'none',
            color: 'white',
            fontSize: '28px',
            cursor: 'pointer',
            padding: '8px',
            borderRadius: '50%',
            width: '40px',
            height: '40px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
        },
        body: {
            flex: 1,
            padding: '32px',
            backgroundColor: '#f8f9fa',
            overflow: 'auto'
        },
        loading: {
            textAlign: 'center',
            padding: '60px 20px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
        },
        spinner: {
            width: '48px',
            height: '48px',
            border: '4px solid #f3f3f3',
            borderTop: '4px solid #007bff',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite'
        },
        error: {
            backgroundColor: '#f8d7da',
            color: '#721c24',
            padding: '16px',
            borderRadius: '8px',
            fontSize: '16px',
            textAlign: 'center',
            margin: '20px 0'
        },
        content: {
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '32px',
            height: '100%'
        },
        card: {
            backgroundColor: 'white',
            borderRadius: '15px',
            boxShadow: '0 8px 25px rgba(0,0,0,0.1)',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column'
        },
        cardHeader: {
            padding: '20px 24px',
            color: 'white',
            fontWeight: 'bold',
            fontSize: '18px'
        },
        cardBody: {
            padding: '24px',
            flex: 1
        },
        infoItem: {
            marginBottom: '20px',
            padding: '16px',
            borderRadius: '12px'
        },
        qrContainer: {
            display: 'flex',
            justifyContent: 'center',
            marginBottom: '24px'
        },
        qrCode: {
            width: '280px',
            height: '280px',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            borderRadius: '20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            flexDirection: 'column',
            boxShadow: '0 8px 25px rgba(0,0,0,0.15)'
        },
        footer: {
            background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
            borderRadius: '0 0 20px 20px',
            padding: '24px 32px',
            display: 'flex',
            justifyContent: 'flex-end',
            gap: '16px'
        },
        button: {
            padding: '12px 24px',
            borderRadius: '10px',
            border: 'none',
            fontSize: '16px',
            fontWeight: 'bold',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
        },
        cancelBtn: {
            backgroundColor: '#6c757d',
            color: 'white'
        },
        confirmBtn: {
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white',
            boxShadow: '0 4px 15px rgba(102, 126, 234, 0.4)'
        }
    };

    return (
        <div style={modalStyles.overlay}>
            <style>
                {`
                    @keyframes spin {
                        0% { transform: rotate(0deg); }
                        100% { transform: rotate(360deg); }
                    }
                    @media (max-width: 768px) {
                        .payment-content {
                            grid-template-columns: 1fr !important;
                        }
                    }
                `}
            </style>
            <div style={modalStyles.modal}>
                {/* Header */}
                <div style={modalStyles.header}>
                    <h2 style={modalStyles.title}>
                        <i className="fas fa-credit-card" style={{ marginRight: '12px' }}></i>
                        Thanh toán tour
                    </h2>
                    <button onClick={onClose} style={modalStyles.closeBtn}>
                        ×
                    </button>
                </div>

                {/* Body */}
                <div style={modalStyles.body}>
                    {loading ? (
                        <div style={modalStyles.loading}>
                            <div style={modalStyles.spinner}></div>
                            <p style={{ marginTop: '20px', fontSize: '18px', color: '#666' }}>
                                Đang tạo QR thanh toán...
                            </p>
                        </div>
                    ) : error ? (
                        <div style={modalStyles.error}>{error}</div>
                    ) : paymentData ? (
                        <div className="payment-content" style={modalStyles.content}>
                            {/* Bank Info Card */}
                            <div style={modalStyles.card}>
                                <div style={{
                                    ...modalStyles.cardHeader,
                                    background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)'
                                }}>
                                    <i className="fas fa-university" style={{ marginRight: '8px' }}></i>
                                    Thông tin chuyển khoản
                                </div>
                                <div style={modalStyles.cardBody}>
                                    <div style={{
                                        ...modalStyles.infoItem,
                                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                        color: 'white'
                                    }}>
                                        <div style={{ fontSize: '12px', opacity: 0.8 }}>NGÂN HÀNG</div>
                                        <div style={{ fontSize: '20px', fontWeight: 'bold' }}>
                                            {paymentData?.adminBankAccount?.bankName || 'N/A'}
                                        </div>
                                    </div>

                                    <div style={{
                                        ...modalStyles.infoItem,
                                        backgroundColor: 'white',
                                        border: '2px solid #007bff'
                                    }}>
                                        <div style={{ fontSize: '12px', color: '#007bff', fontWeight: 'bold' }}>SỐ TÀI KHOẢN</div>
                                        <div style={{ fontSize: '24px', fontWeight: 'bold', fontFamily: 'monospace' }}>
                                            {paymentData?.adminBankAccount?.accountNumber || 'N/A'}
                                        </div>
                                    </div>

                                    <div style={{
                                        ...modalStyles.infoItem,
                                        backgroundColor: 'white',
                                        border: '2px solid #17a2b8'
                                    }}>
                                        <div style={{ fontSize: '12px', color: '#17a2b8', fontWeight: 'bold' }}>TÊN TÀI KHOẢN</div>
                                        <div style={{ fontSize: '18px', fontWeight: 'bold' }}>
                                            {paymentData?.adminBankAccount?.accountHolderName || 'N/A'}
                                        </div>
                                    </div>

                                    <div style={{
                                        ...modalStyles.infoItem,
                                        background: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)',
                                        color: 'white'
                                    }}>
                                        <div style={{ fontSize: '12px', opacity: 0.8 }}>SỐ TIỀN</div>
                                        <div style={{ fontSize: '28px', fontWeight: 'bold' }}>
                                            {paymentData?.amount ? paymentData.amount.toLocaleString() : '0'} VND
                                        </div>
                                    </div>

                                    <div style={{
                                        ...modalStyles.infoItem,
                                        background: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)',
                                        border: '2px solid #ff9a56'
                                    }}>
                                        <div style={{ fontSize: '12px', fontWeight: 'bold' }}>NỘI DUNG</div>
                                        <div style={{ fontSize: '16px', fontWeight: 'bold' }}>
                                            {paymentData?.adminBankAccount?.paymentContent || 'N/A'}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* QR Code Card */}
                            <div style={modalStyles.card}>
                                <div style={{
                                    ...modalStyles.cardHeader,
                                    background: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)'
                                }}>
                                    <i className="fas fa-qrcode" style={{ marginRight: '8px' }}></i>
                                    QR Code thanh toán
                                </div>
                                <div style={{ ...modalStyles.cardBody, textAlign: 'center' }}>
                                    <div style={modalStyles.qrContainer}>
                                        <div style={modalStyles.qrCode}>
                                            <i className="fas fa-qrcode" style={{ fontSize: '64px', marginBottom: '16px' }}></i>
                                            <div style={{ fontSize: '20px', fontWeight: 'bold' }}>QR Code</div>
                                            <small style={{ opacity: 0.8 }}>(Mô phỏng thanh toán)</small>
                                        </div>
                                    </div>
                                    <div style={{
                                        background: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
                                        padding: '16px',
                                        borderRadius: '12px',
                                        color: '#2c3e50'
                                    }}>
                                        <i className="fas fa-mobile-alt" style={{ marginRight: '8px' }}></i>
                                        <strong>Quét mã QR bằng app ngân hàng để thanh toán nhanh</strong>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div style={{
                            textAlign: 'center',
                            padding: '40px',
                            backgroundColor: '#fff3cd',
                            borderRadius: '12px',
                            border: '2px solid #ffc107'
                        }}>
                            <h4 style={{ color: '#856404', marginBottom: '16px' }}>
                                ⚠️ Không có dữ liệu thanh toán
                            </h4>
                            <p style={{ color: '#856404', marginBottom: '16px' }}>
                                BookingId: {bookingId || 'Không có'}<br/>
                                Loading: {loading ? 'true' : 'false'}<br/>
                                Error: {error || 'Không có lỗi'}<br/>
                                PaymentData: {paymentData ? 'Có data' : 'Không có data'}
                            </p>
                            <button
                                onClick={createPaymentQR}
                                style={{
                                    backgroundColor: '#007bff',
                                    color: 'white',
                                    border: 'none',
                                    padding: '12px 24px',
                                    borderRadius: '8px',
                                    cursor: 'pointer',
                                    fontSize: '16px'
                                }}
                            >
                                Thử lại
                            </button>
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div style={modalStyles.footer}>
                    <button
                        onClick={onClose}
                        style={{ ...modalStyles.button, ...modalStyles.cancelBtn }}
                    >
                        <i className="fas fa-times"></i>
                        Hủy bỏ
                    </button>
                    {paymentData && (
                        <button
                            onClick={confirmPayment}
                            disabled={confirming}
                            style={{ ...modalStyles.button, ...modalStyles.confirmBtn }}
                        >
                            {confirming ? (
                                <>
                                    <div style={{
                                        width: '16px',
                                        height: '16px',
                                        border: '2px solid white',
                                        borderTop: '2px solid transparent',
                                        borderRadius: '50%',
                                        animation: 'spin 1s linear infinite'
                                    }}></div>
                                    Đang xử lý...
                                </>
                            ) : (
                                <>
                                    <i className="fas fa-check-circle"></i>
                                    Đã chuyển khoản
                                </>
                            )}
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default PaymentQRModal;
