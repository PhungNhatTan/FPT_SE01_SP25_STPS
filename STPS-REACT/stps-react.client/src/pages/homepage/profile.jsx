import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from "./header";
import axios from "axios";
import { UTIL_VARIABLE } from "../../utils/UtilVariable";
import "../../style/profile.css";
import { FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaIdCard } from 'react-icons/fa';

const Profile = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [userData, setUserData] = useState({
        userId: "",
        username: "",
        email: "",
        fullName: "",
        phone: "",
        address: "",
        roles: []
    });
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errors, setErrors] = useState({});
    const [updating, setUpdating] = useState(false);

    // Lấy thông tin người dùng khi component được mount
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                setLoading(true);
                // Lấy userId từ localStorage
                const userId = localStorage.getItem('userId');

                if (!userId) {
                    toast.error("Bạn chưa đăng nhập!");
                    navigate('/login');
                    return;
                }

                // Gọi API để lấy thông tin người dùng
                const response = await axios.get(`${UTIL_VARIABLE.REACT_BASE_URL}/Users/${userId}`);

                if (response.data && response.data.success) {
                    const user = response.data.data;
                    setUserData({
                        userId: user.userId,
                        username: user.username,
                        email: user.email,
                        fullName: user.fullName || "",
                        phone: user.phone || "",
                        address: user.address || "",
                        roles: user.roles || []
                    });
                } else {
                    toast.error("Không thể tải thông tin người dùng!");
                }
            } catch (error) {
                console.error("Lỗi khi tải thông tin người dùng:", error);
                toast.error("Lỗi khi tải thông tin người dùng!");
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, [navigate]);

    // Xử lý thay đổi input
    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === "password") {
            setPassword(value);
        } else if (name === "confirmPassword") {
            setConfirmPassword(value);
        } else {
            setUserData(prevData => ({
                ...prevData,
                [name]: value
            }));
        }

        // Xóa lỗi khi người dùng bắt đầu nhập lại
        if (errors[name]) {
            setErrors({
                ...errors,
                [name]: null
            });
        }
    };

    // Kiểm tra dữ liệu đầu vào
    const validateForm = () => {
        const newErrors = {};

        // Kiểm tra email
        if (!userData.email) {
            newErrors.email = "Email không được để trống";
        } else if (!/\S+@\S+\.\S+/.test(userData.email)) {
            newErrors.email = "Email không hợp lệ";
        }

        // Kiểm tra họ tên
        if (!userData.fullName) {
            newErrors.fullName = "Họ và tên không được để trống";
        }

        // Kiểm tra số điện thoại
        if (userData.phone && !/^[0-9]{10,11}$/.test(userData.phone)) {
            newErrors.phone = "Số điện thoại không hợp lệ (cần 10-11 số)";
        }

        // Kiểm tra mật khẩu nếu người dùng nhập
        if (password) {
            if (password.length < 6) {
                newErrors.password = "Mật khẩu phải có ít nhất 6 ký tự";
            }

            if (password !== confirmPassword) {
                newErrors.confirmPassword = "Mật khẩu xác nhận không khớp";
            }
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // Xử lý submit form
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Kiểm tra dữ liệu đầu vào
        if (!validateForm()) {
            toast.error("Vui lòng kiểm tra lại thông tin!");
            return;
        }

        // Hiển thị xác nhận trước khi cập nhật
        if (!window.confirm("Bạn có chắc chắn muốn cập nhật thông tin cá nhân?")) {
            return;
        }

        try {
            setLoading(true);
            setUpdating(true);

            // Chuẩn bị dữ liệu để gửi lên server
            const updateData = {
                userId: userData.userId,
                email: userData.email,
                fullName: userData.fullName,
                phone: userData.phone,
                address: userData.address,
                password: password || "", // Sử dụng mật khẩu mới nếu có, nếu không thì gửi chuỗi rỗng
                roleIds: userData.roles.map(role => role.roleId)
            };

            console.log("Dữ liệu cập nhật:", updateData);

            // Gọi API để cập nhật thông tin người dùng
            const response = await axios.put(
                `${UTIL_VARIABLE.REACT_BASE_URL}/Users/${userData.userId}`,
                updateData
            );

            console.log("Phản hồi từ server:", response);

            if (response.data && response.data.success) {
                toast.success("Cập nhật thông tin thành công!");
            } else {
                toast.error("Cập nhật thông tin thất bại!");
            }
        } catch (error) {
            console.error("Lỗi khi cập nhật thông tin:", error);

            // Hiển thị thông báo lỗi chi tiết hơn
            let errorMessage = "Lỗi khi cập nhật thông tin";

            if (error.response) {
                console.log("Response error data:", error.response.data);
                if (error.response.data && error.response.data.message) {
                    errorMessage += ": " + error.response.data.message;
                } else if (error.response.status === 400) {
                    errorMessage += ": Dữ liệu không hợp lệ";
                } else if (error.response.status === 401) {
                    errorMessage += ": Bạn không có quyền thực hiện thao tác này";
                } else if (error.response.status === 500) {
                    errorMessage += ": Lỗi máy chủ";
                }
            } else if (error.message) {
                errorMessage += ": " + error.message;
            }

            toast.error(errorMessage);
        } finally {
            setLoading(false);
            setUpdating(false);
        }
    };

    return (
        <div className="profile-container">
            <header className="header">
                <Header />
            </header>

            <div className="profile-content">
                <div className="profile-card">
                    <h2 className="profile-title">Thông tin cá nhân</h2>

                    {loading ? (
                        <div className="loading-spinner">Đang tải...</div>
                    ) : (
                        <form onSubmit={handleSubmit} className="profile-form">
                            <div className="form-group">
                                <label htmlFor="username"><FaUser className="icon-input" /> Tên đăng nhập</label>
                                <input
                                    type="text"
                                    id="username"
                                    name="username"
                                    value={userData.username}
                                    disabled
                                    className="form-control"
                                />
                                <small className="form-text text-muted">Tên đăng nhập không thể thay đổi</small>
                            </div>

                            <div className="form-group">
                                <label htmlFor="email"><FaEnvelope className="icon-input" /> Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={userData.email}
                                    onChange={handleChange}
                                    className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                                    required
                                />
                                {errors.email && <div className="error-message">{errors.email}</div>}
                            </div>

                            <div className="form-group">
                                <label htmlFor="fullName"><FaIdCard className="icon-input" /> Họ và tên</label>
                                <input
                                    type="text"
                                    id="fullName"
                                    name="fullName"
                                    value={userData.fullName}
                                    onChange={handleChange}
                                    className={`form-control ${errors.fullName ? 'is-invalid' : ''}`}
                                    required
                                />
                                {errors.fullName && <div className="error-message">{errors.fullName}</div>}
                            </div>

                            <div className="form-group">
                                <label htmlFor="phone"><FaPhone className="icon-input" /> Số điện thoại</label>
                                <input
                                    type="tel"
                                    id="phone"
                                    name="phone"
                                    value={userData.phone}
                                    onChange={handleChange}
                                    className={`form-control ${errors.phone ? 'is-invalid' : ''}`}
                                    placeholder="Nhập số điện thoại (10-11 số)"
                                />
                                {errors.phone && <div className="error-message">{errors.phone}</div>}
                            </div>

                            <div className="form-group">
                                <label htmlFor="address"><FaMapMarkerAlt className="icon-input" /> Địa chỉ</label>
                                <textarea
                                    id="address"
                                    name="address"
                                    value={userData.address}
                                    onChange={handleChange}
                                    className="form-control"
                                    rows="3"
                                    placeholder="Nhập địa chỉ của bạn"
                                ></textarea>
                            </div>

                            <div className="form-group">
                                <label htmlFor="password"><FaUser className="icon-input" /> Mật khẩu mới</label>
                                <input
                                    type="password"
                                    id="password"
                                    name="password"
                                    value={password}
                                    onChange={handleChange}
                                    className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                                    placeholder="Để trống nếu không muốn thay đổi mật khẩu"
                                />
                                {errors.password && <div className="error-message">{errors.password}</div>}
                                <small className="form-text text-muted">Để trống nếu không muốn thay đổi mật khẩu</small>
                            </div>

                            <div className="form-group">
                                <label htmlFor="confirmPassword"><FaUser className="icon-input" /> Xác nhận mật khẩu mới</label>
                                <input
                                    type="password"
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    value={confirmPassword}
                                    onChange={handleChange}
                                    className={`form-control ${errors.confirmPassword ? 'is-invalid' : ''}`}
                                    placeholder="Nhập lại mật khẩu mới"
                                    disabled={!password}
                                />
                                {errors.confirmPassword && <div className="error-message">{errors.confirmPassword}</div>}
                            </div>

                            <div className="form-group">
                                <label>Vai trò</label>
                                <div className="role-tags">
                                    {userData.roles.map(role => (
                                        <span key={role.roleId} className="role-badge">
                                            {role.roleName}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <button type="submit" className="btn-update" disabled={loading || updating}>
                                {updating ? "Đang cập nhật..." : "Cập nhật thông tin"}
                            </button>
                        </form>
                    )}
                </div>
            </div>

            <ToastContainer position="top-right" autoClose={3000} />
        </div>
    );
};

export default Profile;
