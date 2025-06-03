import React, { useEffect, useState } from "react";
import axios from "axios";
import RefundService from '../../services/RefundService';

const RefundRequestList = () => {
  const [refunds, setRefunds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showQRModal, setShowQRModal] = useState(false);
  const [qrData, setQrData] = useState(null);
  const [qrLoading, setQrLoading] = useState(false);
  const [selectedRefund, setSelectedRefund] = useState(null);

  useEffect(() => {
    const fetchRefunds = async () => {
      try {
        const res = await axios.get("https://localhost:7082/api/Refund/pending");
        if (res.data && res.data.success) {
          setRefunds(res.data.data);
        }
      } catch (err) {
        alert("Không thể tải danh sách yêu cầu hoàn!");
      }
      setLoading(false);
    };
    fetchRefunds();
  }, []);

  return (
    <div className="">
      <h2 className="mb-4">Danh sách yêu cầu hoàn tiền</h2>
      <div className="table-responsive">
        <table className="table table-striped table-hover align-middle">
          <thead className="table-dark">
            <tr>
              <th>Ngày yêu cầu</th>
              <th>Lí do</th>
              <th>Tour</th>
              <th>Số tiền cần hoàn</th>
              <th>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={5} className="text-center">Đang tải...</td>
              </tr>
            ) : refunds.length === 0 ? (
              <tr>
                <td colSpan={5} className="text-center">Không có yêu cầu hoàn nào.</td>
              </tr>
            ) : (
              refunds.map((item) => (
                <tr key={item.refundRequestId}>
                  <td>{new Date(item.requestDate).toLocaleString("vi-VN")}</td>
                  <td>{item.reason}</td>
                  <td>{item.booking?.tour?.tourName || "N/A"}</td>
                  <td>{item.refundAmount?.toLocaleString("vi-VN")} VND</td>
                  <td>
                    <button
                      className="btn btn-primary btn-sm"
                      onClick={async () => {
                        setQrLoading(true);
                        setShowQRModal(true);
                        setSelectedRefund(item);
                        try {
                          const res = await axios.post("https://api.vietqr.io/v2/generate", {
                            accountNo: item.customerBankAccount,
                            accountName: item.customerAccountHolderName,
                            acqId: item.customerBankName,
                            amount: item.refundAmount,
                            addInfo: "Hoan tra tien tour khach hang",
                            format: "text",
                            template: "compact"
                          });
                          if (res.data && res.data.code === "00") {
                            setQrData(res.data.data);
                          } else {
                            setQrData({ error: "Không thể tạo mã QR!" });
                          }
                        } catch (err) {
                          setQrData({ error: "Lỗi khi gọi API QR!" });
                        }
                        setQrLoading(false);
                      }}
                    >
                      Hoàn tiền
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      {showQRModal && (
        <div className="modal show d-block" tabIndex="-1" style={{background: "rgba(0,0,0,0.5)"}}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Quét mã QR để hoàn tiền</h5>
                <button type="button" className="btn-close" onClick={() => { setShowQRModal(false); setQrData(null); }}></button>
              </div>
              <div className="modal-body text-center">
                {qrLoading ? (
                  <div>Đang tạo mã QR...</div>
                ) : qrData?.error ? (
                  <div className="alert alert-danger">{qrData.error}</div>
                ) : qrData ? (
                  <>
                    <img src={qrData.qrDataURL} alt="QR code" style={{ maxWidth: 256, margin: "0 auto" }} />
                    <div className="mt-3">
                      <strong>{selectedRefund?.customerBankAccount}</strong><br />
                      Số tài khoản: <strong>{selectedRefund?.customerAccountHolderName}</strong><br />
                      Số tiền: <strong>{selectedRefund?.refundAmount?.toLocaleString("vi-VN")} VND</strong>
                    </div>
                  </>
                ) : null}
              </div>
              <div className="modal-footer">
                <button
                  className="btn btn-success"
                  disabled={qrLoading}
                  onClick={async () => {
                    if (!selectedRefund) return;
                    try {
                      const res = await RefundService.processRefund(selectedRefund.refundRequestId);
                      if (res && res.success) {
                        alert("Hoàn tiền thành công!");
                        setShowQRModal(false);
                        setQrData(null);
                        setQrLoading(false);
                        setLoading(true);
                        const refreshed = await axios.get("https://localhost:7082/api/Refund/pending");
                        if (refreshed.data && refreshed.data.success) {
                          setRefunds(refreshed.data.data);
                        }
                        setLoading(false);
                      } else {
                        alert(res?.message || "Có lỗi khi xác nhận hoàn tiền!");
                      }
                    } catch (err) {
                      alert("Lỗi khi xác nhận hoàn tiền!");
                    }
                  }}
                >
                  Đã hoàn tiền
                </button>
                <button className="btn btn-secondary" onClick={() => { setShowQRModal(false); setQrData(null); }}>Đóng</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RefundRequestList;
