import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import "../../style/tourdetail.css";
import Header from "./header";
import hanoi from "../../assets/Hanoi.jpg";
import danang from "../../assets/Da Nang.jpg";
import BookingPopup from "./booking";

// Danh sách tour giả lập (Có thể thay bằng API)
const tours = [
    { id: 1, name: "Tour Hà Nội", location: "Hà Nội", priceald: "4.990.000", pricechil: "4.990.000", duration: "3 Ngày 2 Đêm", vehicle: "Xe du lịch", highlights: ["Lăng Bác", "Cột cờ Hà Nội", "Hồ Gươm"], image: hanoi },
    { id: 2, name: "Tour Đà Nẵng", location: "Đà Nẵng", priceald: "4.990.000", pricechil: "4.990.000", duration: "4 Ngày 3 Đêm", vehicle: "Máy bay", highlights: ["Bà Nà Hills", "Cầu Vàng", "Biển Mỹ Khê"], image: danang },
    // Các tour khác
];

const TourDetail = () => {
    const navigate = useNavigate();
    const { id } = useParams(); // Lấy ID từ URL
    const tour = tours.find((t) => t.id === parseInt(id)); // Tìm tour theo ID
    const [showPopup, setShowPopup] = useState(false);
    const [tourFeedbacks, setTourFeedbacks] = useState([]);

    useEffect(() => {
        // Lấy tourHistory từ localStorage và tìm phản hồi cho tour
        const storedTours = JSON.parse(localStorage.getItem('tourHistory')) || tours;
        const currentTour = storedTours.find((t) => t.id === parseInt(id));
        if (currentTour) {
            setTourFeedbacks(currentTour.feedback || []);
        }
    }, [id]);

    if (!tour) return <h1>Tour không tồn tại</h1>; // Nếu không tìm thấy tour

    return (
        <div>
            <header className="header">
                <Header />
            </header>

            {/* Showcase */}
            <section className="showcase">
                <img src={tour.image} alt={tour.name} className="img-fluid w-100" style={{ height: "300px", objectFit: "cover" }} />
            </section>
            {/* Nội dung */}
            <div className="container">
                <section className="content">
                    <h1><strong>{tour.name}</strong></h1>
                    <h2>Giới thiệu</h2>
                    <p>Khám phá vẻ đẹp của {tour.location} với tour trọn gói.</p>

                    <h2>Thông tin tour</h2>
                    <p><strong>Thời gian:</strong> {tour.duration}</p>
                    <p><strong>Phương tiện:</strong> {tour.vehicle}</p>
                    <p><strong>Giá vé Người lớn:</strong> {tour.priceald} VND</p>
                    <p><strong>Giá vé Trẻ em:</strong> {tour.pricechil} VND</p>

                    <h2>Địa điểm du lịch</h2>
                    <ul style={{ color: "black" }}>
                        {tour.highlights.map((point, index) => (
                            <li key={index}>{point}</li>
                        ))}
                    </ul>
                </section>
                <br />
                <button className="booking-btn" onClick={() => setShowPopup(true)}>
                    Đặt vé ngay
                </button>

                {/* Phần Feedback */}
            </div>
            <div className="container">
                <section className="feedback">
                    <h3>Phản hồi của khách hàng</h3>
                    {tourFeedbacks.length > 0 ? (
                        tourFeedbacks.map((feedback, index) => (
                            <div key={index} className="feedback-item">
                                <h5>{feedback.name}</h5>
                                <p>{feedback.comment}</p>
                            </div>
                        ))
                    ) : (
                        <p>Chưa có phản hồi nào về tour này.</p>
                    )}
                </section>
            </div>

            {/* Hiển thị pop-up khi state `showPopup` = true */}
            {showPopup && (
                <BookingPopup
                    priceAdult={tour.priceald}
                    priceChild={tour.pricechil}
                    onClose={() => setShowPopup(false)}
                />
            )}
        </div>
    );
};

export default TourDetail;
