import React, { useState, useEffect } from "react";
import "../../style/booking.css";
import { TourServices } from "../../services/TourSevices";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaUser, FaCalendarAlt, FaMoneyBillWave, FaInfoCircle } from 'react-icons/fa';
import PaymentModal from "../../components/PaymentModal";
import PaymentService from "../../services/PaymentService";

const BookingPopup = ({ priceAdult, priceChild, tourId, onClose }) => {
    // State cho các bước đặt tour
    const [step, setStep] = useState(1);

    const today = new Date();
    const formattedToday = `${today.getDate().toString().padStart(2, '0')}/${(today.getMonth() + 1).toString().padStart(2, '0')}`;

    const tomorrow = new Date();
    tomorrow.setDate(today.getDate() + 1);
    const Nextday1 = `${tomorrow.getDate().toString().padStart(2, '0')}/${(tomorrow.getMonth() + 1).toString().padStart(2, '0')}`;

    const dayAfterTomorrow = new Date();
    dayAfterTomorrow.setDate(today.getDate() + 2);
    const Nextday2 = `${dayAfterTomorrow.getDate().toString().padStart(2, '0')}/${(dayAfterTomorrow.getMonth() + 1).toString().padStart(2, '0')}`;

    const [activeDate, setActiveDate] = useState(formattedToday);
    const [customDate, setCustomDate] = useState("");

    const minDate = dayAfterTomorrow.toISOString().split("T")[0];
    const [adults, setAdults] = useState(1);
    const [children, setChildren] = useState(0);

    // State cho thông tin hành khách
    const [passengerInfo, setPassengerInfo] = useState([
        { name: "", type: "adult", phone: "", email: "" }
    ]);

    // State cho thông tin liên hệ
    const [contactInfo, setContactInfo] = useState({
        name: "",
        phone: "",
        email: "",
        address: "",
        note: ""
    });

    // State cho phương thức thanh toán
    const [paymentMethod, setPaymentMethod] = useState("creditCard");

    // Chuyển đổi giá thành số
    const parsePrice = (price) => {
        if (typeof price === 'number') return price;
        if (typeof price === 'string') {
            const numericValue = price.replace(/\D/g, "");
            return numericValue ? parseInt(numericValue) : 0;
        }
        return 0;
    };

    const adultPriceValue = parsePrice(priceAdult);
    const childPriceValue = parsePrice(priceChild);

    const totalPrice = (adults * adultPriceValue) + (children * childPriceValue);

    const _tourService = new TourServices();

    // Lấy thông tin người dùng từ localStorage
    const getUserInfo = () => {
        try {
            const userStr = localStorage.getItem('user');
            if (userStr) {
                const user = JSON.parse(userStr);
                console.log("User info from localStorage:", user);

                // Đảm bảo có userId
                if (!user.userId && user.id) {
                    user.userId = user.id;
                }

                return user;
            }
            return null;
        } catch (error) {
            console.error("Error parsing user info:", error);
            return null;
        }
    };

    // Thêm useEffect để log tourId khi component được render
    useEffect(() => {
        console.log("BookingPopup rendered with tourId:", tourId, "type:", typeof tourId);
    }, [tourId]);

    // Thêm useEffect để điền thông tin người dùng vào form khi component được mount
    useEffect(() => {
        const userInfo = getUserInfo();
        if (userInfo) {
            setContactInfo({
                name: userInfo.fullName || "",
                phone: userInfo.phone || "",
                email: userInfo.email || "",
                address: userInfo.address || "",
                note: ""
            });

            // Cập nhật thông tin hành khách đầu tiên
            if (passengerInfo.length > 0) {
                const updatedPassengers = [...passengerInfo];
                updatedPassengers[0] = {
                    ...updatedPassengers[0],
                    name: userInfo.fullName || "",
                    email: userInfo.email || ""
                };
                setPassengerInfo(updatedPassengers);
            }
        }
    }, []);

    // Xử lý thêm hành khách
    const addPassenger = () => {
        setPassengerInfo([...passengerInfo, { name: "", type: "adult", phone: "", email: "" }]);
    };

    // Xử lý xóa hành khách
    const removePassenger = (index) => {
        if (passengerInfo.length > 1) {
            const updatedPassengers = [...passengerInfo];
            updatedPassengers.splice(index, 1);
            setPassengerInfo(updatedPassengers);
        }
    };

    // Xử lý thay đổi thông tin hành khách
    const handlePassengerChange = (index, field, value) => {
        const updatedPassengers = [...passengerInfo];
        updatedPassengers[index] = {
            ...updatedPassengers[index],
            [field]: value
        };
        setPassengerInfo(updatedPassengers);
    };

    // Xử lý thay đổi thông tin liên hệ
    const handleContactChange = (field, value) => {
        setContactInfo({
            ...contactInfo,
            [field]: value
        });
    };

    // Xử lý chuyển bước
    const nextStep = () => {
        if (step === 1) {
            if (!activeDate && !customDate) {
                toast.error("Vui lòng chọn ngày cho chuyến đi");
                return;
            }

            if (adults <= 0 && children <= 0) {
                toast.error("Vui lòng chọn ít nhất một người tham gia");
                return;
            }

            const totalPassengers = adults + children;
            if (passengerInfo.length < totalPassengers) {

                const newPassengers = [...passengerInfo];
                for (let i = passengerInfo.length; i < totalPassengers; i++) {
                    newPassengers.push({ name: "", type: i < adults ? "adult" : "child", phone: "", email: "" });
                }
                setPassengerInfo(newPassengers);
            } else if (passengerInfo.length > totalPassengers) {

                setPassengerInfo(passengerInfo.slice(0, totalPassengers));
            }

            const updatedPassengers = [...passengerInfo];
            for (let i = 0; i < updatedPassengers.length; i++) {
                updatedPassengers[i].type = i < adults ? "adult" : "child";
            }
            setPassengerInfo(updatedPassengers);
        } else if (step === 2) {
            if (!contactInfo.name) {
                toast.error("Vui lòng nhập tên người liên hệ");
                return;
            }

            if (!contactInfo.phone) {
                toast.error("Vui lòng nhập số điện thoại liên hệ");
                return;
            }

            if (!contactInfo.email) {
                toast.error("Vui lòng nhập email liên hệ");
                return;
            }
            for (let i = 0; i < passengerInfo.length; i++) {
                if (!passengerInfo[i].name) {
                    toast.error(`Vui lòng nhập tên hành khách ${i + 1}`);
                    return;
                }
            }
        }

        setStep(step + 1);
    };
    const prevStep = () => {
        setStep(step - 1);
    };

    // Add state for payment modal
    const [paymentModalVisible, setPaymentModalVisible] = useState(false);
    const [paymentData, setPaymentData] = useState(null);

    const bookNow = async () => {
        if (!tourId && tourId !== 0) {
            toast.error("Không tìm thấy thông tin tour");
            console.error("tourId is null or undefined:", tourId);
            return;
        }

        const userInfo = getUserInfo();
        if (!userInfo) {
            toast.error("Vui lòng đăng nhập để đặt tour");
            setTimeout(() => {
                window.location.href = '/login';
            }, 2000);
            return;
        }

        try {
            let bookingDate;

            if (customDate) {
                bookingDate = customDate;
            } else if (activeDate) {
                const [day, month] = activeDate.split('/');
                const year = new Date().getFullYear();
                bookingDate = `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
            } else {
                bookingDate = new Date().toISOString().split('T')[0];
            }

            // Chuẩn bị thông tin hành khách
            const passengers = passengerInfo.map(p => ({
                passengerName: p.name,
                passengerType: p.type
            }));

            // Thêm thông tin giá vào request
            const bookingData = {
                tourId: tourId,
                bookingDate: bookingDate,
                adults: adults,
                children: children,
                adultPrice: adultPriceValue,
                childPrice: childPriceValue,
                totalPrice: totalPrice,
                paymentMethod: paymentMethod,
                passengers: passengers,
                contactInfo: contactInfo
            };

            console.log("Sending booking data:", bookingData);

            const response = await _tourService.bookNowWithDetails(
                tourId,
                bookingDate,
                adults,
                children,
                paymentMethod,
                passengers,
                contactInfo,
                adultPriceValue,
                childPriceValue,
                totalPrice
            );

            console.log("Booking response:", response);

            if (response && response.data && response.data.success) {
                if (paymentMethod === "bankTransfer") {
                    try {
                        // Create payment QR and get VNPay URL
                        const paymentResponse = await PaymentService.createPaymentQR(
                            response.data.data.bookingId,
                            totalPrice,
                            `Payment for tour booking #${response.data.data.bookingId}`
                        );

                        // The redirect will happen automatically in PaymentService
                        // No need to handle it here as the page will be redirected
                    } catch (error) {
                        console.error("Payment error:", error);
                        toast.error("Không thể tạo mã thanh toán. Vui lòng thử lại sau.");
                    }
                } else {
                    // For other payment methods, show success message
                    toast.success(
                        <div>
                            <strong>Đặt tour thành công!</strong>
                            <p>Thông tin đặt tour sẽ được gửi đến email của bạn.</p>
                        </div>,
                        { autoClose: 3000 }
                    );

                    setTimeout(() => {
                        onClose();
                    }, 3000);
                }
            } else {
                toast.error(
                    <div>
                        <strong>Đặt tour không thành công!</strong>
                        <p>{response?.data?.message || "Vui lòng thử lại sau."}</p>
                    </div>,
                    { autoClose: 5000 }
                );
            }
        } catch (err) {
            console.error("Lỗi khi đặt tour:", err);

            let errorMessage = "Có lỗi xảy ra khi đặt tour.";

            if (err.message === "User not logged in") {
                errorMessage = "Vui lòng đăng nhập để đặt tour.";
                setTimeout(() => {
                    window.location.href = '/login';
                }, 2000);
            } else if (err.message === "User ID not found in token") {
                errorMessage = "Không tìm thấy thông tin người dùng. Vui lòng đăng nhập lại.";
                setTimeout(() => {
                    localStorage.removeItem('token');
                    localStorage.removeItem('user');
                    window.location.href = '/login';
                }, 2000);
            } else {
                errorMessage = `Lỗi: ${err.message || "Vui lòng thử lại sau."}`;
            }

            toast.error(errorMessage);
        }
    }

    const renderStep = () => {
        switch (step) {
            case 1:
                return (
                    <>
                        <h2 className="popup-title">Bước 1: Chọn ngày và số lượng</h2>


                        <div className="date-selection">
                            <button className={activeDate === formattedToday ? "active" : ""}
                                onClick={() => { setActiveDate(formattedToday); setCustomDate(""); }}>
                                {formattedToday}
                            </button>
                            <button className={activeDate === Nextday1 ? "active" : ""}
                                onClick={() => { setActiveDate(Nextday1); setCustomDate(""); }}>
                                {Nextday1}
                            </button>
                            <button className={activeDate === Nextday2 ? "active" : ""}
                                onClick={() => { setActiveDate(Nextday2); setCustomDate(""); }}>
                                {Nextday2}
                            </button>

                            <input type="date" className="date-picker"
                                value={customDate}
                                min={minDate}
                                onChange={(e) => {
                                    setCustomDate(e.target.value);
                                    setActiveDate("");
                                }} />
                        </div>

                        <div className="ticket-category">
                            <span>Người lớn (&gt; 9t) x {typeof priceAdult === 'number' ? priceAdult.toLocaleString() : priceAdult} VND</span>
                            <div className="controls">
                                <button onClick={() => setAdults(Math.max(0, adults - 1))}>-</button>
                                <span>{adults}</span>
                                <button onClick={() => setAdults(adults + 1)}>+</button>
                            </div>
                        </div>

                        <div className="ticket-category">
                            <span>Trẻ em (2 - 9t) x {typeof priceChild === 'number' ? priceChild.toLocaleString() : priceChild} VND</span>
                            <div className="controls">
                                <button onClick={() => setChildren(Math.max(0, children - 1))}>-</button>
                                <span>{children}</span>
                                <button onClick={() => setChildren(children + 1)}>+</button>
                            </div>
                        </div>

                        <div className="total-price">
                            Tổng Giá Tour: <span>{totalPrice.toLocaleString()}</span> VND
                        </div>

                        <button onClick={nextStep} className="booking-btn">Tiếp tục</button>

                        <button className="close-btn" onClick={onClose}>Đóng</button>
                    </>
                );

            case 2:
                return (
                    <>
                        <h2 className="popup-title">Bước 2: Nhập thông tin</h2>

                        <div className="contact-info">
                            <h3><FaUser /> Thông tin liên hệ</h3>

                            <div className="form-row">
                                <div className="form-group">
                                    <label htmlFor="contactName">Họ tên</label>
                                    <input
                                        type="text"
                                        id="contactName"
                                        value={contactInfo.name}
                                        onChange={(e) => handleContactChange('name', e.target.value)}
                                        placeholder="Nhập họ tên người liên hệ"
                                        required
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="contactPhone">Số điện thoại</label>
                                    <input
                                        type="tel"
                                        id="contactPhone"
                                        value={contactInfo.phone}
                                        onChange={(e) => handleContactChange('phone', e.target.value)}
                                        placeholder="Nhập số điện thoại"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="form-row">
                                <div className="form-group">
                                    <label htmlFor="contactEmail">Email</label>
                                    <input
                                        type="email"
                                        id="contactEmail"
                                        value={contactInfo.email}
                                        onChange={(e) => handleContactChange('email', e.target.value)}
                                        placeholder="Nhập email"
                                        required
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="contactAddress">Địa chỉ</label>
                                    <input
                                        type="text"
                                        id="contactAddress"
                                        value={contactInfo.address}
                                        onChange={(e) => handleContactChange('address', e.target.value)}
                                        placeholder="Nhập địa chỉ"
                                    />
                                </div>
                            </div>

                            <div className="form-group">
                                <label htmlFor="contactNote">Ghi chú</label>
                                <textarea
                                    id="contactNote"
                                    value={contactInfo.note}
                                    onChange={(e) => handleContactChange('note', e.target.value)}
                                    placeholder="Nhập ghi chú (nếu có)"
                                    rows="3"
                                ></textarea>
                            </div>
                        </div>

                        <div className="passenger-info">
                            <h3><FaUser /> Thông tin hành khách</h3>

                            {passengerInfo.map((passenger, index) => (
                                <div key={index} className="passenger-card">
                                    <h4>Hành khách {index + 1} ({passenger.type === 'adult' ? 'Người lớn' : 'Trẻ em'})</h4>

                                    <div className="form-row">
                                        <div className="form-group">
                                            <label htmlFor={`passengerName${index}`}>Họ tên</label>
                                            <input
                                                type="text"
                                                id={`passengerName${index}`}
                                                value={passenger.name}
                                                onChange={(e) => handlePassengerChange(index, 'name', e.target.value)}
                                                placeholder="Nhập họ tên hành khách"
                                                required
                                            />
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor={`passengerPhone${index}`}>Số điện thoại</label>
                                            <input
                                                type="tel"
                                                id={`passengerPhone${index}`}
                                                value={passenger.phone}
                                                onChange={(e) => handlePassengerChange(index, 'phone', e.target.value)}
                                                placeholder="Nhập số điện thoại (nếu có)"
                                            />
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor={`passengerEmail${index}`}>Email</label>
                                        <input
                                            type="email"
                                            id={`passengerEmail${index}`}
                                            value={passenger.email}
                                            onChange={(e) => handlePassengerChange(index, 'email', e.target.value)}
                                            placeholder="Nhập email (nếu có)"
                                        />
                                    </div>

                                    {passengerInfo.length > 1 && (
                                        <button
                                            type="button"
                                            className="remove-passenger-btn"
                                            onClick={() => removePassenger(index)}
                                        >
                                            Xóa
                                        </button>
                                    )}
                                </div>
                            ))}
                        </div>

                        <div className="button-group">
                            <button onClick={prevStep} className="back-btn">Quay lại</button>
                            <button onClick={nextStep} className="booking-btn">Tiếp tục</button>
                        </div>
                    </>
                );

            case 3:
                return (
                    <>
                        <h2 className="popup-title">Bước 3: Xác nhận thanh toán</h2>

                        <div className="booking-summary">
                            <h3><FaInfoCircle /> Thông tin tour</h3>

                            <div className="summary-item">
                                <span>Ngày khởi hành:</span>
                                <span>
                                    {customDate
                                        ? new Date(customDate).toLocaleDateString('vi-VN')
                                        : activeDate}
                                </span>
                            </div>

                            <div className="summary-item">
                                <span>Số lượng:</span>
                                <span>{adults} người lớn, {children} trẻ em</span>
                            </div>

                            <div className="summary-item">
                                <span>Tổng giá:</span>
                                <span className="total-price-value">{totalPrice.toLocaleString()} VND</span>
                            </div>
                        </div>

                        <div className="booking-summary">
                            <h3><FaUser /> Thông tin liên hệ</h3>

                            <div className="summary-item">
                                <span>Họ tên:</span>
                                <span>{contactInfo.name}</span>
                            </div>

                            <div className="summary-item">
                                <span>Số điện thoại:</span>
                                <span>{contactInfo.phone}</span>
                            </div>

                            <div className="summary-item">
                                <span>Email:</span>
                                <span>{contactInfo.email}</span>
                            </div>

                            {contactInfo.address && (
                                <div className="summary-item">
                                    <span>Địa chỉ:</span>
                                    <span>{contactInfo.address}</span>
                                </div>
                            )}

                            {contactInfo.note && (
                                <div className="summary-item">
                                    <span>Ghi chú:</span>
                                    <span>{contactInfo.note}</span>
                                </div>
                            )}
                        </div>

                        <div className="payment-methods">
                            <h3><FaMoneyBillWave /> Phương thức thanh toán</h3>

                            <div className="payment-options">
                                {/*<div className="payment-option">*/}
                                {/*    <input*/}
                                {/*        type="radio"*/}
                                {/*        id="creditCard"*/}
                                {/*        name="paymentMethod"*/}
                                {/*        value="creditCard"*/}
                                {/*        checked={paymentMethod === "creditCard"}*/}
                                {/*        onChange={() => setPaymentMethod("creditCard")}*/}
                                {/*    />*/}
                                {/*    <label htmlFor="creditCard">Thẻ tín dụng/Ghi nợ</label>*/}
                                {/*</div>*/}

                                <div className="payment-option">
                                    <input
                                        type="radio"
                                        id="bankTransfer"
                                        name="paymentMethod"
                                        value="bankTransfer"
                                        checked={paymentMethod === "bankTransfer"}
                                        onChange={() => setPaymentMethod("bankTransfer")}
                                    />
                                    <label htmlFor="bankTransfer">VN Pay</label>
                                </div>

                                {/*<div className="payment-option">*/}
                                {/*    <input*/}
                                {/*        type="radio"*/}
                                {/*        id="momo"*/}
                                {/*        name="paymentMethod"*/}
                                {/*        value="momo"*/}
                                {/*        checked={paymentMethod === "momo"}*/}
                                {/*        onChange={() => setPaymentMethod("momo")}*/}
                                {/*    />*/}
                                {/*    <label htmlFor="momo">Ví MoMo</label>*/}
                                {/*</div>*/}
                            </div>
                        </div>

                        <div className="button-group">
                            <button onClick={prevStep} className="back-btn">Quay lại</button>
                            <button onClick={bookNow} className="booking-btn">Xác nhận thanh toán</button>
                        </div>
                    </>
                );

            default:
                return null;
        }
    };

    return (
        <div className="popup-overlay">
            <div className="popup-content">
                {renderStep()}
            </div>
            {paymentData && (
                <PaymentModal
                    visible={paymentModalVisible}
                    onClose={() => {
                        setPaymentModalVisible(false);
                        onClose();
                    }}
                    bookingId={paymentData.bookingId}
                    amount={totalPrice}
                    tourName={`Tour Booking #${paymentData.bookingId}`}
                />
            )}
            <ToastContainer />
        </div>
    );
};

export default BookingPopup;
