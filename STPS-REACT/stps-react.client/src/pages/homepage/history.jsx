// history.jsx

import React, { useState } from "react";
import "../../style/history.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./header";
import { useNavigate } from "react-router-dom";
import tourHistoryData from "./data/tourHistoryData"; // Default import

const History = () => {
    const [tours, setTours] = useState(tourHistoryData);
    const [selectedTour, setSelectedTour] = useState(tours[0]); // Mặc định chọn tour đầu tiên
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
            const newFeedback = { name: "Khách hàng", comment: feedback };

            // Cập nhật danh sách phản hồi của tour đang chọn
            const updatedTours = tours.map((tour) =>
                tour.id === selectedTour.id
                    ? { ...tour, feedback: [...tour.feedback, newFeedback] }
                    : tour
            );

            setTours(updatedTours);
            setSelectedTour(updatedTours.find(t => t.id === selectedTour.id)); // Cập nhật tour đang hiển thị

            // Lưu phản hồi vào localStorage
            localStorage.setItem('tourHistory', JSON.stringify(updatedTours));

            setFeedback(""); // Xóa nội dung sau khi gửi
        }
    };

    const handleDeleteFeedback = (index) => {
        // Xóa phản hồi
        const updatedTours = tours.map((tour) =>
            tour.id === selectedTour.id
                ? {
                    ...tour,
                    feedback: tour.feedback.filter((_, fbIndex) => fbIndex !== index),
                }
                : tour
        );

        setTours(updatedTours);
        setSelectedTour(updatedTours.find(t => t.id === selectedTour.id)); // Cập nhật tour đang hiển thị
    };

    const handleViewTourDetail = (tourId) => {
        navigate(`/tourdetail/${tourId}`);  // Điều hướng đến trang chi tiết tour
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
                    <div className="col-md-5">
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
                    </div>

                    {/* Chi tiết tour */}
                    <div className="col-md-7">
                        {selectedTour && (
                            <div className="card tour-detail">
                                <img src={selectedTour.image} className="card-img-top" alt={selectedTour.name} />
                                <div className="card-body">
                                    <h4 className="card-title">{selectedTour.name}</h4>
                                    <p><strong>Địa điểm:</strong> {selectedTour.locations.join(", ")}</p>
                                    <p><strong>Ngày đi:</strong> {selectedTour.startDate} - <strong>Ngày về:</strong> {selectedTour.endDate}</p>
                                    <p><strong>Số lượng:</strong> {selectedTour.adults} Người lớn, {selectedTour.children} Trẻ em</p>
                                    <p><strong>Tổng giá Tour:</strong> {selectedTour.totalPrice.toLocaleString()} VND</p>
                                    <button
                                        className="btn btn-info mt-3"
                                        onClick={() => handleViewTourDetail(selectedTour.id)}  // Điều hướng đến tourdetail
                                    >
                                        Xem thông tin tour
                                    </button>
                                    {/* Feedback Section */}
                                    <div className="feedback-section">
                                        <h5>Phản hồi của bạn</h5>
                                        <textarea
                                            className="form-control"
                                            value={feedback}
                                            onChange={handleFeedbackChange}
                                            maxLength={500}
                                            placeholder="Nhập phản hồi của bạn..."
                                        ></textarea>
                                        <button className="btn btn-primary mt-2" onClick={handleFeedbackSubmit}>Gửi</button>
                                    </div>

                                    {/* Hiển thị danh sách phản hồi */}
                                    <div className="feedback-list mt-3">
                                        <h5>Phản hồi từ bạn</h5>
                                        {selectedTour.feedback.length > 0 ? (
                                            selectedTour.feedback.map((fb, index) => (
                                                <div key={index} className="feedback-item p-2 border rounded mb-2">
                                                    <div style={{ whiteSpace: 'pre-line' }}>
                                                        <strong>{fb.name}:</strong> {fb.comment}
                                                    </div>
                                                    <button
                                                        className="btn btn-danger btn-sm float-right"
                                                        onClick={() => handleDeleteFeedback(index)} // Xóa phản hồi
                                                    >
                                                        Xóa
                                                    </button>
                                                </div>
                                            ))
                                        ) : (
                                            <p>Chưa có phản hồi nào.</p>
                                        )}
                                    </div>

                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default History;
