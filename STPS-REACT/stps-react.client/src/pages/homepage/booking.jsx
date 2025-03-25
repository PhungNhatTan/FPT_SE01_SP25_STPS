import React, { useState, useRef } from "react";
import "./style/bookingpopup.css";

const BookingPopup = () => {
    const today = new Date();
    const formattedToday = `${today.getDate().toString().padStart(2, '0')}/${(today.getMonth() + 1).toString().padStart(2, '0')}`;
    const tomorrow = new Date();
    tomorrow.setDate(today.getDate() + 1);
    const Nextday1 = `${tomorrow.getDate().toString().padStart(2, '0')}/${(tomorrow.getMonth() + 1).toString().padStart(2, '0')}`;
    tomorrow.setDate(today.getDate() + 2);
    const Nextday2 = `${tomorrow.getDate().toString().padStart(2, '0')}/${(tomorrow.getMonth() + 1).toString().padStart(2, '0')}`;

    const [activeDate, setActiveDate] = useState(formattedToday);

    const dateInputRef = useRef(null);

    const handleDateClick = (date) => {
        setActiveDate(date); // Cập nhật ngày được chọn
    };

    const handleCalendarClick = () => {
        dateInputRef.current.showPicker(); // Mở Date Picker
    };

    const priceAdult = 50990000; // Giá người lớn
    const priceChild = 30990000; // Giá trẻ em
    const priceInfant = 10990000; // Giá trẻ nhỏ

    const [adults, setAdults] = useState(0);
    const [children, setChildren] = useState(0);
    const [infants, setInfants] = useState(0);
    const totalPrice = (adults * priceAdult) + (children * priceChild) + (infants * priceInfant);


    return (
        <div className="popup-overlay">
            <div className="popup-content">
                <h2>Thông tin đặt Tour</h2>

                {/* Chọn ngày */}
                <div className="date-selection">
                    <button
                        className={activeDate === formattedToday ? "active" : ""}
                        onClick={() => handleDateClick(formattedToday)}
                    >
                        {formattedToday}
                    </button>
                    <button
                        className={activeDate === "nextday1" ? "active" : ""}
                        onClick={() => handleDateClick("nextday1")}
                    >
                        {Nextday1}
                    </button>
                    <button
                        className={activeDate === "nextday2" ? "active" : ""}
                        onClick={() => handleDateClick("nextday2")}
                    >
                        {Nextday2}
                    </button>
                    <button
                        className={activeDate === "custom" ? "active" : ""}
                        onClick={() => handleDateClick("custom")}
                    >
                        <span onClick={handleCalendarClick}>📅</span>
                    </button>
                    <input
                        type="date"
                        ref={dateInputRef}
                        className="hidden-date"
                        onChange={(e) => handleDateClick(e.target.value)}
                    />
                </div>

                {/* Hạng mục vé */}
                <div className="category">
                    <span>Người lớn (&gt; 9t) x {priceAdult.toLocaleString()} VND</span>
                    <div className="controls">
                        <button onClick={() => setAdults(Math.max(0, adults - 1))}>-</button>
                        <span>{adults}</span>
                        <button onClick={() => setAdults(adults + 1)}>+</button>
                    </div>
                </div>

                <div className="category">
                    <span>Trẻ em (2 - 9t) x {priceChild.toLocaleString()} VND</span>
                    <div className="controls">
                        <button onClick={() => setChildren(Math.max(0, children - 1))}>-</button>
                        <span>{children}</span>
                        <button onClick={() => setChildren(children + 1)}>+</button>
                    </div>
                </div>

                <div className="category">
                    <span>Trẻ nhỏ (&lt; 2t) x {priceInfant.toLocaleString()} VND</span>
                    <div className="controls">
                        <button onClick={() => setInfants(Math.max(0, infants - 1))}>-</button>
                        <span>{infants}</span>
                        <button onClick={() => setInfants(infants + 1)}>+</button>
                    </div>
                </div>

                {/* Tổng giá */}
                <div className="price">
                    Tổng Giá Tour: <span>{totalPrice.toLocaleString()}</span> VND
                </div>

                {/* Nút đặt vé */}
                <button className="booking-btn">Yêu cầu đặt</button>
                {/* Nút đóng */}
                <button className="close-btn">
                    Đóng
                </button>
            </div>
        </div>
    );
};

export default BookingPopup;
