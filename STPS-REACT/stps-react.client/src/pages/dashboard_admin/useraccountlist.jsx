import React, { useState } from "react";
import "./style/dashboard_admin.css"; // Đảm bảo đường dẫn tới CSS nếu cần

const initialUsers = [
    { id: "001", name: "Lê Văn C", username: "levanc", email: "vanc@example.com", role: "Người dùng", status: "Hoạt động" },
    { id: "002", name: "Phạm Thị D", username: "phamthid", email: "thid@example.com", role: "Công ty du lịch", status: "Ngừng hoạt động" },
];

const UserAccountList = ({ onAddUser, onEditUser, onViewAccount }) => {
    const [userList, setUserList] = useState(initialUsers);
    const [searchTerm, setSearchTerm] = useState("");

    const filteredUsers = userList.filter((user) =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleStatusToggle = (id) => {
        setUserList(userList.map((user) =>
            user.id === id ? { ...user, status: user.status === "Hoạt động" ? "Ngừng hoạt động" : "Hoạt động" } : user
        ));
    };

    return (
        <div>
            <h2>Danh sách Tài khoản Người dùng</h2>
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
            </div>

            <table className="table table-striped table-bordered">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Tên</th>
                        <th>Tên người dùng</th>
                        <th>Vai trò</th>
                        <th>Trạng thái</th>
                        <th className="text-center" style={{ width: "150px" }}>Tùy chọn</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredUsers.map((user) => (
                        <tr key={user.id} onClick={() => onViewAccount(user.id)} style={{ cursor: "pointer" }}>
                            <td>{user.id}</td>
                            <td>{user.name}</td>
                            <td>{user.username}</td>
                            <td>{user.role}</td>
                            <td style={{ color: user.status === "Hoạt động" ? "green" : "red" }}>
                                {user.status}
                            </td>
                            <td>
                                <button 
                                    className={user.status === "Hoạt động" ? "btn btn-danger" : "btn btn-success"} 
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleStatusToggle(user.id);
                                    }}
                                >
                                    {user.status === "Hoạt động" ? "Khóa" : "Mở"}
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default UserAccountList;
