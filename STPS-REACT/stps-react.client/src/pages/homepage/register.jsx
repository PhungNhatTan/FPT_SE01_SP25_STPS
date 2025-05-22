import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../style/register.css";
import { AuthenService } from "../../services/AuthenService";
import Header from "./header";

const Register = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);

    // Validation states
    const [usernameError, setUsernameError] = useState("");
    const [fullNameError, setFullNameError] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [confirmPasswordError, setConfirmPasswordError] = useState("");
    const [generalError, setGeneralError] = useState("");

    const _authenService = new AuthenService();

    const validateForm = () => {
        let isValid = true;

        // Reset errors
        setUsernameError("");
        setFullNameError("");
        setEmailError("");
        setPasswordError("");
        setConfirmPasswordError("");
        setGeneralError("");

        // Validate username
        if (!username.trim()) {
            setUsernameError("Vui lòng nhập tên đăng nhập");
            isValid = false;
        } else if (username.length < 3) {
            setUsernameError("Tên đăng nhập phải có ít nhất 3 ký tự");
            isValid = false;
        }

        // Validate full name
        if (!fullName.trim()) {
            setFullNameError("Vui lòng nhập họ tên");
            isValid = false;
        }

        // Validate email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email.trim()) {
            setEmailError("Vui lòng nhập email");
            isValid = false;
        } else if (!emailRegex.test(email)) {
            setEmailError("Email không hợp lệ");
            isValid = false;
        }

        // Validate password
        if (!password) {
            setPasswordError("Vui lòng nhập mật khẩu");
            isValid = false;
        } else if (password.length < 6) {
            setPasswordError("Mật khẩu phải có ít nhất 6 ký tự");
            isValid = false;
        }

        // Validate confirm password
        if (!confirmPassword) {
            setConfirmPasswordError("Vui lòng xác nhận mật khẩu");
            isValid = false;
        } else if (password !== confirmPassword) {
            setConfirmPasswordError("Mật khẩu xác nhận không khớp");
            isValid = false;
        }

        return isValid;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        setLoading(true);

        try {
            const response = await _authenService.register(username, fullName, email, password);

            if (response.data && response.status === 200) {
                toast.success("Đăng ký thành công! Vui lòng đăng nhập.");
                setTimeout(() => {
                    navigate("/login");
                }, 2000);
            } else if (response.data && response.data.message) {
                setGeneralError(response.data.message);
            } else {
                setGeneralError("Đăng ký không thành công. Vui lòng thử lại.");
            }
        } catch (error) {
            console.error("Lỗi đăng ký:", error);

            if (error.response && error.response.data) {
                const errorMessage = error.response.data.message;
                console.log("Error response:", error.response.data);

                if (errorMessage && typeof errorMessage === 'string') {
                    if (errorMessage.includes("Email đã tồn tại")) {
                        setEmailError("Email đã được sử dụng");
                    } else if (errorMessage.includes("Username đã tồn tại")) {
                        setUsernameError("Tên đăng nhập đã được sử dụng");
                    } else {
                        setGeneralError(errorMessage);
                    }
                } else {
                    setGeneralError("Đăng ký không thành công. Vui lòng thử lại.");
                }
            } else {
                setGeneralError("Lỗi kết nối. Vui lòng thử lại sau.");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="register-container">
            <header className="header">
                <Header />
            </header>

            <div className="register-form-container">
                <div className="register-form-box">
                    <h2 className="register-title">Đăng Ký Tài Khoản</h2>

                    {generalError && (
                        <div className="alert alert-danger" role="alert">
                            {generalError}
                        </div>
                    )}

                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="username">Tên đăng nhập</label>
                            <input
                                type="text"
                                id="username"
                                className={`form-control ${usernameError ? "is-invalid" : ""}`}
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                placeholder="Nhập tên đăng nhập"
                            />
                            {usernameError && <div className="invalid-feedback">{usernameError}</div>}
                        </div>

                        <div className="form-group">
                            <label htmlFor="fullName">Họ và tên</label>
                            <input
                                type="text"
                                id="fullName"
                                className={`form-control ${fullNameError ? "is-invalid" : ""}`}
                                value={fullName}
                                onChange={(e) => setFullName(e.target.value)}
                                placeholder="Nhập họ và tên"
                            />
                            {fullNameError && <div className="invalid-feedback">{fullNameError}</div>}
                        </div>

                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input
                                type="email"
                                id="email"
                                className={`form-control ${emailError ? "is-invalid" : ""}`}
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Nhập địa chỉ email"
                            />
                            {emailError && <div className="invalid-feedback">{emailError}</div>}
                        </div>

                        <div className="form-group">
                            <label htmlFor="password">Mật khẩu</label>
                            <input
                                type="password"
                                id="password"
                                className={`form-control ${passwordError ? "is-invalid" : ""}`}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Nhập mật khẩu"
                            />
                            {passwordError && <div className="invalid-feedback">{passwordError}</div>}
                        </div>

                        <div className="form-group">
                            <label htmlFor="confirmPassword">Xác nhận mật khẩu</label>
                            <input
                                type="password"
                                id="confirmPassword"
                                className={`form-control ${confirmPasswordError ? "is-invalid" : ""}`}
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                placeholder="Nhập lại mật khẩu"
                            />
                            {confirmPasswordError && <div className="invalid-feedback">{confirmPasswordError}</div>}
                        </div>

                        <button
                            type="submit"
                            className="btn btn-primary w-100 mt-3"
                            disabled={loading}
                        >
                            {loading ? "Đang xử lý..." : "Đăng Ký"}
                        </button>

                        <div className="text-center mt-3">
                            <p>
                                Đã có tài khoản? <a href="/login">Đăng nhập</a>
                            </p>
                        </div>
                    </form>
                </div>
            </div>

            <ToastContainer position="top-right" autoClose={3000} />
        </div>
    );
};

export default Register;
