import React from "react";

const AccountDetail = ({ account, onClose }) => {
    if (!account) return <p>Không tìm thấy thông tin tài khoản.</p>;

    return (
        <div className="account-detail">
            <h2>Chi tiết Tài khoản</h2>
            <p><strong>ID:</strong> {account.id}</p>
            <p><strong>Tên:</strong> {account.name}</p>
            <p><strong>Tên người dùng:</strong> {account.username}</p>
            <p><strong>Email:</strong> {account.email}</p>
            <p><strong>Vai trò:</strong> {account.role}</p>
            <p><strong>Trạng thái:</strong> <span style={{ color: account.status === "Hoạt động" ? "green" : "red" }}>{account.status}</span></p>
            <button className="btn btn-secondary" onClick={onClose}>Đóng</button>
        </div>
    );
};

export default AccountDetail;
