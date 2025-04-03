import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import banner from "../../assets/banner.jpg";
import "../../style/customizetour.css";
import Header from "./header";
import { useNavigate } from "react-router-dom";
import BookingPopup from "./booking"; // Import component BookingPopup

const Customizetour = () => {
    const [locations, setLocations] = useState([]);
    const [locationTour, setLocationTour] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [showModal1, setShowModal1] = useState(false);
    const [showBookingPopup, setShowBookingPopup] = useState(false); // Trạng thái popup

    const navigate = useNavigate();

    // Các dữ liệu địa điểm và tour
    const locationList = [
        { id: 1, name: "Địa điểm 1", adultPrice: "100.000đ", childPrice: "50.000đ", time: "08:00 - 18:00" },
        { id: 2, name: "Địa điểm 2", adultPrice: "120.000đ", childPrice: "60.000đ", time: "09:00 - 19:00" },
        { id: 3, name: "Địa điểm 3", adultPrice: "90.000đ", childPrice: "45.000đ", time: "07:30 - 17:30" },
        { id: 4, name: "Địa điểm 4", adultPrice: "110.000đ", childPrice: "55.000đ", time: "08:30 - 18:30" },
        { id: 5, name: "Địa điểm 5", adultPrice: "130.000đ", childPrice: "65.000đ", time: "09:30 - 20:00" }
    ];

    const locationTourList = [
        { id: 1, name: "Hà Nội", description: "Mô tả Tour Hà Nội" },
        { id: 2, name: "Đà Nẵng", description: "Hành trình khám phá thành phố biển Đà Nẵng, phố cổ Hội An với những trải nghiệm đáng nhớ." },
        { id: 3, name: "Nha Trang", description: "Mô tả Tour Nha Trang" }
    ];

    const addLocation = (loc) => {
        setLocations([...locations, loc]);
    };

    const addTourLocation = (loctour) => {
        setLocationTour([...locationTour, loctour]);
    };

    const removeLocation = (id) => {
        setLocations(locations.filter((location) => location.id !== id));
    };

    const removeLocationTour = (id) => {
        setLocationTour(locationTour.filter((locationT) => locationT.id !== id));
    };

    // Lọc các địa điểm chưa được thêm vào
    const availableLocations = locationList.filter(loc => !locations.some(l => l.id === loc.id));
    // Lọc các địa điểm tour chưa được thêm vào
    const availableTourLocations = locationTourList.filter(loctour => !locationTour.some(l => l.id === loctour.id));

    const getTotalPrice = () => {
        return locations.reduce((total, loc) => {
            const adultPrice = parseInt(loc.adultPrice.replace(/\D/g, ""), 10);
            const childPrice = parseInt(loc.childPrice.replace(/\D/g, ""), 10);
            return total + adultPrice + childPrice;
        }, 0).toLocaleString("vi-VN") + " VNĐ"; 
    };

    const getTotalAdultPrice = () => {
        return locations.reduce((total, loc) => {
            const adultPrice = parseInt(loc.adultPrice.replace(/\D/g, ""), 10);
            return total + adultPrice;
        }, 0).toLocaleString("vi-VN") + " VNĐ"; 
    };

    const getTotalChildPrice = () => {
        return locations.reduce((total, loc) => {
            const childPrice = parseInt(loc.childPrice.replace(/\D/g, ""), 10);
            return total + childPrice;
        }, 0).toLocaleString("vi-VN") + " VNĐ"; 
    };

    const getTotalTime = () => {
        return locations.reduce((total, loc) => {
            const timeRange = loc.time.split(" - ");
            const startTime = parseInt(timeRange[0].split(":")[0], 10);
            const endTime = parseInt(timeRange[1].split(":")[0], 10);
            return total + (endTime - startTime);
        }, 0) + " giờ";
    };

    const handleSaveTour = () => {
        const newTour = { locations, locationTour };
        
        // Lưu tour vào localStorage
        const savedTours = JSON.parse(localStorage.getItem("savedTours")) || [];
        savedTours.push(newTour);
        localStorage.setItem("savedTours", JSON.stringify(savedTours));
        alert("Lưu Tour tùy chọn thành công.");
    };

    return (
        <div>
            <header className="header">
                <Header />
            </header>

            <div className="position-relative">
                <img
                    src={banner}
                    alt="Tour Banner"
                    className="img-fluid w-100"
                    style={{ height: "400px", objectFit: "cover" }}
                />
            </div>

            <div className="container mt-4">
                <div className="content-box">
                    <h3 className="text-success">Tour du lịch</h3>
                    {locationTour.length === 0 && (
                        <button className="btn btn-primary mt-4" onClick={() => setShowModal1(true)}>➕ Chọn địa điểm Tour</button>
                    )}
                    {locationTour.map((locationT) => (
                        <div className="location-card" key={locationT.id}>
                            <h2 className="text-primary">{locationT.name}</h2>
                            <p><strong>{locationT.description}</strong></p>
                            <p><strong>Điểm đến: </strong>{locationT.name} </p>
                            <p><strong>Phương tiện: </strong> Xe du lịch</p>
                            <p><strong>Giá vé Người lớn: </strong> {getTotalAdultPrice()}</p>
                            <p><strong>Giá vé Trẻ em: </strong> {getTotalChildPrice()}</p>
                            <p><strong>Thời gian: </strong> {getTotalTime()}</p>
                        </div>
                    ))}
                    {locationTour.length > 0 && locations.length > 0 && (
                        <>
                            {/* Nút Đặt vé ngay */}
                            <button className="btn btn-warning mt-3" onClick={() => setShowBookingPopup(true)}>Đặt vé ngay</button>
                            
                            {/* Nút Lưu tour */}
                            <button className="btn btn-success mt-3" onClick={handleSaveTour}>Lưu Tour</button>
                        </>
                    )}
                </div>
            </div>

            <div className="container mt-4">
                <div className="content-box">
                    <h3 className="text-success">📌 Chương Trình Tour</h3>

                    {locations.map((location) => (
                        <div className="location-card" key={location.id}>
                            <h5>{location.name}
                                <button className="btn btn-sm btn-outline-danger ms-2" onClick={() => removeLocation(location.id)}>Xóa</button>
                            </h5>
                            <p>Giá vé người lớn: <strong>{location.adultPrice}</strong></p>
                            <p>Giá vé trẻ em: <strong>{location.childPrice}</strong></p>
                            <p>Thời gian: <strong>{location.time}</strong></p>
                        </div>
                    ))}

                    <button className="btn btn-primary mt-4" onClick={() => setShowModal(true)}>➕ Thêm địa điểm</button>
                </div>
            </div>

            {/* Hiển thị Popup đặt vé */}
            {showBookingPopup && (
                <BookingPopup
                    priceAdult={getTotalAdultPrice()}
                    priceChild={getTotalChildPrice()}
                    onClose={() => setShowBookingPopup(false)}
                />
            )}

            {/* Modal Chọn Địa Điểm Tour */}
            {showModal1 && (
                <div className="modal fade show d-block" tabIndex="-1">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Chọn Tỉnh thành</h5>
                                <button type="button" className="btn-close" onClick={() => setShowModal1(false)}></button>
                            </div>
                            <div className="modal-body">
                                {availableTourLocations.map((loctour) => (
                                    <div key={loctour.id} className="card mb-2 p-2">
                                        <h6><strong>{loctour.name}</strong></h6>
                                        <button className="btn btn-primary" onClick={() => {
                                            addTourLocation(loctour);
                                            setShowModal1(false);
                                        }}>
                                            Chọn
                                        </button>
                                    </div>
                                ))}
                            </div>
                            <div className="modal-footer">
                                <button className="btn btn-secondary" onClick={() => setShowModal1(false)}>Đóng</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Modal Chọn Địa Điểm */}
            {showModal && (
                <div className="modal fade show d-block" tabIndex="-1">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Chọn địa điểm</h5>
                                <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
                            </div>
                            <div className="modal-body">
                                {availableLocations.map((loc) => (
                                    <div key={loc.id} className="card mb-2 p-2">
                                        <h6><strong>{loc.name}</strong></h6>
                                        <button className="btn btn-primary" onClick={() => {
                                            addLocation(loc);
                                            setShowModal(false);
                                        }}>
                                            Chọn
                                        </button>
                                    </div>
                                ))}
                            </div>
                            <div className="modal-footer">
                                <button className="btn btn-secondary" onClick={() => setShowModal(false)}>Đóng</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Customizetour;
