import React, { useState } from "react";
import "../../style/booking.css";

const BookingPopup = ({ priceAdult, priceChild, onClose }) => {
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

    const totalPrice = (adults * parseInt(priceAdult.replace(/\D/g, ""))) +
        (children * parseInt(priceChild.replace(/\D/g, "")));

    return (
        <div className="popup-overlay">
            <div className="popup-content">
                <h2 className="popup-title">Thông tin đặt Tour</h2>

                {/* Chọn ngày */}
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

                    {/* Chọn ngày khác */}
                    <input type="date" className="date-picker"
                        value={customDate}
                        min={minDate} // Chỉ chọn ngày sau Nextday2
                        onChange={(e) => { 
                            setCustomDate(e.target.value); 
                            setActiveDate(""); 
                        }} />
                </div>

                {/* Hạng mục vé */}
                <div className="ticket-category">
                    <span>Người lớn (&gt; 9t) x {priceAdult} VND</span>
                    <div className="controls">
                        <button onClick={() => setAdults(Math.max(0, adults - 1))}>-</button>
                        <span>{adults}</span>
                        <button onClick={() => setAdults(adults + 1)}>+</button>
                    </div>
                </div>

                <div className="ticket-category">
                    <span>Trẻ em (2 - 9t) x {priceChild} VND</span>
                    <div className="controls">
                        <button onClick={() => setChildren(Math.max(0, children - 1))}>-</button>
                        <span>{children}</span>
                        <button onClick={() => setChildren(children + 1)}>+</button>
                    </div>
                </div>

                {/* Tổng giá */}
                <div className="total-price">
                    Tổng Giá Tour: <span>{totalPrice.toLocaleString()}</span> VND
                </div>

                {/* Nút đặt vé */}
                <button className="booking-btn">Yêu cầu đặt</button>
                {/* Nút đóng */}
                <button className="close-btn" onClick={onClose}>Đóng</button>
            </div>
        </div>
    );
};

export default BookingPopup;
