import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Result, Button, Spin } from 'antd';
import PaymentService from '../services/PaymentService';

const PaymentCallback = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [bookingDetails, setBookingDetails] = useState(null);

    useEffect(() => {
        const fetchBookingDetails = async () => {
            try {
                const searchParams = new URLSearchParams(location.search);
                const bookingId = searchParams.get('bookingId');
                
                if (bookingId) {
                    const response = await PaymentService.getPaymentTransaction(bookingId);
                    if (response.success) {
                        setBookingDetails(response.data);
                    }
                }
            } catch (error) {
                console.error('Error fetching booking details:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchBookingDetails();
    }, [location]);

    const handleBackToHome = () => {
        navigate('/');
    };

    const handleViewBooking = () => {
        if (bookingDetails?.bookingId) {
            navigate(`/booking/${bookingDetails.bookingId}`);
        }
    };

    if (loading) {
        return (
            <div style={{ textAlign: 'center', padding: '50px' }}>
                <Spin size="large" />
                <p>Loading booking details...</p>
            </div>
        );
    }

    const isSuccess = location.pathname.includes('/success');

    return (
        <Result
            status={isSuccess ? 'success' : 'error'}
            title={isSuccess ? 'Payment Successful' : 'Payment Failed'}
            subTitle={
                isSuccess
                    ? 'Your payment has been processed successfully. You can view your booking details below.'
                    : 'There was an error processing your payment. Please try again or contact support.'
            }
            extra={[
                <Button type="primary" key="home" onClick={handleBackToHome}>
                    Back to Home
                </Button>,
                isSuccess && bookingDetails && (
                    <Button key="booking" onClick={handleViewBooking}>
                        View Booking Details
                    </Button>
                )
            ]}
        />
    );
};

export default PaymentCallback; 