import React, { useEffect, useState } from "react";
import { BookingServices } from "../../services/BookingServices";
import {getUserIdFromToken} from "../../utils/JwtHelper";
import PaymentService from "../../services/PaymentService";


const BookingManagement = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const bookingService = new BookingServices();
  const refundNow = async (booking) => {
    try {
      setLoading(true);
      setError(null);
      const refundRequestId = booking.refund?.refundRequestId;
      if (!refundRequestId) throw new Error("Không tìm thấy mã hoàn tiền!");
      const response = await PaymentService.createRefundQR(refundRequestId);
      const paymentUrl = response.data?.url;
      if (paymentUrl) {
        window.location.href = paymentUrl; // Redirect to payment/refund gateway
      } else {
        throw new Error('Không lấy được link hoàn tiền!');
      }
    } catch (err) {
      setError(err.message || 'Có lỗi khi xử lý hoàn tiền');
      console.error('Refund error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Get userId from token
        const userId = getUserIdFromToken();
        if (!userId) throw new Error("Không tìm thấy userId trong token");
        // Get company by userId
        const bookingsRes = await bookingService.getCompanyBookings(userId);
        setBookings(bookingsRes.data.data);
      } catch (err) {
        alert("Lỗi khi lấy danh sách đặt tour hoặc công ty!");
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  return (
    <div className="">
      <div className="card shadow-sm rounded">
        <div className="card-body">
          <h2 className="mb-4" style={{ fontWeight: 700, fontSize: 28, letterSpacing: 1 }}>Quản lý đặt tour</h2>
          {loading ? (
            <div>Đang tải...</div>
          ) : (
            <div className="table-responsive">
              <table className="table table-bordered table-hover align-middle">
                <thead className="table-light">
                  <tr>
                    <th className="text-center">Mã đặt</th>
                    <th className="text-center">Tên tour</th>
                    <th className="text-center">Khách hàng</th>
                    <th className="text-center">Ngày đặt</th>
                    <th className="text-center">Ngày đi</th>
                    <th className="text-center">Người lớn</th>
                    <th className="text-center">Trẻ em</th>
                    <th className="text-center">Tổng tiền</th>
                    <th className="text-center">Trạng thái</th>
                    <th className="text-center">Thanh toán</th>
                    <th className="text-center">Yêu cầu hoàn/huỷ</th>
                  </tr>
                </thead>
                <tbody>
                  {bookings.map((b, idx) => (
                    <tr key={b.bookingId} className={idx % 2 === 0 ? "table-white" : "table-light"}>
                      <td className="text-center">{b.bookingId}</td>
                      <td>{b.tour ? b.tour.tourName : ""}</td>
                      <td>
                        <strong>{b.customer ? b.customer.fullName : ""}</strong>
                        <br />
                        <small>{b.customer ? b.customer.email : ""}</small>
                        <br />
                        <small>{b.customer ? b.customer.phone : ""}</small>
                      </td>
                      <td className="text-center">{b.bookingDate ? new Date(b.bookingDate).toLocaleDateString() : ""}</td>
                      <td className="text-center">{b.tourDate ? new Date(b.tourDate).toLocaleDateString() : ""}</td>
                      <td className="text-center">{b.adultCount}</td>
                      <td className="text-center">{b.childCount}</td>
                      <td className="text-end">{b.totalAmount?.toLocaleString()} VND</td>
                      <td className="text-center">{b.status}</td>
                      <td className="text-center">{b.paymentStatus}</td>
                      <td className="text-center">
                        {b.refund
                          ? <span className="bg-info text-dark">{b.refund.status} <br />({b.refund.refundAmount.toLocaleString()} VND)</span>
                          : <span className="text-muted">Không</span>}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookingManagement;
