import React, { useEffect, useState } from 'react';
import {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  getRoles
} from '../../services/UserService';
import "./style/dashboard_admin.css"; // Đảm bảo đường dẫn tới CSS nếu cần

function UserAccountList() {
  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({
    username: '',
    password: '',
    email: '',
    fullName: '',
    phone: '',
    address: '',
    roleIds: []
  });
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchUsers();
    fetchRoles();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await getUsers();
      setUsers(res.data.data || []);
    } catch (error) {
      console.error("Error fetching users:", error);
      alert("Không thể tải danh sách người dùng. Vui lòng thử lại sau.");
    }
  };

  const fetchRoles = async () => {
    try {
      const res = await getRoles();
      setRoles(res.data.data || []);
    } catch (error) {
      console.error("Error fetching roles:", error);
      alert("Không thể tải danh sách vai trò. Vui lòng thử lại sau.");
    }
  };

  const handleEdit = async (id) => {
    try {
      const res = await getUserById(id);
      const user = res.data.data;
      setForm({
        username: user.username,
        password: '',
        email: user.email,
        fullName: user.fullName,
        phone: user.phone,
        address: user.address,
        roleIds: user.roles.map(r => r.roleId)
      });
      setEditingId(id);
      setShowModal(true);
    } catch (error) {
      console.error("Error fetching user details:", error);
      alert("Không thể tải thông tin người dùng. Vui lòng thử lại sau.");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Bạn chắc chắn muốn xóa người dùng này?')) {
      try {
        await deleteUser(id);
        fetchUsers();
        alert("Xóa người dùng thành công!");
      } catch (error) {
        console.error("Error deleting user:", error);
        alert("Không thể xóa người dùng. Vui lòng thử lại sau.");
      }
    }
  };

  const handleChange = (e) => {
    // Ngăn sự kiện lan truyền để tránh mất focus
    e.stopPropagation();
    // Cập nhật giá trị form
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRoleChange = (e) => {
    // Ngăn sự kiện lan truyền
    e.stopPropagation();

    const value = parseInt(e.target.value);
    if (e.target.checked) {
      setForm({ ...form, roleIds: [...form.roleIds, value] });
    } else {
      setForm({ ...form, roleIds: form.roleIds.filter(id => id !== value) });
    }
  };

  const handleSubmit = async (e) => {
    // Ngăn sự kiện mặc định và lan truyền
    e.preventDefault();
    e.stopPropagation();

    try {
      if (editingId) {
        await updateUser(editingId, form);
        alert("Cập nhật người dùng thành công!");
      } else {
        await createUser(form);
        alert("Thêm người dùng mới thành công!");
      }
      setShowModal(false);
      setEditingId(null);
      setForm({ username: '', password: '', email: '', fullName: '', phone: '', address: '', roleIds: [] });
      fetchUsers();
    } catch (error) {
      console.error("Error saving user:", error);
      alert("Không thể lưu thông tin người dùng. Vui lòng thử lại sau.");
    }
  };

  const openAddModal = () => {
    setEditingId(null);
    setForm({ username: '', password: '', email: '', fullName: '', phone: '', address: '', roleIds: [] });
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingId(null);
    setForm({ username: '', password: '', email: '', fullName: '', phone: '', address: '', roleIds: [] });
  };

  // Modal component
  const UserModal = () => {
    if (!showModal) return null;

    // Prevent modal from closing when clicking inside
    const handleModalClick = (e) => {
      // Ngăn sự kiện lan truyền lên các phần tử cha
      e.stopPropagation();
    };

    return (
      // Bỏ onClick={closeModal} ở đây để tránh đóng modal khi click vào overlay
      <div className="modal-overlay">
        <div className="modal-content" onClick={handleModalClick}>
          <div className="modal-header">
            <h3 className="modal-title">{editingId ? 'Cập nhật người dùng' : 'Thêm người dùng mới'}</h3>
            <button className="modal-close" onClick={closeModal}>&times;</button>
          </div>
          <div className="modal-body">
            <form id="userForm" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="username">Tên đăng nhập:</label>
                <input
                  id="username"
                  className="form-control"
                  name="username"
                  value={form.username}
                  onChange={handleChange}
                  placeholder="Nhập tên đăng nhập"
                  required
                />
              </div>

              {!editingId && (
                <div className="form-group">
                  <label htmlFor="password">Mật khẩu:</label>
                  <input
                    id="password"
                    className="form-control"
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                    placeholder="Nhập mật khẩu"
                    type="password"
                    required
                  />
                </div>
              )}

              <div className="form-group">
                <label htmlFor="email">Email:</label>
                <input
                  id="email"
                  className="form-control"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="Nhập email"
                  type="email"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="fullName">Họ và tên:</label>
                <input
                  id="fullName"
                  className="form-control"
                  name="fullName"
                  value={form.fullName}
                  onChange={handleChange}
                  placeholder="Nhập họ và tên"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="phone">Số điện thoại:</label>
                <input
                  id="phone"
                  className="form-control"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="Nhập số điện thoại"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="address">Địa chỉ:</label>
                <input
                  id="address"
                  className="form-control"
                  name="address"
                  value={form.address}
                  onChange={handleChange}
                  placeholder="Nhập địa chỉ"
                  required
                />
              </div>

              <div className="form-group">
                <label>Vai trò:</label>
                <div className="checkbox-group">
                  {roles.map(role => (
                    <label key={role.roleId} className="checkbox-label">
                      <input
                        type="checkbox"
                        value={role.roleId}
                        checked={form.roleIds.includes(role.roleId)}
                        onChange={handleRoleChange}
                      />
                      {role.roleName}
                    </label>
                  ))}
                </div>
              </div>
            </form>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={closeModal}>Hủy</button>
            <button type="submit" form="userForm" className="btn btn-primary">
              {editingId ? 'Cập nhật' : 'Thêm mới'}
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Quản lý tài khoản người dùng</h2>
        <button className="btn btn-primary" onClick={openAddModal}>Thêm người dùng mới</button>
      </div>

      <UserModal />

      <div className="table-responsive">
        <table className="table table-striped table-hover" style={{ marginTop: 20 }}>
          <thead className="table-light">
            <tr>
              <th>ID</th>
              <th>Tên đăng nhập</th>
              <th>Email</th>
              <th>Họ và tên</th>
              <th>Số điện thoại</th>
              <th>Địa chỉ</th>
              <th>Vai trò</th>
              <th>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? (
              users.map(u => (
                <tr key={u.userId}>
                  <td>{u.userId}</td>
                  <td>{u.username}</td>
                  <td>{u.email}</td>
                  <td>{u.fullName}</td>
                  <td>{u.phone}</td>
                  <td>{u.address}</td>
                  <td>{u.roles.map(r => r.roleName).join(', ')}</td>
                  <td>
                    <button className="btn btn-sm btn-primary me-2" onClick={() => handleEdit(u.userId)}>
                      <i className="bi bi-pencil"></i> Sửa
                    </button>
                    <button className="btn btn-sm btn-danger" onClick={() => handleDelete(u.userId)}>
                      <i className="bi bi-trash"></i> Xóa
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="text-center">Không có dữ liệu người dùng</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default UserAccountList;
