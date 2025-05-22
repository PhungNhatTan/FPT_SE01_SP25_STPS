import React, { useState } from "react";
import { VoucherService } from "../../services/VoucherService";

const AddPromotion = ({ onCancel }) => {
    const [form, setForm] = useState({
        voucherName: "",
        startDate: "",
        endDate: "",
        voucherDetail: "",
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const voucherService = new VoucherService();

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        try {
            await voucherService.addVoucher({
                voucherName: form.voucherName,
                startDate: form.startDate,
                endDate: form.endDate,
                voucherDetail: form.voucherDetail,
            });
            alert("Thêm khuyến mãi thành công!");
            onCancel();
        } catch (err) {
            setError("Thêm khuyến mãi thất bại!");
        }
        setLoading(false);
    };

    return (
        <div>
            <h2>Thêm mới Khuyến mãi</h2>
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

export default AddPromotion;
