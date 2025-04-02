import React, { useState } from "react";

const AddAccount = ({ onCancel, onAdd }) => {
    const [accountInfo, setAccountInfo] = useState({
        name: "",
        username: "",
        password: "",
        email: "",
        role: "Người dùng",
        status: "Hoạt động",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setAccountInfo({ ...accountInfo, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onAdd(accountInfo); // Gọi hàm onAdd để thêm tài khoản
        onCancel(); // Quay lại danh sách
    };

    return (
        <div>
            <h2>Thêm mới Tài khoản</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">Tên</label>
                    <input
                        type="text"
                        className="form-control"
                        name="name"
                        value={accountInfo.name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Tên người dùng</label>
                    <input
                        type="text"
                        className="form-control"
                        name="username"
                        value={accountInfo.username}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Mật khẩu</label>
                    <input
                        type="text"
                        className="form-control"
                        name="password"
                        value={accountInfo.password}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input
                        type="email"
                        className="form-control"
                        name="email"
                        value={accountInfo.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Vai trò</label>
                    <select
                        className="form-select"
                        name="role"
                        value={accountInfo.role}
                        onChange={handleChange}
                    >
                        <option value="Admin">Quản trị viên</option>
                        <option value="Manager">Quản lý</option>
                    </select>
                </div>
                <button type="submit" className="btn btn-success me-2">Lưu</button>
                <button type="button" className="btn btn-secondary" onClick={onCancel}>Hủy</button>
            </form>
        </div>
    );
};

export default AddAccount;