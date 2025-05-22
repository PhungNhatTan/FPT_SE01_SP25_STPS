import React, { useState, useEffect } from "react";
import { VoucherService } from "../../services/VoucherService";

const UpdatePromotion = ({ promotionId, onCancel }) => {
    const [form, setForm] = useState({
        voucherName: "",
        startDate: "",
        endDate: "",
        voucherDetail: "",
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const voucherService = new VoucherService();

    useEffect(() => {
        if (promotionId) {
            fetchPromotion();
        }
    }, [promotionId]);

    const fetchPromotion = async () => {
        setLoading(true);
        setError("");
        try {
            const res = await voucherService.getVoucherById(promotionId);
            const p = res.data.data;
            setForm({
                voucherName: p.voucherName || "",
                startDate: p.startDate ? p.startDate.slice(0, 10) : "",
                endDate: p.endDate ? p.endDate.slice(0, 10) : "",
                voucherDetail: p.voucherDetail || "",
            });
        } catch (err) {
            setError("Không thể tải thông tin khuyến mãi!");
        }
        setLoading(false);
    };

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        try {
            await voucherService.updateVoucher(promotionId, {
                id: promotionId,
                voucherName: form.voucherName,
                startDate: form.startDate,
                endDate: form.endDate,
                voucherDetail: form.voucherDetail,
            });
            alert("Cập nhật khuyến mãi thành công!");
            onCancel();
        } catch (err) {
            setError("Cập nhật khuyến mãi thất bại!");
        }
        setLoading(false);
    };

    return (
        <div>
            <h2>Cập nhật Khuyến mãi</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">Tên Khuyến mãi</label>
                    <input type="text" className="form-control" name="voucherName" value={form.voucherName} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label className="form-label">Ngày bắt đầu</label>
                    <input type="date" className="form-control" name="startDate" value={form.startDate} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label className="form-label">Ngày kết thúc</label>
                    <input type="date" className="form-control" name="endDate" value={form.endDate} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label className="form-label">Chi tiết</label>
                    <textarea className="form-control" name="voucherDetail" value={form.voucherDetail} onChange={handleChange} required />
                </div>
                {error && <p className="text-danger">{error}</p>}
                <button type="submit" className="btn btn-success me-2" disabled={loading}>{loading ? "Đang lưu..." : "Lưu"}</button>
                <button type="button" className="btn btn-secondary" onClick={onCancel}>Hủy</button>
            </form>
        </div>
    );
};

export default UpdatePromotion;