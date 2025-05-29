import React, { useState, useEffect } from "react";
import { TourServices } from "../../services/TourSevices";
import { getCompanyByUserId } from "../../services/TourismCompanyService";
import { getUserIdFromToken } from "../../utils/JwtHelper";
import "../../style/simple-sidebar.css";

const MTourList = ({ onAddTour, onEditTour, onViewDetail }) => {
    const [tourList, setTourList] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [userCompany, setUserCompany] = useState(null);
    const tourService = new TourServices();

    useEffect(() => {
        fetchUserCompanyAndTours();
    }, []);

    const fetchUserCompanyAndTours = async () => {
        setLoading(true);
        setError("");
        try {
            // Check token first
            const token = localStorage.getItem('token');
            console.log("Token exists:", !!token);
            console.log("Token value:", token ? token.substring(0, 50) + '...' : 'null');

            // First get user's company
            const userId = getUserIdFromToken();
            console.log("User ID from token:", userId);
            console.log("User ID type:", typeof userId);

            if (userId) {
                console.log("Fetching company for user:", userId);
                const companyResponse = await getCompanyByUserId(parseInt(userId));
                console.log("Company response:", companyResponse);

                if (companyResponse.data.success) {
                    const company = companyResponse.data.data;
                    console.log("User company:", company);
                    setUserCompany(company);

                    // Then get tours for this company
                    console.log("Fetching tours for company ID:", company.id);
                    try {
                        const toursResponse = await tourService.getToursByCompanyId(company.id);
                        console.log("Tours response:", toursResponse);
                        setTourList(toursResponse.data.data || []);
                    } catch (tourError) {
                        console.error("Error fetching tours by company:", tourError);
                        // Fallback: try to get all tours and filter by company
                        console.log("Fallback: Getting all tours");
                        const allToursResponse = await tourService.getAllTours();
                        const allTours = allToursResponse.data.data || [];
                        const companyTours = allTours.filter(tour => tour.tourismCompanyId === company.id);
                        console.log("Filtered company tours:", companyTours);
                        setTourList(companyTours);
                    }
                } else {
                    console.log("Company response failed:", companyResponse.data);
                    setError("Bạn chưa có công ty du lịch. Vui lòng liên hệ admin để được cấp quyền.");
                }
            } else {
                setError("Không thể lấy thông tin người dùng. Vui lòng đăng nhập lại.");
            }
        } catch (err) {
            console.error("Error fetching data:", err);
            console.error("Error details:", err.response);
            setError(`Không thể tải danh sách tour: ${err.message}`);
        }
        setLoading(false);
    };

    const handleDelete = async (id) => {
        if (window.confirm("Bạn có chắc chắn muốn xóa tour này?")) {
            try {
                setLoading(true);
                await tourService.deleteTour(id);
                fetchUserCompanyAndTours(); // Refresh the list
            } catch (err) {
                alert("Xóa tour thất bại!");
            } finally {
                setLoading(false);
            }
        }
    };

    // Lọc danh sách tour theo từ khóa tìm kiếm
    const filteredTours = tourList.filter((tour) =>
        tour.tourName?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Hàm cắt ngắn mô tả
    const truncateDescription = (text, maxLength = 100) => {
        if (!text) return '';
        return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
    };

    return (
        <div>
            {userCompany && (
                <div className="alert alert-info mb-3">
                    <strong>Công ty:</strong> {userCompany.companyName} |
                    <strong> Đại diện:</strong> {userCompany.representativeName}
                </div>
            )}
            <div className="d-flex justify-content-between align-items-center mb-4">
                <div className="card-title">Danh sách Tour</div>
                <div className="d-flex gap-3">
                    <div className="search-bar">
                        <input
                            type="text"
                            placeholder="Tìm kiếm theo tên tour"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <button className="btn btn-primary" onClick={onAddTour}>
                        Thêm mới Tour
                    </button>
                </div>
            </div>

            {loading && <div className="text-center p-4">Đang tải dữ liệu...</div>}
            {error && <div className="alert alert-danger">{error}</div>}

            {filteredTours.length > 0 ? (
                <div className="table-container">
                    <table className="data-table">
                        <thead>
                            <tr>
                                <th style={{width: "50px"}}>ID</th>
                                <th style={{width: "20%"}}>Tên Tour</th>
                                <th style={{width: "100px"}}>Thời gian</th>
                                <th>Mô tả</th>
                                <th style={{width: "15%"}}>Giá vé người lớn</th>
                                <th style={{width: "15%"}}>Giá vé trẻ em</th>
                                <th style={{width: "120px", textAlign: "center"}}>Thao tác</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredTours.map((tour) => (
                                <tr key={tour.tourId} onClick={() => onViewDetail(tour)} style={{ cursor: "pointer" }}>
                                    <td>{tour.tourId}</td>
                                    <td className="truncate">{tour.tourName}</td>
                                    <td>{tour.duration} ngày</td>
                                    <td title={tour.description} className="truncate">{truncateDescription(tour.description)}</td>
                                    <td>{tour.adultPrice?.toLocaleString()} VND</td>
                                    <td>{tour.childPrice?.toLocaleString()} VND</td>
                                    <td>
                                        <div className="table-actions">
                                            <button
                                                className="btn btn-icon btn-warning"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    onEditTour(tour.tourId);
                                                }}
                                                title="Chỉnh sửa"
                                            >
                                                🛠️
                                            </button>
                                            <button
                                                className="btn btn-icon btn-danger"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleDelete(tour.tourId);
                                                }}
                                                title="Xóa"
                                            >
                                                🗑️
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                !loading && (
                    <div className="text-center p-5 text-muted">
                        <p>Không tìm thấy tour phù hợp.</p>
                    </div>
                )
            )}
        </div>
    );
};

export default MTourList;