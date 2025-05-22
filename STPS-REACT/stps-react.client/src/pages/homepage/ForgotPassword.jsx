import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from "./header";
import { PasswordResetService } from "../../services/PasswordResetService";
import "../../style/forgot-password.css";

const ForgotPassword = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [step, setStep] = useState(1); // 1: Email, 2: OTP, 3: New Password
    const [loading, setLoading] = useState(false);
    const [emailError, setEmailError] = useState("");
    const [otpError, setOtpError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [confirmPasswordError, setConfirmPasswordError] = useState("");

    const _passwordResetService = new PasswordResetService();

    // Kiểm tra email hợp lệ
    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    // Xử lý gửi email
    const handleSendOtp = async (e) => {
        e.preventDefault();
        
        // Kiểm tra email
        if (!email) {
            setEmailError("Vui lòng nhập email");
            return;
        }
        
        if (!validateEmail(email)) {
            setEmailError("Email không hợp lệ");
            return;
        }
        
        setEmailError("");
        setLoading(true);
        
        try {
            const response = await _passwordResetService.sendOtp(email);
            
            if (response.success) {
                toast.success(response.message || "Mã OTP đã được gửi đến email của bạn");
                setStep(2); // Chuyển sang bước nhập OTP
            } else {
                toast.error(response.message || "Không thể gửi mã OTP");
            }
        } catch (error) {
            console.error("Error sending OTP:", error);
            toast.error(error.response?.data?.message || "Đã xảy ra lỗi khi gửi mã OTP");
        } finally {
            setLoading(false);
        }
    };

    // Xử lý xác thực OTP
    const handleVerifyOtp = async (e) => {
        e.preventDefault();
        
        // Kiểm tra OTP
        if (!otp) {
            setOtpError("Vui lòng nhập mã OTP");
            return;
        }
        
        if (otp.length !== 6 || !/^\d+$/.test(otp)) {
            setOtpError("Mã OTP phải có 6 chữ số");
            return;
        }
        
        setOtpError("");
        setLoading(true);
        
        try {
            const response = await _passwordResetService.verifyOtp(email, otp);
            
            if (response.success) {
                toast.success(response.message || "Mã OTP hợp lệ");
                setStep(3); // Chuyển sang bước đặt mật khẩu mới
            } else {
                toast.error(response.message || "Mã OTP không hợp lệ");
            }
        } catch (error) {
            console.error("Error verifying OTP:", error);
            toast.error(error.response?.data?.message || "Đã xảy ra lỗi khi xác thực mã OTP");
        } finally {
            setLoading(false);
        }
    };

    // Xử lý đặt lại mật khẩu
    const handleResetPassword = async (e) => {
        e.preventDefault();
        
        // Kiểm tra mật khẩu
        if (!newPassword) {
            setPasswordError("Vui lòng nhập mật khẩu mới");
            return;
        }
        
        if (newPassword.length < 6) {
            setPasswordError("Mật khẩu phải có ít nhất 6 ký tự");
            return;
        }
        
        if (!confirmPassword) {
            setConfirmPasswordError("Vui lòng xác nhận mật khẩu");
            return;
        }
        
        if (newPassword !== confirmPassword) {
            setConfirmPasswordError("Mật khẩu xác nhận không khớp");
            return;
        }
        
        setPasswordError("");
        setConfirmPasswordError("");
        setLoading(true);
        
        try {
            const response = await _passwordResetService.resetPassword(email, otp, newPassword, confirmPassword);
            
            if (response.success) {
                toast.success(response.message || "Đặt lại mật khẩu thành công");
                
                // Chuyển hướng về trang đăng nhập sau 2 giây
                setTimeout(() => {
                    navigate("/login");
                }, 2000);
            } else {
                toast.error(response.message || "Không thể đặt lại mật khẩu");
            }
        } catch (error) {
            console.error("Error resetting password:", error);
            toast.error(error.response?.data?.message || "Đã xảy ra lỗi khi đặt lại mật khẩu");
        } finally {
            setLoading(false);
        }
    };

    // Hiển thị form tương ứng với từng bước
    const renderForm = () => {
        switch (step) {
            case 1:
                return (
                    <form onSubmit={handleSendOtp} className="forgot-password-form">
                        <h3>Quên mật khẩu</h3>
                        <p>Nhập email của bạn để nhận mã OTP đặt lại mật khẩu</p>
                        
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input
                                type="email"
                                id="email"
                                className={`form-control ${emailError ? 'is-invalid' : ''}`}
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Nhập email"
                                required
                            />
                            {emailError && <div className="invalid-feedback">{emailError}</div>}
                        </div>
                        
                        <button type="submit" className="btn btn-primary w-100" disabled={loading}>
                            {loading ? "Đang gửi..." : "Gửi mã OTP"}
                        </button>
                        
                        <div className="text-center mt-3">
                            <p>
                                Quay lại <a href="/login">Đăng nhập</a>
                            </p>
                        </div>
                    </form>
                );
            
            case 2:
                return (
                    <form onSubmit={handleVerifyOtp} className="forgot-password-form">
                        <h3>Xác thực OTP</h3>
                        <p>Nhập mã OTP đã được gửi đến email của bạn</p>
                        
                        <div className="form-group">
                            <label htmlFor="otp">Mã OTP</label>
                            <input
                                type="text"
                                id="otp"
                                className={`form-control ${otpError ? 'is-invalid' : ''}`}
                                value={otp}
                                onChange={(e) => setOtp(e.target.value)}
                                placeholder="Nhập mã OTP"
                                maxLength={6}
                                required
                            />
                            {otpError && <div className="invalid-feedback">{otpError}</div>}
                        </div>
                        
                        <button type="submit" className="btn btn-primary w-100" disabled={loading}>
                            {loading ? "Đang xác thực..." : "Xác thực"}
                        </button>
                        
                        <div className="text-center mt-3">
                            <p>
                                Chưa nhận được mã? <a href="#" onClick={(e) => { e.preventDefault(); handleSendOtp(e); }}>Gửi lại</a>
                            </p>
                        </div>
                    </form>
                );
            
            case 3:
                return (
                    <form onSubmit={handleResetPassword} className="forgot-password-form">
                        <h3>Đặt lại mật khẩu</h3>
                        <p>Nhập mật khẩu mới của bạn</p>
                        
                        <div className="form-group">
                            <label htmlFor="newPassword">Mật khẩu mới</label>
                            <input
                                type="password"
                                id="newPassword"
                                className={`form-control ${passwordError ? 'is-invalid' : ''}`}
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                placeholder="Nhập mật khẩu mới"
                                required
                            />
                            {passwordError && <div className="invalid-feedback">{passwordError}</div>}
                        </div>
                        
                        <div className="form-group">
                            <label htmlFor="confirmPassword">Xác nhận mật khẩu</label>
                            <input
                                type="password"
                                id="confirmPassword"
                                className={`form-control ${confirmPasswordError ? 'is-invalid' : ''}`}
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                placeholder="Nhập lại mật khẩu mới"
                                required
                            />
                            {confirmPasswordError && <div className="invalid-feedback">{confirmPasswordError}</div>}
                        </div>
                        
                        <button type="submit" className="btn btn-primary w-100" disabled={loading}>
                            {loading ? "Đang xử lý..." : "Đặt lại mật khẩu"}
                        </button>
                    </form>
                );
            
            default:
                return null;
        }
    };

    return (
        <div className="forgot-password-container">
            <header className="header">
                <Header />
            </header>
            
            <div className="forgot-password-content">
                <div className="forgot-password-box">
                    {renderForm()}
                </div>
            </div>
            
            <ToastContainer position="top-right" autoClose={3000} />
        </div>
    );
};

export default ForgotPassword;
