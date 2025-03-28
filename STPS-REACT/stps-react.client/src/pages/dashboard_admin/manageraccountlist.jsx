import React, { useState } from "react";
import "./style/dashboard_admin.css"; // Đảm bảo đường dẫn tới CSS nếu cần

const initialAccounts = [
    { id: "001", name: "Nguyễn Văn A", username: "nguyenvana", email: "vana@example.com", role: "Quản trị viên", status: "Hoạt động" },
    { id: "002", name: "Trần Thị B", username: "tranthib", email: "thib@example.com", role: "Người dùng", status: "Ngừng hoạt động" },
];

const ManagerAccountList = ({ onAddAccount, onEditAccount, onViewAccount }) => {
    const [accountList, setAccountList] = useState(initialAccounts);
    const [searchTerm, setSearchTerm] = useState("");

    const filteredAccounts = accountList.filter((account) =>
        account.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleStatusToggle = (id) => {
        setAccountList(accountList.map((account) =>
            account.id === id ? { ...account, status: account.status === "Hoạt động" ? "Ngừng hoạt động" : "Hoạt động" } : account
        ));
    };

    return (
        <div>
            <h2>Danh sách Tài khoản Quản lý</h2>
            <div className="d-flex justify-content-between mb-3 align-items-center">
                <div className="input-group">
                    <input
                        type="text"
                        className="form-control rounded-start"
                        placeholder="Tìm kiếm theo tên"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <button className="btn btn-primary" onClick={onAddAccount}>
                    Thêm mới Tài khoản
                </button>
            </div>

            <table className="table table-striped table-bordered">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Tên</th>
                        <th>Tên người dùng</th>
                        <th>Email</th>
                        <th>Trạng thái</th>
                        <th className="text-center" style={{ width: "150px" }}>Tùy chọn</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredAccounts.map((account) => (
                        <tr key={account.id} 
                            onClick={() => onViewAccount(account.id)}
                            style={{ cursor: "pointer" }}
                        >
                            <td>{account.id}</td>
                            <td>{account.name}</td>
                            <td>{account.username}</td>
                            <td>{account.email}</td>
                            <td style={{ color: account.status === "Hoạt động" ? "green" : "red" }}>
                                {account.status}
                            </td>
                            <td>
                                <button className="btn btn-warning me-2" onClick={(e) => { 
                                    e.stopPropagation(); // Ngăn sự kiện click vào dòng
                                    onEditAccount(account);
                                }}>
                                    Sửa
                                </button>
                                <button 
                                    className={account.status === "Hoạt động" ? "btn btn-danger" : "btn btn-success"} 
                                    onClick={(e) => { 
                                        e.stopPropagation(); // Ngăn sự kiện click vào dòng
                                        handleStatusToggle(account.id);
                                    }}
                                >
                                    {account.status === "Hoạt động" ? "Khóa" : "Mở"}
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ManagerAccountList;
