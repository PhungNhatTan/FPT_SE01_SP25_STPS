// history.jsx

import React, { useState, useEffect } from "react";
import "../../style/history.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./header";
import { useNavigate } from "react-router-dom";
// import tourHistoryData from "./data/tourHistoryData"; // Default import - removed
import { TourServices } from "../../services/TourSevices";
import PaymentQRModal from "../../components/PaymentQRModal";
import CancelBookingModal from "../../components/CancelBookingModal";
import RefundService from "../../services/RefundService";

const History = () => {
    // const [tours, setTours] = useState(tourHistoryData); // removed
    const [selectedTour, setSelectedTour] = useState(null); // Mặc định không chọn tour nào
    const [feedback, setFeedback] = useState("");
    const navigate = useNavigate();  // Khởi tạo useNavigate

    const handleSelectTour = (tour) => {
        setSelectedTour(tour);
        setFeedback(""); // Reset feedback khi chọn tour mới
    };

    const handleFeedbackChange = (event) => {
        setFeedback(event.target.value);
    };

    const handleFeedbackSubmit = () => {
        if (feedback.trim()) {
            // TODO: Implement feedback submission to API
            console.log("Feedback submitted:", feedback);
            setFeedback(""); // Xóa nội dung sau khi gửi
        }
    };

    const handleDeleteFeedback = (index) => {
        // TODO: Implement feedback deletion from API
        console.log("Delete feedback at index:", index);
    };

    const handleViewTourDetail = (tourId) => {
        navigate(`/tourdetail/${tourId}`);  // Điều hướng đến trang chi tiết tour
    };

    const [hitoryTour, setHitoryTour] = useState([]);
    const [selectedBooking, setSelectedBooking] = useState(null);
    const [showPaymentModal, setShowPaymentModal] = useState(false);
    const [showCancelModal, setShowCancelModal] = useState(false);
    const [bookingCanCancel, setBookingCanCancel] = useState({});
    const _tourService = new TourServices();

    useEffect(() => {
        const fetchTourData = async () => {
            try {
                // Lấy userId từ localStorage
                const userId = localStorage.getItem('userId');

                if (!userId) {
                    console.error("Không tìm thấy userId trong localStorage");
                    navigate('/login'); // Chuyển hướng đến trang đăng nhập nếu không có userId
                    return;
                }

                console.log("Đang lấy lịch sử đặt tour cho userId:", userId);

                const dataResponse = await _tourService.getTourHistory(userId);
                const bookings = dataResponse.data.data;
                await setHitoryTour(bookings);
                console.log("Dữ liệu lịch sử tour:", bookings);

                // Check cancel status for each booking
                const cancelStatus = {};
                for (const booking of bookings) {
                    try {
                        const canCancelResponse = await RefundService.canCancelBooking(booking.bookingId);
                        cancelStatus[booking.bookingId] = canCancelResponse.data.canCancel;
                    } catch (error) {
                        console.error(`Error checking cancel status for booking ${booking.bookingId}:`, error);
                        cancelStatus[booking.bookingId] = false;
                    }
                }
                setBookingCanCancel(cancelStatus);

            } catch (error) {
                console.error("Lỗi khi fetch lịch sử đặt tour:", error);
            }
        };

        fetchTourData();
    }, [navigate]);

    // Payment handlers
    const handlePayment = (booking) => {
        setSelectedBooking(booking);
        setShowPaymentModal(true);
    };

    const handlePaymentSuccess = () => {
        // Refresh booking history
        const userId = localStorage.getItem('userId');
        if (userId) {
            const fetchTourData = async () => {
                try {
                    const dataResponse = await _tourService.getTourHistory(userId);
                    setHitoryTour(dataResponse.data.data);
                } catch (error) {
                    console.error("Error refreshing booking history:", error);
                }
            };
            fetchTourData();
        }
    };

    // Cancel handlers
    const handleCancel = (booking) => {
        setSelectedBooking(booking);
        setShowCancelModal(true);
    };

    const handleCancelSuccess = () => {
        // Refresh booking history
        const userId = localStorage.getItem('userId');
        if (userId) {
            const fetchTourData = async () => {
                try {
                    const dataResponse = await _tourService.getTourHistory(userId);
                    const bookings = dataResponse.data.data;
                    setHitoryTour(bookings);

                    // Update cancel status
                    const cancelStatus = {};
                    for (const booking of bookings) {
                        try {
                            const canCancelResponse = await RefundService.canCancelBooking(booking.bookingId);
                            cancelStatus[booking.bookingId] = canCancelResponse.data.canCancel;
                        } catch (error) {
                            cancelStatus[booking.bookingId] = false;
                        }
                    }
                    setBookingCanCancel(cancelStatus);
                } catch (error) {
                    console.error("Error refreshing booking history:", error);
                }
            };
            fetchTourData();
        }
    };

    return (
        <>
            <header className="header">
                <Header />
            </header>
            <div className="container history-container">
                <div className="row">
                    <div className="col-md-12 text-center my-4">
                        <h2>Lịch sử đặt tour</h2>
                    </div>
                </div>
                <div className="row">
                    {/* Danh sách tour */}
                    {/* <div className="col-md-5">
                        <div className="list-group">
                            {tours.map((tour) => (
                                <button
                                    key={tour.id}
                                    className={`list-group-item list-group-item-action tour-item ${selectedTour.id === tour.id ? "active" : ""}`}
                                    onClick={() => handleSelectTour(tour)}
                                >
                                    <h5>{tour.name}</h5>
                                    <p>
                                        <strong>Ngày đi:</strong> {tour.startDate} - <strong>Ngày về:</strong> {tour.endDate}
                                    </p>
                                    <p>
                                        <strong>Người lớn:</strong> {tour.adults} | <strong>Trẻ em:</strong> {tour.children}
                                    </p>
                                    <p>
                                        <strong>Giá vé Người lớn:</strong> {tour.adultPrice.toLocaleString()} VND
                                    </p>
                                    <p>
                                        <strong>Giá vé Trẻ em:</strong> {tour.childPrice.toLocaleString()} VND
                                    </p>
                                </button>
                            ))}
                        </div>
                    </div> */}

                    <div className="col-md-5">
                        <div className="list-group">
                            {Array.isArray(hitoryTour) && hitoryTour.map((tour) => (
                                <div
                                    key={tour.bookingId}
                                    className={`list-group-item tour-item ${selectedTour?.bookingId === tour.bookingId ? "active" : ""}`}
                                    onClick={() => handleSelectTour(tour)}
                                    style={{ cursor: 'pointer' }}
                                >
                                    <h5>{tour.tourName}</h5>
                                    <p>
                                        <strong>Ngày đi:</strong> {tour.tourDate} - <strong>Ngày về:</strong> {tour.tourDate}
                                    </p>
                                    <p>
                                        <strong>Người lớn:</strong> {tour.adultCount} | <strong>Trẻ em:</strong> {tour.childCount}
                                    </p>
                                    <p>
                                        <strong>Giá vé Người lớn:</strong> {tour.adultPrice ? tour.adultPrice.toLocaleString() : (tour.totalAmount / tour.adultCount).toLocaleString()} VND
                                    </p>
                                    <p>
                                        <strong>Giá vé Trẻ em:</strong> {tour.childPrice ? tour.childPrice.toLocaleString() : (tour.childCount > 0 ? (tour.totalAmount * 0.7 / tour.childCount).toLocaleString() : "0")} VND
                                    </p>
                                    <p>
                                        <strong>Tổng tiền:</strong> {tour.totalAmount.toLocaleString()} VND
                                    </p>
                                    <p>
                                        <strong>Trạng thái:</strong>
                                        <span className={` ${
                                            tour.paymentStatus === 'Đã thanh toán' ? 'bg-success' :
                                            tour.paymentStatus === 'Chưa thanh toán' ? 'bg-warning' : 'bg-secondary'
                                        }`}>
                                            
                                            {tour.paymentStatus}
                                        </span>
                                        <span className={` ${
                                            tour.status === 'Đã xác nhận' ? 'bg-success' :
                                            tour.status === 'Đã hủy' ? 'bg-danger' : 'bg-info'
                                        }`}>
                                            {tour.status}
                                        </span>
                                    </p>

                                    {/* Action buttons */}
                                    <div className="mt-2">
                                        {tour.paymentStatus === 'Chưa thanh toán' && (
                                            <button
                                                className="btn btn-primary btn-sm me-2"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handlePayment(tour);
                                                }}
                                            >
                                                Thanh toán
                                            </button>
                                        )}

                                        {tour.paymentStatus === 'Đã thanh toán' &&
                                         tour.status !== 'Đã hủy' &&
                                         bookingCanCancel[tour.bookingId] && (
                                            <button
                                                className="btn btn-danger btn-sm me-2"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleCancel(tour);
                                                }}
                                            >
                                                Hủy tour
                                            </button>
                                        )}

                                        
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Chi tiết tour */}
                    <div className="col-md-7">
                        {selectedTour ? (
                            <div className="card tour-detail">
                                <div className="card-body">
                                    <h4 className="card-title">{selectedTour.tourName}</h4>
                                    <p><strong>Ngày đi:</strong> {selectedTour.tourDate}</p>
                                    <p><strong>Số lượng:</strong> {selectedTour.adultCount} Người lớn, {selectedTour.childCount} Trẻ em</p>
                                    <p><strong>Giá vé Người lớn:</strong> {selectedTour.adultPrice ? selectedTour.adultPrice.toLocaleString() : (selectedTour.totalAmount / selectedTour.adultCount).toLocaleString()} VND</p>
                                    <p><strong>Giá vé Trẻ em:</strong> {selectedTour.childPrice ? selectedTour.childPrice.toLocaleString() : (selectedTour.childCount > 0 ? (selectedTour.totalAmount * 0.7 / selectedTour.childCount).toLocaleString() : "0")} VND</p>
                                    <p><strong>Tổng tiền:</strong> {selectedTour.totalAmount.toLocaleString()} VND</p>
                                    <p>
                                        <strong>Trạng thái thanh toán:</strong>
                                        <span className={` ${
                                            selectedTour.paymentStatus === 'Đã thanh toán' ? 'bg-success' :
                                            selectedTour.paymentStatus === 'Chưa thanh toán' ? 'bg-warning' : 'bg-secondary'
                                        }`}>
                                            {selectedTour.paymentStatus}
                                        </span>
                                    </p>
                                    <p>
                                        <strong>Trạng thái tour:</strong>
                                        <span className={` ${
                                            selectedTour.status === 'Đã xác nhận' ? 'bg-success' :
                                            selectedTour.status === 'Đã hủy' ? 'bg-danger' : 'bg-info'
                                        }`}>
                                            {selectedTour.status}
                                        </span>
                                    </p>

                                    <div className="mt-3">
                                        

                                        {selectedTour.paymentStatus === 'Chưa thanh toán' && (
                                            <button
                                                className="btn btn-primary me-2"
                                                onClick={() => handlePayment(selectedTour)}
                                            >
                                                Thanh toán
                                            </button>
                                        )}

                                        {selectedTour.paymentStatus === 'Đã thanh toán' &&
                                         selectedTour.status !== 'Đã hủy' &&
                                         bookingCanCancel[selectedTour.bookingId] && (
                                            <button
                                                className="btn btn-danger"
                                                onClick={() => handleCancel(selectedTour)}
                                            >
                                                Hủy tour
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="alert alert-info">
                                <h5>Chọn một tour từ danh sách để xem chi tiết</h5>
                                <p>Bạn có thể xem thông tin chi tiết, thanh toán hoặc hủy tour từ danh sách bên trái.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Payment Modal */}
            <PaymentQRModal
                bookingId={selectedBooking?.bookingId}
                isOpen={showPaymentModal}
                onClose={() => setShowPaymentModal(false)}
                onPaymentSuccess={handlePaymentSuccess}
            />

            {/* Cancel Modal */}
            <CancelBookingModal
                booking={selectedBooking}
                isOpen={showCancelModal}
                onClose={() => setShowCancelModal(false)}
                onCancelSuccess={handleCancelSuccess}
            />
        </>
    );
};

export default History;
