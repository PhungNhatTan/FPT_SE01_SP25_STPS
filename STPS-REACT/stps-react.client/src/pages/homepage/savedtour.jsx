import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./header";
import "../../style/savedtour.css";
import { CustomTourService } from "../../services/CustomTourService";

const SavedTour = () => {
    const [savedTours, setSavedTours] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const _customTourService = new CustomTourService();

    useEffect(() => {
        fetchSavedTours();
    }, []);

    const fetchSavedTours = async () => {
        setLoading(true);
        setError("");
        try {
            // Lấy userId từ localStorage (nếu đã đăng nhập)
            const userInfo = JSON.parse(localStorage.getItem("userInfo")) || {};
            const userId = userInfo.userId || 1; // Mặc định là 1 nếu không có

            // Gọi API để lấy danh sách tour đã lưu
            const response = await _customTourService.getCustomToursByUserId(userId);

            if (response.data && response.data.success) {
                setSavedTours(response.data.data || []);
                console.log("Danh sách tour đã lưu:", response.data.data);
            } else {
                // Nếu API không thành công, sử dụng dữ liệu từ localStorage
                const localTours = JSON.parse(localStorage.getItem("savedTours")) || [];
                setSavedTours(localTours);
                console.log("Sử dụng dữ liệu từ localStorage:", localTours);
            }
        } catch (err) {
            console.error("Lỗi khi lấy danh sách tour đã lưu:", err);
            setError("Không thể tải danh sách tour đã lưu");

            // Nếu có lỗi, sử dụng dữ liệu từ localStorage
            const localTours = JSON.parse(localStorage.getItem("savedTours")) || [];
            setSavedTours(localTours);
        } finally {
            setLoading(false);
        }
    };

    const handleViewTour = (tour) => {
        navigate("/customizetour", { state: { tour } });
    };

    const handleDeleteTour = async (tourId, index) => {
        if (!window.confirm("Bạn có chắc chắn muốn xóa tour này?")) {
            return;
        }

        setLoading(true);
        try {
            // Xóa tour từ API
            if (tourId) {
                const response = await _customTourService.deleteCustomTour(tourId);
                if (response.data && response.data.success) {
                    console.log("Đã xóa tour từ API:", tourId);
                }
            }

            // Xóa tour từ state và localStorage
            const updatedTours = savedTours.filter((_, i) => i !== index);
            setSavedTours(updatedTours);

            // Cập nhật localStorage
            const localTours = JSON.parse(localStorage.getItem("savedTours")) || [];
            const updatedLocalTours = localTours.filter((tour) =>
                !tourId || tour.customTourId !== tourId
            );
            localStorage.setItem("savedTours", JSON.stringify(updatedLocalTours));

        } catch (err) {
            console.error("Lỗi khi xóa tour:", err);
            alert("Có lỗi xảy ra khi xóa tour. Vui lòng thử lại sau.");
        } finally {
            setLoading(false);
        }
    };

    // Hàm tính giá tour dựa trên cấu trúc dữ liệu
    const calculateTotalPrice = (tour) => {
        try {
            // Nếu tour có estimatedPrice từ API
            if (tour.estimatedPrice) {
                const price = parseFloat(tour.estimatedPrice);
                return {
                    adultPrice: price.toLocaleString("vi-VN"),
                    childPrice: (price * 0.7).toLocaleString("vi-VN") // Giả sử giá trẻ em bằng 70% giá người lớn
                };
            }

            // Nếu tour có mainTour (từ cấu trúc mới)
            if (tour.mainTour && tour.mainTour.adultPrice) {
                return {
                    adultPrice: parseFloat(tour.mainTour.adultPrice).toLocaleString("vi-VN"),
                    childPrice: parseFloat(tour.mainTour.childPrice).toLocaleString("vi-VN")
                };
            }

            // Nếu tour có locations (từ cấu trúc cũ)
            if (tour.locations && Array.isArray(tour.locations)) {
                const totalAdultPrice = tour.locations.reduce((total, loc) => {
                    const price = typeof loc.adultPrice === 'string'
                        ? parseInt(loc.adultPrice.replace(/\D/g, ""), 10)
                        : (loc.adultPrice || 0);
                    return total + price;
                }, 0);

                const totalChildPrice = tour.locations.reduce((total, loc) => {
                    const price = typeof loc.childPrice === 'string'
                        ? parseInt(loc.childPrice.replace(/\D/g, ""), 10)
                        : (loc.childPrice || 0);
                    return total + price;
                }, 0);

                return {
                    adultPrice: totalAdultPrice.toLocaleString("vi-VN"),
                    childPrice: totalChildPrice.toLocaleString("vi-VN")
                };
            }

            // Mặc định nếu không có thông tin giá - sử dụng giá mặc định
            return {
                adultPrice: "4.990.000",
                childPrice: "4.990.000"
            };
        } catch (error) {
            console.error("Lỗi khi tính giá tour:", error);
            return {
                adultPrice: "4.990.000",
                childPrice: "4.990.000"
            };
        }
    };

    return (
        <>
            <header className="header">
                <Header />
            </header>

            <div className="saved-tour-container">
                <h3 className="text-success">📌 Danh sách các tour đã lưu</h3>

                {/* Hiển thị thông báo lỗi nếu có */}
                {error && (
                    <div className="alert alert-danger" role="alert">
                        {error}
                    </div>
                )}

                {/* Hiển thị loading spinner */}
                {loading && (
                    <div className="text-center my-3">
                        <div className="spinner-border text-primary" role="status">
                            <span className="visually-hidden">Đang tải...</span>
                        </div>
                        <p className="mt-2">Đang tải danh sách tour...</p>
                    </div>
                )}

                <div className="saved-tour-list">
                    {!loading && savedTours.length === 0 ? (
                        <div className="alert alert-info">
                            <p className="mb-0">Chưa có tour nào được lưu.</p>
                        </div>
                    ) : (
                        savedTours.map((tour, index) => {
                            const { adultPrice, childPrice } = calculateTotalPrice(tour);

                            // Xác định tên tour
                            const tourName = tour.tourName || `Tour ${index + 1}`;

                            // Xác định danh sách địa điểm
                            let destinations = [];
                            if (tour.destinations && Array.isArray(tour.destinations)) {
                                destinations = tour.destinations;
                            } else if (tour.locations && Array.isArray(tour.locations)) {
                                destinations = tour.locations;
                            }

                            // Xác định tỉnh thành
                            let provinces = [];
                            if (tour.mainTour) {
                                provinces.push(tour.mainTour.tourName || tour.mainTour.province || "");
                            } else if (tour.locationTour && Array.isArray(tour.locationTour)) {
                                provinces = tour.locationTour.map(loc => loc.province || loc.tourName || "").filter(Boolean);
                            }

                            return (
                                <div key={index} className="saved-tour-item card shadow-sm mb-3">
                                    <div className="card-body">
                                        <div className="info">
                                            <h5 className="card-title">🗺️ {tourName}</h5>

                                            {provinces.length > 0 && (
                                                <p><strong>Tỉnh thành:</strong> {provinces.join(", ")}</p>
                                            )}

                                            {destinations.length > 0 && (
                                                <p>
                                                    <strong>Chương trình tour:</strong> {
                                                        destinations.map(dest =>
                                                            dest.destinationName || dest.name || ""
                                                        ).filter(Boolean).join(", ")
                                                    }
                                                </p>
                                            )}

                                            <p><strong>Giá vé người lớn:</strong> {adultPrice} VNĐ</p>
                                            <p><strong>Giá vé trẻ em:</strong> {childPrice} VNĐ</p>

                                            <p>
                                                <strong>Ngày tạo:</strong> {
                                                    tour.createdDate
                                                        ? new Date(tour.createdDate).toLocaleDateString('vi-VN')
                                                        : new Date().toLocaleDateString('vi-VN')
                                                }
                                            </p>

                                            <p>
                                                <strong>Trạng thái:</strong> {
                                                    tour.status || "Đang tạo"
                                                }
                                            </p>
                                        </div>
                                        <div className="buttons mt-3">
                                            
                                            <button
                                                className="btn btn-danger"
                                                onClick={() => handleDeleteTour(tour.customTourId, index)}
                                                disabled={loading}
                                            >
                                                {loading ? 'Đang xóa...' : 'Xóa'}
                                            </button>
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
