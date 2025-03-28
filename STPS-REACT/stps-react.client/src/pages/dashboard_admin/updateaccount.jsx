import React, { useEffect, useState } from "react";

const UpdateAccount = ({ account, onUpdate, onCancel }) => {
    const [accountInfo, setAccountInfo] = useState({
        id: '',
        name: '',
        username: '',
        email: '',
        role: '',
        status: '',
    });

    useEffect(() => {
        if (account) {
            setAccountInfo({
                id: account.id,
                name: account.name,
                username: account.username,
                email: account.email,
                role: account.role,
                status: account.status,
            });
        }
    }, [account]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setAccountInfo({ ...accountInfo, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onUpdate(accountInfo); // Gọi hàm onUpdate để cập nhật tài khoản
        onCancel(); // Quay lại danh sách
    };

    return (
        <div>
            <h2>Cập nhật Tài khoản: {accountInfo.name}</h2>
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
                <button type="submit" className="btn btn-success me-2">Cập nhật</button>
                <button type="button" className="btn btn-secondary" onClick={onCancel}>Hủy</button>
            </form>
        </div>
    );
};

export default UpdateAccount;