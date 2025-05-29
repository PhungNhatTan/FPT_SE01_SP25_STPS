import React, { useState, useEffect } from 'react';
import { RevenueService } from '../../services/RevenueService';

const Statistic = () => {
    const [revenueData, setRevenueData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [dateRange, setDateRange] = useState({
        fromDate: new Date(new Date().setMonth(new Date().getMonth() - 12)).toISOString().split('T')[0],
        toDate: new Date().toISOString().split('T')[0]
    });

    const revenueService = new RevenueService();

    useEffect(() => {
        fetchRevenueData();
    }, []);

    const fetchRevenueData = async () => {
        setLoading(true);
        try {
            const response = await revenueService.getAdminRevenueStatistics(
                dateRange.fromDate,
                dateRange.toDate
            );

            if (response.success) {
                setRevenueData(response.data);
                setError('');
            } else {
                setError(response.message || 'Không thể lấy dữ liệu thống kê');
            }
        } catch (err) {
            console.error('Error fetching admin revenue data:', err);
            setError('Có lỗi xảy ra khi lấy dữ liệu thống kê');
        }
        setLoading(false);
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

    if (loading) {
        return (
            <div className="d-flex justify-content-center align-items-center" style={{ height: '400px' }}>
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="alert alert-danger" role="alert">
                {error}
            </div>
        );
    }

    return (
        <div className="admin-revenue-statistics">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2>Thống kê Doanh thu Hệ thống</h2>
                <button className="btn btn-primary" onClick={fetchRevenueData}>
                    <i className="fas fa-sync-alt me-2"></i>
                    Làm mới
                </button>
            </div>

            {/* Bộ lọc thời gian */}
            <div className="card mb-4">
                <div className="card-body">
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
                        <div className="col-md-4 d-flex align-items-end">
                            <button className="btn btn-success" onClick={fetchRevenueData}>
                                <i className="fas fa-search me-2"></i>
                                Lọc dữ liệu
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Thống kê tổng quan */}
            <div className="row mb-4">
                <div className="col-md-3">
                    <div className="card text-white bg-primary">
                        <div className="card-body">
                            <div className="d-flex justify-content-between">
                                <div>
                                    <h6 className="card-title">Doanh thu Admin</h6>
                                    <h4>{formatCurrency(revenueData?.totalAdminRevenue || 0)}</h4>
                                </div>
                                <div className="align-self-center">
                                    <i className="fas fa-coins fa-2x"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="card text-white bg-success">
                        <div className="card-body">
                            <div className="d-flex justify-content-between">
                                <div>
                                    <h6 className="card-title">Doanh thu Công ty</h6>
                                    <h4>{formatCurrency(revenueData?.totalCompanyRevenue || 0)}</h4>
                                </div>
                                <div className="align-self-center">
                                    <i className="fas fa-building fa-2x"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="card text-white bg-warning">
                        <div className="card-body">
                            <div className="d-flex justify-content-between">
                                <div>
                                    <h6 className="card-title">Hoàn tiền KH</h6>
                                    <h4>{formatCurrency(revenueData?.totalCustomerRefunds || 0)}</h4>
                                </div>
                                <div className="align-self-center">
                                    <i className="fas fa-undo fa-2x"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="card text-white bg-info">
                        <div className="card-body">
                            <div className="d-flex justify-content-between">
                                <div>
                                    <h6 className="card-title">Tổng Doanh thu</h6>
                                    <h4>{formatCurrency(revenueData?.totalSystemRevenue || 0)}</h4>
                                </div>
                                <div className="align-self-center">
                                    <i className="fas fa-chart-line fa-2x"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Thống kê booking */}
            <div className="row mb-4">
                <div className="col-md-3">
                    <div className="card">
                        <div className="card-body text-center">
                            <h5 className="card-title">Tổng Booking</h5>
                            <h3 className="text-primary">{revenueData?.totalBookings || 0}</h3>
                        </div>
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="card">
                        <div className="card-body text-center">
                            <h5 className="card-title">Đã hoàn thành</h5>
                            <h3 className="text-success">{revenueData?.completedBookings || 0}</h3>
                        </div>
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="card">
                        <div className="card-body text-center">
                            <h5 className="card-title">Đã hủy</h5>
                            <h3 className="text-danger">{revenueData?.cancelledBookings || 0}</h3>
                        </div>
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="card">
                        <div className="card-body text-center">
                            <h5 className="card-title">Đang chờ</h5>
                            <h3 className="text-warning">{revenueData?.pendingBookings || 0}</h3>
                        </div>
                    </div>
                </div>
            </div>

            {/* Dữ liệu theo tháng */}
            <div className="row mb-4">
                <div className="col-12">
                    <div className="card">
                        <div className="card-header">
                            <h5>Doanh thu theo tháng</h5>
                        </div>
                        <div className="card-body">
                            <div className="table-responsive">
                                <table className="table table-striped">
                                    <thead>
                                        <tr>
                                            <th>Tháng/Năm</th>
                                            <th>Doanh thu Admin</th>
                                            <th>Doanh thu Công ty</th>
                                            <th>Hoàn tiền KH</th>
                                            <th>Số Booking</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {revenueData?.monthlyData?.length > 0 ? (
                                            revenueData.monthlyData.map((item, index) => (
                                                <tr key={index}>
                                                    <td>{item.month}/{item.year}</td>
                                                    <td className="text-primary fw-bold">
                                                        {formatCurrency(item.adminRevenue)}
                                                    </td>
                                                    <td className="text-success fw-bold">
                                                        {formatCurrency(item.companyRevenue)}
                                                    </td>
                                                    <td className="text-warning fw-bold">
                                                        {formatCurrency(item.customerRefunds)}
                                                    </td>
                                                    <td>{item.bookingCount}</td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan="5" className="text-center">Chưa có dữ liệu</td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Top Companies và Recent Transactions */}
            <div className="row">
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-header">
                            <h5>Top 10 Công ty du lịch</h5>
                        </div>
                        <div className="card-body">
                            <div className="table-responsive">
                                <table className="table table-sm">
                                    <thead>
                                        <tr>
                                            <th>Công ty</th>
                                            <th>Phí Admin</th>
                                            <th>Booking</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {revenueData?.topCompanies?.length > 0 ? (
                                            revenueData.topCompanies.map((company, index) => (
                                                <tr key={company.tourismCompanyId}>
                                                    <td>
                                                        <span className="badge bg-primary me-2">{index + 1}</span>
                                                        {company.companyName}
                                                    </td>
                                                    <td className="text-success fw-bold">
                                                        {formatCurrency(company.adminFeeGenerated)}
                                                    </td>
                                                    <td>{company.totalBookings}</td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan="3" className="text-center">Chưa có dữ liệu</td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-header">
                            <h5>Giao dịch gần đây</h5>
                        </div>
                        <div className="card-body">
                            <div className="table-responsive">
                                <table className="table table-sm">
                                    <thead>
                                        <tr>
                                            <th>Tour</th>
                                            <th>Loại</th>
                                            <th>Số tiền</th>
                                            <th>Trạng thái</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {revenueData?.recentTransactions?.length > 0 ? (
                                            revenueData.recentTransactions.map((transaction) => (
                                                <tr key={transaction.transactionId}>
                                                    <td className="text-truncate" style={{ maxWidth: '150px' }}>
                                                        {transaction.tourName}
                                                    </td>
                                                    <td>
                                                        <span className={`badge ${transaction.transactionType === 'Revenue' ? 'bg-success' : 'bg-warning'}`}>
                                                            {transaction.transactionType === 'Revenue' ? 'Doanh thu' : 'Hoàn tiền'}
                                                        </span>
                                                    </td>
                                                    <td className="fw-bold">
                                                        {formatCurrency(transaction.amount)}
                                                    </td>
                                                    <td>
                                                        <span className={`badge ${transaction.status === 'Completed' ? 'bg-success' : 'bg-warning'}`}>
                                                            {transaction.status === 'Completed' ? 'Hoàn thành' : 'Chờ xử lý'}
                                                        </span>
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan="4" className="text-center">Chưa có dữ liệu</td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Statistic;