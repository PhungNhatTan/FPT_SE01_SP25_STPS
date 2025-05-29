import React, { useState, useEffect } from 'react';
import RevenueService from '../../services/RevenueService';
import { getCompanyByUserId } from '../../services/TourismCompanyService';
import { getUserIdFromToken } from '../../utils/JwtHelper';

const RevenueStatistics = () => {
    const [revenueData, setRevenueData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [userCompany, setUserCompany] = useState(null);
    const [dateRange, setDateRange] = useState({
        fromDate: new Date(new Date().getFullYear(), 0, 1).toISOString().split('T')[0], // Start of year
        toDate: new Date().toISOString().split('T')[0] // Today
    });

    useEffect(() => {
        fetchUserCompany();
    }, []);

    useEffect(() => {
        if (userCompany) {
            fetchRevenueData();
        }
    }, [userCompany, dateRange]);

    const fetchUserCompany = async () => {
        try {
            const userId = getUserIdFromToken();
            if (userId) {
                const response = await getCompanyByUserId(parseInt(userId));
                if (response.data.success) {
                    setUserCompany(response.data.data);
                } else {
                    setError('Bạn chưa có công ty du lịch. Vui lòng liên hệ admin.');
                }
            } else {
                setError('Không thể lấy thông tin người dùng.');
            }
        } catch (err) {
            console.error('Error fetching user company:', err);
            setError('Có lỗi xảy ra khi lấy thông tin công ty.');
        }
    };

    const fetchRevenueData = async () => {
        setLoading(true);
        try {
            const response = await RevenueService.getCompanyRevenue(
                userCompany.id,
                dateRange.fromDate,
                dateRange.toDate
            );

            if (response.success) {
                setRevenueData(response.data);
            } else {
                setError(response.message || 'Không thể lấy dữ liệu doanh thu');
            }
        } catch (err) {
            console.error('Error fetching revenue data:', err);
            setError('Có lỗi xảy ra khi lấy dữ liệu doanh thu');
        }
        setLoading(false);
    };

    const handleProcessRevenueTransfers = async () => {
        try {
            setLoading(true);
            const response = await RevenueService.processScheduledRevenueTransfers();
            if (response.success) {
                alert('Đã xử lý chuyển tiền thành công!');
                await fetchRevenueData(); // Refresh data
            } else {
                alert('Có lỗi xảy ra khi xử lý chuyển tiền');
            }
        } catch (err) {
            console.error('Error processing revenue transfers:', err);
            alert('Có lỗi xảy ra khi xử lý chuyển tiền');
        } finally {
            setLoading(false);
        }
    };

    const handleDateRangeChange = (e) => {
        setDateRange({
            ...dateRange,
            [e.target.name]: e.target.value
        });
    };

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND'
        }).format(amount);
    };

    if (error && !userCompany) {
        return (
            <div className="container-fluid">
                <div className="alert alert-danger" role="alert">
                    {error}
                </div>
            </div>
        );
    }

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-12">
                    <h2>Thống kê doanh thu</h2>

                    {userCompany && (
                        <div className="alert alert-info mb-4">
                            <strong>Công ty:</strong> {userCompany.companyName}
                        </div>
                    )}

                    {/* Date Range Filter */}
                    <div className="card mb-4">
                        <div className="card-body">
                            <h5 className="card-title">Bộ lọc thời gian</h5>
                            <div className="row">
                                <div className="col-md-4">
                                    <label className="form-label">Từ ngày:</label>
                                    <input
                                        type="date"
                                        className="form-control"
                                        name="fromDate"
                                        value={dateRange.fromDate}
                                        onChange={handleDateRangeChange}
                                    />
                                </div>
                                <div className="col-md-4">
                                    <label className="form-label">Đến ngày:</label>
                                    <input
                                        type="date"
                                        className="form-control"
                                        name="toDate"
                                        value={dateRange.toDate}
                                        onChange={handleDateRangeChange}
                                    />
                                </div>
                                <div className="col-md-4 d-flex align-items-end gap-2">
                                    <button
                                        className="btn btn-primary"
                                        onClick={fetchRevenueData}
                                        disabled={loading}
                                    >
                                        {loading ? 'Đang tải...' : 'Cập nhật'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {loading ? (
                        <div className="text-center">
                            <div className="spinner-border" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </div>
                            <p className="mt-2">Đang tải dữ liệu doanh thu...</p>
                        </div>
                    ) : error ? (
                        <div className="alert alert-danger">{error}</div>
                    ) : revenueData ? (
                        <>
                            {/* Revenue Summary Cards */}
                            <div className="row mb-4">
                                <div className="col-md-3">
                                    <div className="card bg-primary text-white">
                                        <div className="card-body">
                                            <h5 className="card-title">Tổng doanh thu</h5>
                                            <h3>{formatCurrency(revenueData.totalRevenue)}</h3>
                                            <small>Đã nhận được</small>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-3">
                                    <div className="card bg-warning text-white">
                                        <div className="card-body">
                                            <h5 className="card-title">Doanh thu chờ</h5>
                                            <h3>{formatCurrency(revenueData.pendingRevenue)}</h3>
                                            <small>Chờ xử lý</small>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-3">
                                    <div className="card bg-success text-white">
                                        <div className="card-body">
                                            <h5 className="card-title">Tổng booking</h5>
                                            <h3>{revenueData.totalBookings}</h3>
                                            <small>Đã thanh toán</small>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-3">
                                    <div className="card bg-danger text-white">
                                        <div className="card-body">
                                            <h5 className="card-title">Booking hủy</h5>
                                            <h3>{revenueData.cancelledBookings}</h3>
                                            <small>Đã hủy</small>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Debug Info */}
                            <div className="alert alert-info mb-4">
                                <h6><i className="fas fa-info-circle me-2"></i>Thông tin hệ thống:</h6>
                                <ul className="mb-0">
                                    <li><strong>Doanh thu chờ:</strong> {formatCurrency(revenueData.pendingRevenue)} - Sẽ được chuyển sau khi hết hạn hủy tour (3 ngày trước ngày khởi hành)</li>
                                    <li><strong>Background Service:</strong> Tự động xử lý mỗi giờ</li>
                                    <li><strong>Test Manual:</strong> Click nút "Xử lý chuyển tiền" để test ngay</li>
                                </ul>
                            </div>

                            {/* Monthly Revenue Chart */}
                            {revenueData.monthlyData && revenueData.monthlyData.length > 0 && (
                                <div className="card mb-4">
                                    <div className="card-body">
                                        <h5 className="card-title">Doanh thu theo tháng</h5>
                                        <div className="table-responsive">
                                            <table className="table table-striped">
                                                <thead>
                                                    <tr>
                                                        <th>Tháng/Năm</th>
                                                        <th>Doanh thu</th>
                                                        <th>Số booking</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {revenueData.monthlyData.map((month, index) => (
                                                        <tr key={index}>
                                                            <td>{month.month}/{month.year}</td>
                                                            <td>{formatCurrency(month.revenue)}</td>
                                                            <td>{month.bookingCount}</td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Recent Transactions */}
                            {revenueData.recentTransactions && revenueData.recentTransactions.length > 0 && (
                                <div className="card">
                                    <div className="card-body">
                                        <h5 className="card-title">Giao dịch gần đây</h5>
                                        <div className="table-responsive">
                                            <table className="table table-striped">
                                                <thead>
                                                    <tr>
                                                        <th>ID</th>
                                                        <th>Loại</th>
                                                        <th>Tour</th>
                                                        <th>Số tiền</th>
                                                        <th>Trạng thái</th>
                                                        <th>Ngày</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {revenueData.recentTransactions.map((transaction) => (
                                                        <tr key={transaction.transactionId}>
                                                            <td>{transaction.transactionId}</td>
                                                            <td>
                                                                <span className={` ${
                                                                    transaction.transactionType === 'Revenue' ? 'bg-success' : 'bg-warning'
                                                                }`}>
                                                                    {transaction.transactionType === 'Revenue' ? 'Doanh thu' : 'Hoàn tiền'}
                                                                </span>
                                                            </td>
                                                            <td>{transaction.tourName}</td>
                                                            <td>{formatCurrency(transaction.amount)}</td>
                                                            <td>
                                                                <span className={` ${
                                                                    transaction.status === 'Completed' ? 'bg-success' :
                                                                    transaction.status === 'Pending' ? 'bg-warning' : 'bg-danger'
                                                                }`}>
                                                                    {transaction.status === 'Completed' ? 'Hoàn thành' :
                                                                     transaction.status === 'Pending' ? 'Đang chờ' : 'Thất bại'}
                                                                </span>
                                                            </td>
                                                            <td>{new Date(transaction.date).toLocaleDateString('vi-VN')}</td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </>
                    ) : null}
                </div>
            </div>
        </div>
    );
};

export default RevenueStatistics;
