import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import banner from "../../assets/banner.jpg";
import "../../style/customizetour.css";
import Header from "./header";

const Customizetour = () => {
    const [locations, setLocations] = useState([]);
    const [showPopup, setShowPopup] = useState(false);
    const [showModal, setShowModal] = useState(false);

    //placeholder
    const locationList = [
        { id: 1, name: "Địa điểm 1", adultPrice: "100.000đ", childPrice: "50.000đ", time: "08:00 - 18:00" },
        { id: 2, name: "Địa điểm 2", adultPrice: "120.000đ", childPrice: "60.000đ", time: "09:00 - 19:00" },
        { id: 3, name: "Địa điểm 3", adultPrice: "90.000đ", childPrice: "45.000đ", time: "07:30 - 17:30" },
        { id: 4, name: "Địa điểm 4", adultPrice: "110.000đ", childPrice: "55.000đ", time: "08:30 - 18:30" },
        { id: 5, name: "Địa điểm 5", adultPrice: "130.000đ", childPrice: "65.000đ", time: "09:30 - 20:00" }
    ];

    //fetch location
    const fetchData = () => {
        const [fd, sfd] = useState([])
        useEffect(() => {
            fetch("https://localhost:7106/CustomizeTour/fetch")
                .then(response => response.json)
                .then(data => setItems("data"))
                .catch(error => console.error("error fetch data: ", error))
        }
        )
    };
    
    const locationsList = () => {
        const [ll, sll] = useState([])
        useEffect(() => {
            fetchData.locationList
        })
    };

    const regionsList = () => {
        const [rl, srl] = useState([])
        useEffect(() => {
            fetchData.regionList
        })
    };

    const addLocation = (loc) => {
        setLocations([...locations, loc]);
    };

    const removeLocation = (id) => {
        setLocations(locations.filter((location) => location.id !== id));
    };

    const availableLocations = locationLists.filter(loc => !locations.some(l => l.id === loc.id));
    const getTotalPrice = () => {
        return locations.reduce((total, loc) => {
            const adultPrice = parseInt(loc.adultPrice.replace(/\D/g, ""), 10);
            const childPrice = parseInt(loc.childPrice.replace(/\D/g, ""), 10);
            return total + adultPrice + childPrice;
        }, 0).toLocaleString("vi-VN") + " VNĐ"; // Hiển thị định dạng tiền VNĐ
    };

    const getTotalTime = () => {
        return locations.reduce((total, loc) => {
            const timeRange = loc.time.split(" - "); // Tách thời gian bắt đầu và kết thúc
            const startTime = parseInt(timeRange[0].split(":")[0], 10); // Giờ bắt đầu
            const endTime = parseInt(timeRange[1].split(":")[0], 10); // Giờ kết thúc
            return total + (endTime - startTime);
        }, 0) + " giờ"; // Tổng thời gian tính theo giờ
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
                    <h2 className="text-primary">Tour: Du lịch Đà Nẵng - Hội An</h2>
                    <p className="mt-3">Hành trình khám phá thành phố biển Đà Nẵng, phố cổ Hội An với những trải nghiệm đáng nhớ.</p>
                    <p><strong>Thời gian:</strong> 3 ngày 2 đêm</p>
                    <p><strong>Điểm đến:</strong> Đà Nẵng, Hội An</p>
                    <p><strong>Phương tiện:</strong> Xe du lịch</p>
                    <p><strong>Giá vé:</strong> {getTotalPrice()}</p>
                    <p><strong>Thời gian:</strong> {getTotalTime()}</p>


                    <button className="btn btn-outline-success me-3 mt-3">Lưu</button>
                    <button className="btn btn-success mt-3">Đặt Tour Ngay</button>
                </div>
            </div>

            <div className="container mt-4">
                <div className="content-box">
                    <h3 className="text-success">📌 Chương Trình Tour</h3>

                    {locations.map((location) => (
                        <div className="location-card" key={location.id}>
                            <h5 className={location.color}>{location.name}
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
                                        <h6>{loc.name}</h6>
                                        <p>Giá vé người lớn: <strong>{loc.adultPrice}</strong></p>
                                        <p>Giá vé trẻ em: <strong>{loc.childPrice}</strong></p>
                                        <p>Thời gian: <strong>{loc.time}</strong></p>
                                        <button className="btn btn-primary" onClick={() => addLocation(loc)}>Chọn</button>
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
