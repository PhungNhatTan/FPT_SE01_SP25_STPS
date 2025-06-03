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
import { BookingServices } from "../../services/BookingServices";
import PaymentService from "../../services/PaymentService";
import Select from 'react-select';

const customSelectStyles = {
  control: (provided, state) => ({
    ...provided,
    width: '100%',
    minHeight: '38px',
    borderColor: state.isFocused ? '#86b7fe' : '#ced4da',
    boxShadow: state.isFocused ? '0 0 0 0.2rem rgba(13,110,253,.25)' : null,
    '&:hover': { borderColor: '#86b7fe' },
    fontSize: '1rem'
  }),
  container: (provided) => ({
    ...provided,
    width: '100%'
  }),
  option: (provided, state) => ({
    ...provided,
    display: 'flex',
    alignItems: 'center',
    fontSize: '1rem',
    backgroundColor: state.isSelected
      ? '#0d6efd'
      : state.isFocused
      ? '#e7f1ff'
      : 'white',
    color: state.isSelected ? 'white' : '#212529',
    padding: '8px 12px'
  }),
  singleValue: (provided) => ({
    ...provided,
    display: 'flex',
    alignItems: 'center'
  }),
  menu: (provided) => ({
    ...provided,
    zIndex: 9999,
    position: 'absolute'
  }),
  menuPortal: (provided) => ({
    ...provided,
    zIndex: 9999
  })
};

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
    const bookingService = new BookingServices();
    const [showRefundModal, setShowRefundModal] = useState(false);
    const [refundBankList, setRefundBankList] = useState([]);
    const [refundBank, setRefundBank] = useState('');
    const [refundAccountName, setRefundAccountName] = useState('');
    const [refundAccountNumber, setRefundAccountNumber] = useState('');
    const [refundBooking, setRefundBooking] = useState(null);

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
    const handlePayment = async (tour) => {
        const paymentResponse = await PaymentService.createPaymentQR(
            tour.bookingId,
            tour.totalAmount,
            `Payment for tour: ${tour.tourName}`
        );

        if (paymentResponse.success && paymentResponse.data.paymentUrl) {
            // Step 3: Redirect to VNPay payment page
            window.location.href = paymentResponse.data.paymentUrl;
        } else {
            throw new Error('Failed to create payment URL');
        }
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
    const handleCancel = async (booking) => {
        // Check if tour date is more than 5 days away
        const tourDate = new Date(booking.tourDate);
        const today = new Date();
        const daysUntilTour = (tourDate - today) / (1000 * 60 * 60 * 24);

        if (daysUntilTour <= 5) {
            alert("Cannot cancel booking. Tour starts in less than 5 days.");
            return;
        }

        // Fetch bank list if not already loaded
        if (refundBankList.length === 0) {
            try {
                const res = await fetch('https://api.vietqr.io/v2/banks');
                const data = await res.json();
                if (data.code === "00") setRefundBankList(data.data);
            } catch (e) {
                alert("Không thể tải danh sách ngân hàng!");
            }
        }
        setRefundBooking(booking);
        setShowRefundModal(true);
    };

    const canCancelBooking = (booking) => {
        // Check if payment was made
        if (booking.paymentStatus !== 'Đã thanh toán') {
            return false;
        }

        // Check if booking is already cancelled
        if (booking.status === 'Đã hủy') {
            return false;
        }

        // Check if tour date is more than 5 days away
        const tourDate = new Date(booking.tourDate);
        const today = new Date();
        const daysUntilTour = (tourDate - today) / (1000 * 60 * 60 * 24);

        return daysUntilTour > 5;
    };

    const bankOptions = refundBankList.map(bank => ({
        value: bank.bin,
        label: bank.code + "-" + bank.name,
        logo: bank.logo
    }));

    return (
        <>
            <header className="header">
                <Header />
            </header>
            <div className="">
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

                    <div className="col-12">
                        <div className="table-responsive">
                            <table className="table table-striped table-hover align-middle">
                                <thead className="table-dark">
                                    <tr>
                                        <th>Tên Tour</th>
                                        <th>Ngày đi</th>
                                        <th>Người lớn</th>
                                        <th>Trẻ em</th>
                                        <th>Tổng tiền</th>
                                        <th>Thanh toán</th>
                                        <th>Trạng thái</th>
                                        <th>Hành động</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {Array.isArray(hitoryTour) && hitoryTour.map((tour) => (
                                        <tr
                                            key={tour.bookingId}
                                            className={selectedTour?.bookingId === tour.bookingId ? "table-primary" : ""}
                                            style={{ cursor: 'pointer' }}
                                            onClick={() => handleSelectTour(tour)}
                                        >
                                            <td>{tour.tourName}</td>
                                            <td>{tour.tourDate}</td>
                                            <td>{tour.adultCount}</td>
                                            <td>{tour.childCount}</td>
                                            <td>{tour.totalAmount.toLocaleString()} VND</td>
                                            <td>
                                                <span className={`p-2 text-white ${tour.paymentStatus === 'Đã thanh toán' ? 'bg-success' : tour.paymentStatus === 'Chưa thanh toán' ? 'bg-warning text-dark' : 'bg-secondary'}`}>
                                                    {tour.paymentStatus}
                                                </span>
                                            </td>
                                            <td>
                                                <span className={`p-2 text-white ${tour.status === 'Đã xác nhận' ? 'bg-success' : tour.status === 'Đã hủy' ? 'bg-danger' : tour.status === 'Yêu cầu hủy tour' ? 'bg-warning text-dark' : 'bg-info'}`}>
                                                    {tour.status}
                                                </span>
                                            </td>
                                            <td>
                                                {tour.paymentStatus === 'Chưa thanh toán' && (
                                                    <button
                                                        className="btn btn-primary btn-sm me-2"
                                                        onClick={e => { e.stopPropagation(); handlePayment(tour); }}
                                                    >
                                                        Thanh toán
                                                    </button>
                                                )}
                                                {tour.paymentStatus === 'Đã thanh toán' &&
                                                    tour.status !== 'Đã hủy' &&
                                                    tour.status !== 'Yêu cầu hủy tour' &&
                                                    canCancelBooking(tour) && (
                                                        <button
                                                            className="btn btn-warning btn-sm"
                                                            onClick={e => { e.stopPropagation(); handleCancel(tour); }}
                                                        >
                                                            Yêu cầu hủy
                                                        </button>
                                                    )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Chi tiết tour */}
                    <div className="col-md-12">
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
                                        <span className={`p-2 text-white ${
                                            selectedTour.paymentStatus === 'Đã thanh toán' ? 'bg-success' :
                                            selectedTour.paymentStatus === 'Chưa thanh toán' ? 'bg-warning' : 'bg-secondary'
                                        }`}>
                                            {selectedTour.paymentStatus}
                                        </span>
                                    </p>
                                    <p>
                                        <strong>Trạng thái tour:</strong>
                                        <span className={`p-2 text-white ${
                                            selectedTour.status === 'Đã xác nhận' ? 'bg-success' :
                                            selectedTour.status === 'Đã hủy' ? 'bg-danger' :
                                            selectedTour.status === 'Yêu cầu hủy tour' ? 'bg-warning' : 'bg-info'
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
                                         selectedTour.status !== 'Yêu cầu hủy tour' &&
                                         canCancelBooking(selectedTour) && (
                                            <button
                                                className="btn btn-warning"
                                                onClick={() => handleCancel(selectedTour)}
                                            >
                                                Yêu cầu hủy tour
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="alert alert-info">
                                <h5>Chọn một tour từ danh sách để xem chi tiết</h5>
                                <p>Bạn có thể xem thông tin chi tiết, thanh toán hoặc yêu cầu hủy tour từ danh sách bên trái.</p>
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

            {showRefundModal && (
                <div className="modal show d-block" tabIndex="-1" style={{background: "rgba(0,0,0,0.5)"}}>
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Vui lòng điền các thông tin dưới để chúng tôi có thể tiến hành hoàn trả tiền cho bạn</h5>
                                <button type="button" className="btn-close" onClick={() => setShowRefundModal(false)}></button>
                            </div>
                            <div className="modal-body">
                                <div className="alert alert-warning">
                                    Lưu ý tiền hoàn trả sẽ trừ đi 10% phí cam kết so với số tiền bạn đặt ban đầu
                                </div>
                                <div className="mb-3 d-flex align-items-center" style={{ gap: 8 }}>
                                    <label className="form-label mb-0" style={{ whiteSpace: 'nowrap', minWidth: 120 }}>Ngân hàng</label>
                                    <div style={{ flex: 1 }}>
                                        <Select
                                            options={bankOptions}
                                            value={bankOptions.find(opt => opt.value === refundBank)}
                                            onChange={opt => setRefundBank(opt?.value || '')}
                                            placeholder="Chọn ngân hàng..."
                                            isSearchable
                                            styles={customSelectStyles}
                                            menuPortalTarget={document.body}
                                            formatOptionLabel={option => (
                                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                                    <img
                                                        src={option.logo}
                                                        alt=""
                                                        style={{
                                                            width: 28,
                                                            height: 28,
                                                            objectFit: 'contain',
                                                            marginRight: 10,
                                                            borderRadius: 4,
                                                            background: '#fff',
                                                            border: '1px solid #eee'
                                                        }}
                                                        onError={(e) => e.target.style.display = 'none'}
                                                    />
                                                    <span>{option.label}</span>
                                                </div>
                                            )}
                                        />
                                    </div>
                                </div>
                                <div className="mb-3 d-flex align-items-center" style={{ gap: 8 }}>
                                    <label className="form-label mb-0" style={{ whiteSpace: 'nowrap', minWidth: 120 }}>Tên chủ tài khoản</label>
                                    <input className="form-control" style={{ flex: 1 }} value={refundAccountName} onChange={e => setRefundAccountName(e.target.value)} />
                                </div>
                                <div className="mb-3 d-flex align-items-center" style={{ gap: 8 }}>
                                    <label className="form-label mb-0" style={{ whiteSpace: 'nowrap', minWidth: 120 }}>Số tài khoản</label>
                                    <input className="form-control" style={{ flex: 1 }} value={refundAccountNumber} onChange={e => setRefundAccountNumber(e.target.value)} />
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button
                                    className="btn btn-primary"
                                    onClick={async () => {
                                        if (!refundBank || !refundAccountName || !refundAccountNumber) {
                                            alert("Vui lòng nhập đầy đủ thông tin hoàn tiền!");
                                            return;
                                        }
                                        var refundRequest = {
                                            customerBankName : refundBank,
                                            customerBankAccount: refundAccountNumber,
                                            customerAccountHolderName: refundAccountName
                                        }
                                        const response = await bookingService.cancelBooking(refundBooking.bookingId, refundRequest);
                                        if (response.data) {
                                            alert("Cancellation request submitted successfully. Our staff will review your request.");
                                            setShowRefundModal(false);
                                            // Refresh the booking list
                                            const userId = localStorage.getItem('userId');
                                            if (userId) {
                                                const dataResponse = await _tourService.getTourHistory(userId);
                                                setHitoryTour(dataResponse.data.data);
                                            }
                                        }
                                    }}
                                >
                                    Xác nhận hoàn tiền
                                </button>
                                <button className="btn btn-secondary" onClick={() => setShowRefundModal(false)}>Đóng</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default History;
