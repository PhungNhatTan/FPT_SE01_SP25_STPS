import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./header";
import "../../style/savedtour.css";

const SavedTour = () => {
    const [savedTours, setSavedTours] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const tours = JSON.parse(localStorage.getItem("savedTours")) || [];
        setSavedTours(tours);
    }, []);

    const handleViewTour = (tour) => {
        navigate("/customizetour", { state: { tour } });
    };

    const handleDeleteTour = (index) => {
        const updatedTours = savedTours.filter((_, i) => i !== index);
        setSavedTours(updatedTours);
        localStorage.setItem("savedTours", JSON.stringify(updatedTours));
    };

    const calculateTotalPrice = (tour) => {
        const totalAdultPrice = tour.locations.reduce((total, loc) => total + parseInt(loc.adultPrice.replace(/\D/g, ""), 10), 0);
        const totalChildPrice = tour.locations.reduce((total, loc) => total + parseInt(loc.childPrice.replace(/\D/g, ""), 10), 0);
        return {
            adultPrice: totalAdultPrice.toLocaleString("vi-VN"),
            childPrice: totalChildPrice.toLocaleString("vi-VN")
        };
    };

    return (
        <>
            <header className="header">
                <Header />
            </header>

            <div className="saved-tour-container">
                <h3 className="text-success">Danh sách các tour đã lưu</h3>
                <div className="saved-tour-list">
                    {savedTours.length === 0 ? (
                        <p>Chưa có tour nào được lưu.</p>
                    ) : (
                        savedTours.map((tour, index) => {
                            const { adultPrice, childPrice } = calculateTotalPrice(tour);
                            return (
                                <div key={index} className="saved-tour-item card shadow-sm mb-3">
                                    <div className="card-body">
                                        <div className="info">
                                            <h5 className="card-title">Tour {index + 1}</h5>
                                            <p><strong>Địa điểm:</strong> {tour.locationTour.map(loc => loc.name).join(", ")}</p>
                                            <p><strong>Chương trình:</strong> {tour.locations.map(loc => loc.name).join(", ")}</p>
                                            <p><strong>Giá vé người lớn:</strong> {adultPrice} VNĐ</p>
                                            <p><strong>Giá vé trẻ em:</strong> {childPrice} VNĐ</p>
                                        </div>
                                        <div className="buttons">
                                            <button className="btn btn-primary" onClick={() => handleViewTour(tour)}>Xem chi tiết</button>
                                            <button className="btn btn-danger" onClick={() => handleDeleteTour(index)}>Xóa</button>
                                        </div>
                                    </div>
                                </div>
                            );
                        })
                    )}
                </div>
            </div>
        </>
    );
};

export default SavedTour;
