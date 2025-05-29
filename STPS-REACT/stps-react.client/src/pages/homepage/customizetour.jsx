import React, { useState, useEffect, useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import banner from "../../assets/banner.jpg";
import "../../style/customizetour.css";
import Header from "./header";
import { useNavigate } from "react-router-dom";
import BookingPopup from "./booking";
import { CityService } from "../../services/CityService";
import { TourServices } from "../../services/TourSevices";
import { DesnitionService } from "../../services/DesnitionService";
import { CustomTourService } from "../../services/CustomTourService";

const Customizetour = () => {
    const navigate = useNavigate();

    // Khai báo tất cả các state ở đầu component
    const [locations, setLocations] = useState([]);
    const [locationTour, setLocationTour] = useState([]);
    const [selectedProvinceId, setSelectedProvinceId] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [showModal1, setShowModal1] = useState(false);
    const [showBookingPopup, setShowBookingPopup] = useState(false);
    const [searchTour, setSearchTour] = useState("");
    const [searchLocation, setSearchLocation] = useState("");
    const [listCity, setListCity] = useState([]);
    const [listDes, setListDes] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [selectedDestinations, setSelectedDestinations] = useState([]);
    const [tourName, setTourName] = useState("Tour du lịch tùy chỉnh");
    const [desTmp, setDesTmp] = useState("");
    const [vehTmp, setVehTmp] = useState("");
    const [priceAdTmp, setPriceAdTmp] = useState("");
    const [priceChTmp, setPriceChTmp] = useState("");
    const [durTmp, setDurTmp] = useState("");
    const [showDetailDes, setShowDetailDes] = useState(false);
    const [desDetailNow, setDesDetailNow] = useState();

    // Khởi tạo các service
    const _cityService = new CityService();
    const _tourServce = new TourServices();
    const _destinationService = new DesnitionService();
    const _customTourService = new CustomTourService();

    const addLocation = async (loc) => {
        setShowDetailDes(true);
        setDesDetailNow(loc);

        try {
            // Lấy thông tin chi tiết của điểm đến từ API
            const response = await _destinationService.getDestinationById(loc.destinationId);

            if (response.data && response.data.success) {
                const destinationDetail = response.data.data;
                console.log("Chi tiết điểm đến:", destinationDetail);
                console.log("ID điểm đến:", loc.destinationId);
                console.log("Tên điểm đến:", loc.destinationName);

                // Kiểm tra chi tiết điểm đến
                if (destinationDetail.details && destinationDetail.details.length > 0) {
                    console.log("Chi tiết:", destinationDetail.details);

                    // Tìm thông tin giá vé
                    const priceDetail = destinationDetail.details.find(detail =>
                        detail.featureType && detail.featureType.toLowerCase().includes("giá vé"));

                    if (priceDetail) {
                        console.log("Thông tin giá vé:", priceDetail.featureValue);
                    } else {
                        console.log("Không tìm thấy thông tin giá vé trong chi tiết");

                        // Nếu không tìm thấy thông tin giá vé, thêm giá mặc định
                        destinationDetail.details.push({
                            detailId: 0,
                            featureType: "Giá vé",
                            featureValue: "250.000 VND"
                        });

                        console.log("Đã thêm giá mặc định:", destinationDetail.details);
                    }
                } else {
                    console.log("Không có thông tin chi tiết cho điểm đến này");

                    // Tạo mảng chi tiết mới với giá mặc định
                    destinationDetail.details = [{
                        detailId: 0,
                        featureType: "Giá vé",
                        featureValue: "250.000 VND"
                    }];

                    console.log("Đã tạo chi tiết với giá mặc định:", destinationDetail.details);
                }

                // Thêm địa điểm với thông tin chi tiết vào danh sách đã chọn
                if (!selectedDestinations.some(dest => dest.destinationId === loc.destinationId)) {
                    const destinationWithDetails = {
                        ...loc,
                        details: destinationDetail.details || []
                    };

                    setSelectedDestinations([...selectedDestinations, destinationWithDetails]);

                    // Cập nhật thông tin chi tiết cho hiển thị
                    setDesDetailNow(destinationWithDetails);

                    // Log để kiểm tra
                    console.log("Đã thêm điểm đến với chi tiết:", destinationWithDetails);
                }
            } else {
                console.error("Không thể lấy thông tin chi tiết điểm đến:", response.data?.message);

                // Thêm địa điểm với giá mặc định vào danh sách đã chọn
                if (!selectedDestinations.some(dest => dest.destinationId === loc.destinationId)) {
                    const destinationWithDefaultPrice = {
                        ...loc,
                        details: [{
                            detailId: 0,
                            featureType: "Giá vé",
                            featureValue: "250.000 VND"
                        }]
                    };

                    setSelectedDestinations([...selectedDestinations, destinationWithDefaultPrice]);
                }
            }
        } catch (error) {
            console.error("Lỗi khi lấy thông tin chi tiết điểm đến:", error);

            // Thêm địa điểm với giá mặc định vào danh sách đã chọn
            if (!selectedDestinations.some(dest => dest.destinationId === loc.destinationId)) {
                const destinationWithDefaultPrice = {
                    ...loc,
                    details: [{
                        detailId: 0,
                        featureType: "Giá vé",
                        featureValue: "250.000 VND"
                    }]
                };

                setSelectedDestinations([...selectedDestinations, destinationWithDefaultPrice]);
            }
        }
    };

    const addTourLocation = async (loctour) => {
        console.log("Đã chọn tỉnh/thành phố:", loctour);

        setLocationTour([...locationTour, loctour]);
        setSelectedProvinceId(loctour.tourId); // lưu lại tỉnh đã chọn

        try {
            // Lấy thông tin tour từ API
            const response = await _tourServce.getTourById(loctour.tourId);
            if (response.data && response.data.success) {
                console.log("Thông tin tour từ API:", response.data.data);

                // Kiểm tra xem có dữ liệu destinations không
                if (response.data.data && response.data.data.destinations) {
                    setListDes(response.data.data);
                    console.log("Danh sách điểm đến của tỉnh/thành phố này:", response.data.data.destinations);
                } else {
                    console.error("Không có dữ liệu destinations trong response");
                    setError("Không có điểm đến nào cho tỉnh/thành phố này");

                    // Reset danh sách điểm đến
                    setListDes({ destinations: [] });
                }
            } else {
                console.error("API trả về lỗi:", response.data?.message);
                setError("Không thể tải thông tin tour: " + (response.data?.message || "Lỗi không xác định"));

                // Reset danh sách điểm đến
                setListDes({ destinations: [] });
            }
        } catch (error) {
            console.error("Lỗi khi lấy thông tin tour:", error);
            setError("Lỗi khi tải thông tin tour: " + (error.message || "Không xác định"));

            // Reset danh sách điểm đến
            setListDes({ destinations: [] });
        }
    };

    const removeLocation = (id) => {
        setLocations(locations.filter((location) => location.id !== id));
    };

    const removeLocationTour = (id) => {
        setLocationTour(locationTour.filter((locationT) => {
            // Kiểm tra cả id và tourId để đảm bảo xóa đúng tour
            return locationT.id !== id && locationT.tourId !== id;
        }));
        setSelectedProvinceId(null);
        setShowDetailDes(false);
        setLocations([]); // reset địa điểm nếu xóa tour
        setSelectedDestinations([]); // reset địa điểm đã chọn
    };

    // Sử dụng dữ liệu từ API thay vì dữ liệu cứng
    const availableTourLocations = listCity || [];

    // Lọc địa điểm theo từ khóa tìm kiếm
    const filteredTourLocations = availableTourLocations.filter(tour =>
        tour.tourName && tour.tourName.toLowerCase().includes(searchTour.toLowerCase())
    );

    // Lọc địa điểm đã chọn theo từ khóa tìm kiếm
    const filteredDestinations = Array.isArray(listDes?.destinations)
        ? listDes.destinations.filter(dest =>
            dest.destinationName && dest.destinationName.toLowerCase().includes(searchLocation.toLowerCase())
          )
        : [];

    // Hàm lấy giá từ chuỗi giá vé
    const extractPriceFromString = (priceString) => {
        if (!priceString) return 0;

        console.log("Trích xuất giá từ chuỗi:", priceString);

        // Xử lý trường hợp "Miễn phí"
        if (priceString.toLowerCase().includes("miễn phí")) {
            console.log("Đây là giá miễn phí");
            return 0;
        }

        // Loại bỏ tất cả ký tự không phải số
        const numericValue = priceString.replace(/[^\d]/g, '');
        const result = numericValue ? parseInt(numericValue, 10) : 0;

        console.log("Giá sau khi trích xuất:", result);
        return result;
    };

    // Hàm lấy giá vé từ điểm đến
    const getDestinationPrice = (destination) => {
        try {
            if (!destination) return 0;

            console.log("Lấy giá vé cho điểm đến:", destination.destinationName, "ID:", destination.destinationId);

            // Xử lý giá cứng dựa trên ID điểm đến (tạm thời để debug)
            if (destination.destinationId) {
                // Dựa vào dữ liệu seed trong API
                switch (destination.destinationId) {
                    case 1: // Hồ Gươm
                        console.log("Hồ Gươm - Miễn phí");
                        return 0;
                    case 2: // Văn Miếu - Quốc Tử Giám
                        console.log("Văn Miếu - 30.000 VND");
                        return 30000;
                    case 15: // Bà Nà Hills
                        console.log("Bà Nà Hills - 750.000 VND");
                        return 750000;
                    case 20: // Đại Nội Huế
                        console.log("Đại Nội Huế - 200.000 VND");
                        return 200000;
                    case 25: // Vinpearl Land
                        console.log("Vinpearl Land - 880.000 VND");
                        return 880000;
                    case 10: // Nhà thờ Đức Bà
                        console.log("Nhà thờ Đức Bà - Miễn phí");
                        return 0;
                    case 30: // Fansipan
                        console.log("Fansipan - 700.000 VND");
                        return 700000;
                    default:
                        // Nếu không phải các ID đã biết, tiếp tục xử lý bình thường
                        break;
                }
            }

            // Nếu có thông tin chi tiết
            if (destination.details && destination.details.length > 0) {
                // Tìm chi tiết "Giá vé" trong danh sách chi tiết
                const priceDetail = destination.details.find(detail =>
                    detail.featureType && detail.featureType.toLowerCase().includes("giá vé"));

                if (priceDetail && priceDetail.featureValue) {
                    console.log(`Giá vé của ${destination.destinationName}:`, priceDetail.featureValue);

                    // Kiểm tra nếu là "Miễn phí"
                    if (priceDetail.featureValue.toLowerCase().includes("miễn phí")) {
                        console.log(`${destination.destinationName} có giá vé miễn phí`);
                        return 0;
                    }

                    const extractedPrice = extractPriceFromString(priceDetail.featureValue);
                    console.log(`Giá vé sau khi trích xuất: ${extractedPrice}`);
                    return extractedPrice;
                }
            }

            // Nếu không tìm thấy giá, sử dụng giá mặc định
            console.log(`Không tìm thấy giá vé cho ${destination.destinationName}, sử dụng giá mặc định`);
            return 250000; // Giá mặc định là 250.000 VND
        } catch (error) {
            console.error("Lỗi khi lấy giá vé từ điểm đến:", error);
            return 250000; // Giá mặc định là 250.000 VND
        }
    };

    // Hàm tính tổng giá vé từ các điểm đến đã chọn
    const calculateTotalDestinationsPrice = () => {
        try {
            if (!selectedDestinations || selectedDestinations.length === 0) return 0;

            // Tính tổng giá từ tất cả các điểm đến đã chọn
            return selectedDestinations.reduce((total, destination) => {
                const destinationPrice = getDestinationPrice(destination);
                return total + destinationPrice;
            }, 0);
        } catch (error) {
            console.error("Lỗi khi tính tổng giá từ các điểm đến:", error);
            return 0;
        }
    };

    // Hàm tính tổng giá vé
    const getTotalPrice = () => {
        try {
            // Tính tổng giá từ các điểm đến
            const destinationsPrice = calculateTotalDestinationsPrice();

            // Nếu có giá từ các điểm đến, sử dụng giá đó
            if (destinationsPrice > 0) {
                return destinationsPrice.toLocaleString("vi-VN") + " VNĐ";
            }

            // Nếu không, sử dụng giá từ tour (cách cũ)
            if (locationTour.length > 0 && locationTour[0].adultPrice) {
                const adultPrice = parseFloat(locationTour[0].adultPrice) || 0;
                const childPrice = parseFloat(locationTour[0].childPrice) || 0;
                return (adultPrice + childPrice).toLocaleString("vi-VN") + " VNĐ";
            }

            return "0 VNĐ";
        } catch (error) {
            console.error("Lỗi khi tính tổng giá:", error);
            return "0 VNĐ";
        }
    };

    // Hàm tính giá vé người lớn
    const getTotalAdultPrice = () => {
        try {
            // Tính tổng giá từ các điểm đến
            const destinationsPrice = calculateTotalDestinationsPrice();

            // Nếu có giá từ các điểm đến, sử dụng giá đó
            if (destinationsPrice > 0) {
                return destinationsPrice.toLocaleString("vi-VN") + " VNĐ";
            } else {
                return "Miễn phí";
            }
        } catch (error) {
            console.error("Lỗi khi tính giá vé người lớn:", error);
            return "Miễn phí";
        }
    };

    // Hàm tính giá vé trẻ em (70% giá người lớn)
    const getTotalChildPrice = () => {
        try {
            // Tính tổng giá từ các điểm đến
            const destinationsPrice = calculateTotalDestinationsPrice();

            // Nếu có giá từ các điểm đến, sử dụng 70% giá đó cho trẻ em
            if (destinationsPrice > 0) {
                const childPrice = Math.round(destinationsPrice * 0.7);
                return childPrice.toLocaleString("vi-VN") + " VNĐ";
            } else {
                return "Miễn phí";
            }
        } catch (error) {
            console.error("Lỗi khi tính giá vé trẻ em:", error);
            return "Miễn phí";
        }
    };

    // Hàm tính tổng thời gian
    const getTotalTime = () => {
        try {
            if (locationTour.length > 0 && locationTour[0].duration) {
                return locationTour[0].duration + " ngày";
            }
            return "1 ngày";
        } catch (error) {
            console.error("Lỗi khi tính thời gian:", error);
            return "1 ngày";
        }
    };

    const handleSaveTour = async () => {
        if (selectedDestinations.length === 0) {
            alert("Vui lòng chọn ít nhất một địa điểm cho tour");
            return;
        }

        setLoading(true);
        setError("");

        try {
            // Lấy userId từ localStorage (nếu đã đăng nhập)
            const userInfo = JSON.parse(localStorage.getItem("userInfo")) || {};
            const userId = userInfo.userId || 1; // Mặc định là 1 nếu không có

            // Tính tổng giá từ các điểm đến đã chọn
            const destinationsPrice = calculateTotalDestinationsPrice();

            // Sử dụng giá từ các điểm đến
            const adultPrice = destinationsPrice;

            // Chuẩn bị dữ liệu để gửi lên API
            const customTourData = {
                userId: userId,
                tourName: tourName,
                destinationIds: selectedDestinations.map(dest => dest.destinationId),
                estimatedPrice: adultPrice // Thêm giá ước tính
            };

            // Gọi API để tạo custom tour
            const response = await _customTourService.createCustomTour(customTourData);

            if (response.data && response.data.success) {
                // Lấy thông tin tour đã tạo từ response
                const createdTour = response.data.data;

                // Tạo đối tượng tour với đầy đủ thông tin
                const newTour = {
                    customTourId: createdTour.customTourId,
                    tourName: createdTour.tourName,
                    destinations: selectedDestinations,
                    mainTour: locationTour.length > 0 ? locationTour[0] : null,
                    createdDate: createdTour.createdDate,
                    status: createdTour.status,
                    estimatedPrice: createdTour.estimatedPrice || adultPrice // Lưu giá ước tính
                };

                // Lưu vào localStorage để tương thích với code cũ
                const savedTours = JSON.parse(localStorage.getItem("savedTours")) || [];
                savedTours.push(newTour);
                localStorage.setItem("savedTours", JSON.stringify(savedTours));

                alert("Lưu Tour tùy chỉnh thành công!");

                // Chuyển hướng đến trang saved-tour
                navigate("/saved-tour");
            } else {
                setError(response.data?.message || "Không thể lưu tour");
                alert("Lỗi: " + (response.data?.message || "Không thể lưu tour"));
            }
        } catch (err) {
            console.error("Lỗi khi lưu tour:", err);
            setError("Lỗi khi lưu tour: " + (err.message || "Không xác định"));
            alert("Lỗi khi lưu tour: " + (err.message || "Không xác định"));
        } finally {
            setLoading(false);
        }
    };

    //----fetch api

    useEffect(() => {
        const fetchTourData = async () => {
            setLoading(true);
            setError("");
            try {
                // Lấy danh sách tour nổi bật
                const tourResponse = await _tourServce.getTourFeatured();
                if (tourResponse.data && tourResponse.data.success) {
                    setListCity(tourResponse.data.data || []);
                } else {
                    setError("Không thể tải danh sách tour");
                }

                // Lấy danh sách thành phố
                try {
                    const cityResponse = await _cityService.getAllCities();
                    if (cityResponse.data && cityResponse.data.success) {
                        // Có thể sử dụng dữ liệu thành phố nếu cần
                        console.log("Danh sách thành phố:", cityResponse.data.data);
                    }
                } catch (cityError) {
                    console.error("Lỗi khi lấy danh sách thành phố:", cityError);
                    // Không hiển thị lỗi này cho người dùng vì không ảnh hưởng đến chức năng chính
                }

                // Lấy danh sách địa điểm nổi bật
                const destinationResponse = await _destinationService.getFeatured();
                if (destinationResponse.data && destinationResponse.data.success) {
                    console.log("Địa điểm nổi bật:", destinationResponse.data.data);
                }
            } catch (error) {
                console.error("Lỗi khi fetch dữ liệu:", error);
                setError("Lỗi khi tải dữ liệu: " + (error.message || "Không xác định"));
            } finally {
                setLoading(false);
            }
        };

        fetchTourData();
    }, []);

    const getAllDes = () => {
        if (listDes && listDes.destinations) {
            console.log("Danh sách điểm đến hiện tại:", listDes.destinations);

            // Kiểm tra xem có điểm đến nào không
            if (listDes.destinations.length === 0) {
                setError("Không có điểm đến nào cho tỉnh/thành phố này");
            }
        } else {
            console.log("Không có dữ liệu địa điểm");
            setError("Không có dữ liệu điểm đến");
        }
    }

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
                            <p className="mt-2">Đang xử lý...</p>
                        </div>
                    )}

                    

                    {locationTour.length === 0 && (
                        <button className="btn btn-primary mt-4" onClick={() => setShowModal1(true)}>➕ Chọn địa điểm Tour</button>
                    )}

                    {locationTour.map((locationT) => (
                        <div className="location-card" key={locationT.tourId || locationT.id}>
                            <h2 className="text-primary">{locationT.tourName || locationT.province}</h2>
                            <p><strong>Điểm đến: </strong>{locationT.tourName || locationT.province}</p>
                            <button className="btn btn-sm btn-outline-danger mt-2" onClick={() => removeLocationTour(locationT.tourId || locationT.id)}>Xóa lựa chọn</button>
                        </div>
                    ))}

                    {/* Hiển thị danh sách địa điểm đã chọn */}
                    {selectedDestinations.length > 0 && (
                        <div className="mt-4">
                            <h4 className="text-primary">Địa điểm đã chọn:</h4>
                            <ul className="list-group">
                                {selectedDestinations.map((dest, index) => {
                                    // Lấy giá của điểm đến
                                    const destinationPrice = getDestinationPrice(dest);

                                    return (
                                        <li key={`list-${dest.destinationId || index}`} className="list-group-item d-flex justify-content-between align-items-center">
                                            <div>
                                                <span className="badge bg-primary me-2">{index + 1}</span>
                                                {dest.destinationName}
                                                {dest.cityName && <span className="text-muted ms-2">({dest.cityName})</span>}
                                                <span className={`badge ms-2 ${destinationPrice > 0 ? 'bg-success' : 'bg-secondary'}`}>
                                                    {destinationPrice > 0 ? destinationPrice.toLocaleString("vi-VN") + " VNĐ" : "Miễn phí"}
                                                </span>
                                            </div>
                                            <button
                                                className="btn btn-sm btn-outline-danger"
                                                onClick={() => setSelectedDestinations(selectedDestinations.filter(d => d.destinationId !== dest.destinationId))}
                                            >
                                                Xóa
                                            </button>
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>
                    )}

                    {(locationTour.length > 0 || selectedDestinations.length > 0) && (
                        <div className="mt-3">
                            <button className="btn btn-warning me-2" onClick={() => setShowBookingPopup(true)}>Đặt vé ngay</button>
                            <button
                                className="btn btn-success"
                                onClick={handleSaveTour}
                                disabled={loading || selectedDestinations.length === 0}
                            >
                                {loading ? 'Đang lưu...' : 'Lưu Tour'}
                            </button>
                        </div>
                    )}
                </div>
            </div>

            <div className="container mt-4">
                <div className="content-box">
                    <h3 className="text-success">📌 Chương Trình Tour</h3>

                    {showDetailDes && desDetailNow && (
                        <div className="destination-detail mt-3">
                            <div className="card">
                                <div className="card-header bg-primary text-white">
                                    <h5 className="mb-0">{desDetailNow.destinationName}</h5>
                                </div>
                                <div className="card-body">
                                    {desDetailNow.description && (
                                        <p className="card-text">{desDetailNow.description}</p>
                                    )}
                                    {desDetailNow.cityName && (
                                        <p><strong>Thành phố:</strong> {desDetailNow.cityName}</p>
                                    )}

                                    {/* Hiển thị giá vé */}
                                    <p>
                                        <strong>Giá vé:</strong>
                                        <span className="text-primary ms-2">
                                            {(() => {
                                                const price = getDestinationPrice(desDetailNow);
                                                return price > 0
                                                    ? price.toLocaleString("vi-VN") + " VNĐ"
                                                    : "Miễn phí";
                                            })()}
                                        </span>
                                    </p>

                                    {desDetailNow.isFeatured && (
                                        <span className="badge bg-warning text-dark me-2">Địa điểm nổi bật</span>
                                    )}

                                    {/* Hiển thị chi tiết nếu có */}
                                    {desDetailNow.details && desDetailNow.details.length > 0 && (
                                        <div className="destination-details mt-3">
                                            <h6>Chi tiết:</h6>
                                            <ul className="list-group list-group-flush">
                                                {desDetailNow.details
                                                    .filter(detail => !detail.featureType.toLowerCase().includes("giá vé")) // Loại bỏ giá vé vì đã hiển thị ở trên
                                                    .map((detail, detailIndex) => (
                                                        <li key={`detail-${detailIndex}`} className="list-group-item d-flex justify-content-between px-0">
                                                            <span>{detail.featureType}:</span>
                                                            <span className="text-primary">{detail.featureValue}</span>
                                                        </li>
                                                    ))
                                                }
                                            </ul>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}

                    {selectedProvinceId && (
                        <button className="btn btn-primary mt-4" onClick={() => {
                            setShowModal(true);
                            getAllDes();
                        }}>➕ Thêm địa điểm</button>
                    )}

                    {/* Hiển thị thông tin về các địa điểm đã chọn */}
                    {selectedDestinations.length > 0 && (
                        <div className="mt-4">
                            <h4>Lịch trình tour:</h4>

                            {/* Hiển thị tổng giá */}
                            <div className="tour-summary card mb-3">
                                <div className="card-body">
                                    <h5 className="card-title">Tổng quan tour</h5>
                                    <div className="d-flex justify-content-between align-items-center mb-2">
                                        <span>Tổng số điểm đến:</span>
                                        <strong>{selectedDestinations.length}</strong>
                                    </div>
                                    <div className="d-flex justify-content-between align-items-center mb-2">
                                        <span>Giá vé người lớn:</span>
                                        <strong className="text-success">{getTotalAdultPrice()}</strong>
                                    </div>
                                    <div className="d-flex justify-content-between align-items-center mb-2">
                                        <span>Giá vé trẻ em:</span>
                                        <strong className="text-success">{getTotalChildPrice()}</strong>
                                    </div>
                                    <div className="d-flex justify-content-between align-items-center mb-2 total-price-highlight">
                                        <span>Tổng giá tour:</span>
                                        <strong className="text-danger">
                                            {calculateTotalDestinationsPrice() > 0
                                                ? calculateTotalDestinationsPrice().toLocaleString("vi-VN") + " VNĐ"
                                                : "Miễn phí"}
                                        </strong>
                                    </div>
                                    <div className="d-flex justify-content-between align-items-center">
                                        <span>Thời gian dự kiến:</span>
                                        <strong>{selectedDestinations.length} ngày</strong>
                                    </div>
                                </div>
                            </div>

                            <div className="timeline mt-3">
                                {selectedDestinations.map((dest, index) => {
                                    // Lấy giá của điểm đến
                                    const destinationPrice = getDestinationPrice(dest);

                                    return (
                                        <div key={`timeline-${dest.destinationId || index}`} className="timeline-item">
                                            <div className="timeline-badge">{index + 1}</div>
                                            <div className="timeline-content">
                                                <div className="d-flex justify-content-between align-items-center">
                                                    <h5>{dest.destinationName}</h5>
                                                    <span className={`badge ${destinationPrice > 0 ? 'bg-success' : 'bg-secondary'}`}>
                                                        {destinationPrice > 0 ? destinationPrice.toLocaleString("vi-VN") + " VNĐ" : "Miễn phí"}
                                                    </span>
                                                </div>
                                                {dest.cityName && <p className="text-muted">Thành phố: {dest.cityName}</p>}
                                                {dest.description && (
                                                    <p className="timeline-description">{dest.description}</p>
                                                )}

                                                {/* Hiển thị chi tiết nếu có */}
                                                {dest.details && dest.details.length > 0 && (
                                                    <div className="destination-details mt-2">
                                                        
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Hiển thị Popup đặt vé */}
            {showBookingPopup && (
                <BookingPopup
                    priceAdult={getTotalAdultPrice()}
                    priceChild={getTotalChildPrice()}
                    tourId={locationTour[0]?.tourId || 1} // Thêm tourId từ tour đã chọn hoặc mặc định là 1
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
                                <input
                                    type="text"
                                    className="form-control mb-3"
                                    placeholder="🔍 Tìm tỉnh thành..."
                                    value={searchTour}
                                    onChange={(e) => setSearchTour(e.target.value)}
                                />
                                {listCity.map((loctour) => (
                                    <div key={loctour.cityId} className="card mb-2 p-2">
                                        <h6><strong>{loctour.tourName}</strong></h6>
                                        <button className="btn btn-primary" onClick={() => {
                                            addTourLocation(loctour);
                                            // setDesTmp(loctour.description);
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
                                <input
                                    type="text"
                                    className="form-control mb-3"
                                    placeholder="🔍 Tìm địa điểm..."
                                    value={searchLocation}
                                    onChange={(e) => setSearchLocation(e.target.value)}
                                />
                                {/* {filteredLocations.map((loc) => (
                                    <div key={loc.id} className="card mb-2 p-2">
                                        <h6><strong>{loc.name}</strong></h6>
                                        <button className="btn btn-primary" onClick={() => {
                                            addLocation(loc);
                                            setShowModal(false);
                                        }}>
                                            Chọn
                                        </button>
                                    </div>
                                ))} */}

                                {Array.isArray(listDes?.destinations) && listDes?.destinations.length > 0 ? (
                                    listDes?.destinations.map((loc) => (
                                        <div key={loc.destinationId} className="card mb-2 p-2">
                                            <h6><strong>{loc.destinationName}</strong></h6>
                                            {loc.cityName && <p className="text-muted mb-2">Thành phố: {loc.cityName}</p>}
                                            <div className="d-flex justify-content-between align-items-center">
                                                <span className="badge bg-info me-2">ID: {loc.destinationId}</span>
                                                <button className="btn btn-primary" onClick={() => {
                                                    addLocation(loc);
                                                    setShowModal(false);
                                                }}>
                                                    Chọn
                                                </button>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="alert alert-warning">
                                        <p className="mb-0">Không có địa điểm nào cho tỉnh/thành phố này.</p>
                                        <p className="mb-0">Vui lòng chọn tỉnh/thành phố khác.</p>
                                    </div>
                                )}

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
