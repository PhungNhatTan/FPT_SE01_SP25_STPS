import React, { useEffect, useState } from 'react';
import {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  getRoles
} from '../../services/UserService';
import { UTIL_VARIABLE } from '../../utils/UtilVariable';
import { FaUserPlus, FaEdit, FaTrash, FaSearch } from 'react-icons/fa';
import { IoMdClose } from 'react-icons/io';
import './style/modern-dashboard.css';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState('add'); // 'add' or 'edit'
  const [selectedUser, setSelectedUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    email: '',
    fullName: '',
    phone: '',
    address: '',
    roleIds: []
  });
  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    fetchUsers();
    fetchRoles();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      console.log('Fetching users from:', UTIL_VARIABLE.REACT_BASE_URL+'/Users');
      const response = await getUsers();
      console.log('Users API response:', response);
      if (response.data && response.data.data) {
        setUsers(response.data.data);
        console.log('Users loaded:', response.data.data);
      } else {
        console.warn('No users data found in response');
      }
    } catch (error) {
      console.error('Lỗi khi tải danh sách người dùng:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchRoles = async () => {
    try {
      console.log('Fetching roles from:', UTIL_VARIABLE.REACT_BASE_URL+'/Roles');
      const response = await getRoles();
      console.log('Roles API response:', response);
      if (response.data && response.data.data) {
        setRoles(response.data.data);
        console.log('Roles loaded:', response.data.data);
      } else {
        console.warn('No roles data found in response');
      }
    } catch (error) {
      console.error('Lỗi khi tải danh sách vai trò:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });

    // Clear error when user types
    if (formErrors[name]) {
      setFormErrors({
        ...formErrors,
        [name]: ''
      });
    }
  };

  const handleRoleChange = (e) => {
    const { value, checked } = e.target;
    // Đảm bảo roleId là số nguyên
    const roleId = parseInt(value, 10);

    console.log('Role change:', { roleId, checked, type: typeof roleId });

    if (isNaN(roleId)) {
      console.error('Invalid role ID:', value);
      return;
    }

    if (checked) {
      // Thêm roleId vào mảng nếu chưa có
      if (!formData.roleIds.includes(roleId)) {
        setFormData({
          ...formData,
          roleIds: [...formData.roleIds, roleId]
        });
        console.log('Added role:', roleId, 'New roleIds:', [...formData.roleIds, roleId]);
      }
    } else {
      // Loại bỏ roleId khỏi mảng
      setFormData({
        ...formData,
        roleIds: formData.roleIds.filter(id => id !== roleId)
      });
      console.log('Removed role:', roleId, 'New roleIds:', formData.roleIds.filter(id => id !== roleId));
    }
  };

  const validateForm = () => {
    const errors = {};

    // Chỉ kiểm tra username và password khi đang ở chế độ thêm mới
    if (modalMode === 'add') {
      if (!formData.username.trim()) errors.username = 'Tên đăng nhập không được để trống';
      if (!formData.password.trim()) errors.password = 'Mật khẩu không được để trống';
    }

    if (!formData.email.trim()) errors.email = 'Email không được để trống';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) errors.email = 'Email không hợp lệ';
    if (!formData.fullName.trim()) errors.fullName = 'Họ tên không được để trống';
    if (!formData.phone.trim()) errors.phone = 'Số điện thoại không được để trống';
    if (!formData.address.trim()) errors.address = 'Địa chỉ không được để trống';
    if (formData.roleIds.length === 0) errors.roleIds = 'Vui lòng chọn ít nhất một vai trò';

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      setLoading(true);

      if (modalMode === 'add') {
        console.log('Creating new user with data:', formData);
        const response = await createUser(formData);
        console.log('Create user response:', response);
        alert('Thêm người dùng mới thành công!');
      } else {
        // Đảm bảo chỉ gửi các trường cần thiết cho API cập nhật
        // Cấu trúc dữ liệu phải khớp với yêu cầu của API
        // Dựa vào response từ API, chúng ta cần điều chỉnh cấu trúc dữ liệu
        // Đảm bảo roleIds là mảng các số nguyên
        const roleIds = formData.roleIds.map(id => {
          // Nếu id đã là số, giữ nguyên, nếu không thì chuyển đổi
          return typeof id === 'number' ? id : parseInt(id, 10);
        }).filter(id => !isNaN(id)); // Loại bỏ các giá trị không phải số

        console.log('Processed roleIds:', roleIds);

        const updateData = {
          // Không cần gửi userId trong body vì đã có trong URL
          username: selectedUser.username, // Giữ nguyên username, không cho phép thay đổi
          email: formData.email,
          fullName: formData.fullName,
          phone: formData.phone,
          address: formData.address,
          password: formData.password, // Thêm trường password vào dữ liệu cập nhật
          roleIds: roleIds // Sử dụng mảng roleIds đã được xử lý
        };

        console.log('Updating user with ID:', selectedUser.userId);
        console.log('Update data:', updateData);

        try {
          // Kiểm tra lại ID người dùng trước khi gửi request
          console.log('Selected user object:', selectedUser);

          if (!selectedUser || !selectedUser.userId) {
            throw new Error('Không tìm thấy ID người dùng!');
          }

          // Gọi API với ID chính xác
          const response = await updateUser(selectedUser.userId, updateData);
          console.log('Update user response:', response);

          if (response.data && response.data.success) {
            alert('Cập nhật người dùng thành công!');
          } else {
            alert('Cập nhật người dùng thất bại: ' + (response.data?.message || 'Lỗi không xác định'));
          }
        } catch (error) {
          console.error('Error updating user:', error);
          console.error('Error details:', error.response?.data);
          alert('Lỗi khi cập nhật người dùng: ' + (error.response?.data?.message || error.message));
          throw error; // Re-throw để xử lý ở catch bên ngoài
        }
      }

      closeModal();
      fetchUsers();
    } catch (error) {
      console.error('Lỗi khi lưu thông tin người dùng:', error);
      alert('Có lỗi xảy ra khi lưu thông tin người dùng. Vui lòng thử lại sau.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (userId) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa người dùng này?')) {
      try {
        setLoading(true);
        await deleteUser(userId);
        fetchUsers();
      } catch (error) {
        console.error('Lỗi khi xóa người dùng:', error);
      } finally {
        setLoading(false);
      }
    }
  };

  const openAddModal = () => {
    setFormData({
      username: '',
      password: '',
      email: '',
      fullName: '',
      phone: '',
      address: '',
      roleIds: []
    });
    setFormErrors({});
    setModalMode('add');
    setShowModal(true);
  };

  const openEditModal = async (userId) => {
    try {
      setLoading(true);
      console.log('Opening edit modal for user ID:', userId);

      // Đảm bảo userId là số
      const numericUserId = Number(userId);
      if (isNaN(numericUserId)) {
        throw new Error(`Invalid user ID: ${userId}`);
      }

      const response = await getUserById(numericUserId);
      console.log('User data response:', response);

      if (response.data && response.data.data) {
        const user = response.data.data;

        // Đảm bảo user có userId
        if (!user.userId) {
          console.error('User data missing userId:', user);
          throw new Error('User data missing userId');
        }

        // Lưu toàn bộ thông tin người dùng
        setSelectedUser({
          ...user,
          userId: user.userId // Đảm bảo lưu đúng userId
        });

        // Xử lý roleIds để đảm bảo là mảng các số nguyên
        const roleIds = user.roles.map(role => {
          // Đảm bảo roleId là số nguyên
          const roleId = typeof role.roleId === 'number'
            ? role.roleId
            : parseInt(role.roleId, 10);

          return isNaN(roleId) ? null : roleId;
        }).filter(id => id !== null); // Loại bỏ các giá trị null

        console.log('Processed roleIds for form:', roleIds);

        setFormData({
          username: user.username || '',
          password: '',
          email: user.email || '',
          fullName: user.fullName || '',
          phone: user.phone || '',
          address: user.address || '',
          roleIds: roleIds
        });
        setFormErrors({});
        setModalMode('edit');
        setShowModal(true);

        // Log để kiểm tra dữ liệu
        console.log('User data loaded for editing:', user);
        console.log('User ID:', user.userId);
        console.log('Role IDs:', user.roles.map(role => role.roleId));
      } else {
        throw new Error('Không tìm thấy dữ liệu người dùng');
      }
    } catch (error) {
      console.error('Lỗi khi tải thông tin người dùng:', error);
      alert('Không thể tải thông tin người dùng. Vui lòng thử lại sau.');
    } finally {
      setLoading(false);
    }
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const filteredUsers = users.filter(user =>
    user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.fullName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="card">
      <div className="card-header">
        <h2 className="card-title">Quản lý tài khoản người dùng</h2>
        <div className="header-actions">
          <div className="search-bar">
            <FaSearch className="search-icon" />
            <input
              type="text"
              className="search-input"
              placeholder="Tìm kiếm người dùng..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button className="btn btn-primary" onClick={openAddModal}>
            <FaUserPlus /> Thêm người dùng
          </button>
        </div>
      </div>

      {loading && <div className="loading-spinner">Đang tải...</div>}

      <div className="table-container">
        <table className="modern-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Tên đăng nhập</th>
              <th>Email</th>
              <th>Họ tên</th>
              <th>Số điện thoại</th>
              <th>Địa chỉ</th>
              <th>Vai trò</th>
              <th>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.length > 0 ? (
              filteredUsers.map(user => (
                <tr key={user.userId}>
                  <td>{user.userId}</td>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                  <td>{user.fullName}</td>
                  <td>{user.phone}</td>
                  <td>{user.address}</td>
                  <td>
                    <div className="role-tags">
                      {user.roles.map(role => (
                        <span key={role.roleId} className="status-badge status-active">
                          {role.roleName}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td>
                    <div className="table-actions">
                      <button
                        className="btn btn-icon btn-primary"
                        onClick={() => openEditModal(user.userId)}
                        title="Chỉnh sửa"
                      >
                        <FaEdit />
                      </button>
                      <button
                        className="btn btn-icon btn-danger"
                        onClick={() => handleDelete(user.userId)}
                        title="Xóa"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" style={{textAlign: 'center', padding: '2rem'}}>
                  {loading ? 'Đang tải dữ liệu...' : 'Không có dữ liệu người dùng'}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="modal-backdrop" onClick={closeModal}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="modal-title">{modalMode === 'add' ? 'Thêm người dùng mới' : 'Chỉnh sửa người dùng'}</h3>
              <button className="modal-close" onClick={closeModal}>
                <IoMdClose />
              </button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label className="form-label" htmlFor="username">Tên đăng nhập</label>
                  <input
                    type="text"
                    id="username"
                    name="username"
                    value={formData.username}
                    onChange={handleInputChange}
                    className={`form-control ${formErrors.username ? 'error' : ''}`}
                    disabled={modalMode === 'edit'} // Disable input khi đang ở chế độ chỉnh sửa
                  />
                  {modalMode === 'edit' && <small className="form-text text-muted">Tên đăng nhập không thể thay đổi</small>}
                  {formErrors.username && <div className="form-error">{formErrors.username}</div>}
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="password">
                    {modalMode === 'add' ? 'Mật khẩu' : 'Mật khẩu mới (để trống nếu không thay đổi)'}
                  </label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className={`form-control ${formErrors.password ? 'error' : ''}`}
                    required={modalMode === 'add'} // Chỉ bắt buộc khi thêm mới
                  />
                  {formErrors.password && <div className="form-error">{formErrors.password}</div>}
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="email">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`form-control ${formErrors.email ? 'error' : ''}`}
                  />
                  {formErrors.email && <div className="form-error">{formErrors.email}</div>}
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="fullName">Họ tên</label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    className={`form-control ${formErrors.fullName ? 'error' : ''}`}
                  />
                  {formErrors.fullName && <div className="form-error">{formErrors.fullName}</div>}
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="phone">Số điện thoại</label>
                  <input
                    type="text"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className={`form-control ${formErrors.phone ? 'error' : ''}`}
                  />
                  {formErrors.phone && <div className="form-error">{formErrors.phone}</div>}
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="address">Địa chỉ</label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    className={`form-control ${formErrors.address ? 'error' : ''}`}
                  />
                  {formErrors.address && <div className="form-error">{formErrors.address}</div>}
                </div>

                <div className="form-group">
                  <label className="form-label">Vai trò</label>
                  <div className="role-checkboxes" style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
                    {roles.map(role => (
                      <div key={role.roleId} className="role-checkbox" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <input
                          type="checkbox"
                          id={`role-${role.roleId}`}
                          name="roleIds"
                          value={role.roleId}
                          checked={formData.roleIds.includes(role.roleId)}
                          onChange={handleRoleChange}
                          style={{ width: 'auto' }}
                        />
                        <label htmlFor={`role-${role.roleId}`} style={{ margin: 0 }}>{role.roleName}</label>
                      </div>
                    ))}
                  </div>
                  {formErrors.roleIds && <div className="form-error">{formErrors.roleIds}</div>}
                </div>

                <div className="form-actions">
                  <button type="button" className="btn btn-outline" onClick={closeModal}>Hủy</button>
                  <button type="submit" className="btn btn-primary">
                    {modalMode === 'add' ? 'Thêm mới' : 'Cập nhật'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserManagement;
