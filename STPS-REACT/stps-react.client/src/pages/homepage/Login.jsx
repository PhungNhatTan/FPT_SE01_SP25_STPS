import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./header";
import "bootstrap/dist/css/bootstrap.min.css";
import { AuthenService } from "../../services/AuthenService";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "../../style/login.css";

const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const _authenService = new AuthenService();
    const loginHere = async() => {
        try {
            var res = await _authenService.login(email, password);
            var roles = res.data.roles;

            if (Array.isArray(roles)) {
                // Lưu token và thông tin user vào localStorage
                localStorage.setItem('token', res.data.token);
                localStorage.setItem('user', JSON.stringify(res.data));

                // Lưu userId riêng để dễ truy cập
                if (res.data.userId) {
                    localStorage.setItem('userId', res.data.userId);
                    console.log("Saved userId to localStorage:", res.data.userId);
                }

                toast.success("Đăng nhập thành công!");

                // Chuyển hướng dựa trên role
                setTimeout(() => {
                    if (roles.includes('Admin')) {
                        window.location.href = '/dashboard-admin';
                    } else if (roles.includes('Manager')) {
                        window.location.href = '/dashboard-manager';
                    } else if (roles.includes('Tourism Company')) {
                        window.location.href = '/managepage';
                    } else {
                        window.location.href = '/'; // Customer
                    }
                }, 1000);
            }
        } catch(err) {
            toast.error("Đăng nhập thất bại: " + (err.response?.data?.message || err.message));
        }
    };

    return (
        <div className="login-container">
            <header className="header">
                <Header />
            </header>

            <div className="login-form-container">
                <div className="login-form-box">
                    <h2 className="login-title">Đăng Nhập</h2>

                    <form onSubmit={(e) => { e.preventDefault(); loginHere(); }}>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            className="form-control"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Nhập email"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Mật khẩu</label>
                        <input
                            type="password"
                            id="password"
                            className="form-control"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Nhập mật khẩu"
                            required
                        />
                    </div>

                    <div className="form-options">
                        <div className="remember-me">
                            <input type="checkbox" id="remember" />
                            <label htmlFor="remember">
                                Ghi nhớ đăng nhập
                            </label>
                        </div>
                        <a href="/forgot-password" className="forgot-password">
                            Quên mật khẩu?
                        </a>
                    </div>

                    <button type="submit" className="btn btn-primary w-100 mt-3">
                        Đăng nhập
                    </button>

                    <div className="text-center mt-3">
                        <p>
                            Chưa có tài khoản? <a href="/register">Đăng ký ngay</a>
                        </p>
                    </div>
                </form>
                </div>
            </div>
            <ToastContainer position="top-right" autoClose={3000} />
        </div>
    );
};

export default Login;
