import axios from "axios";
import { UTIL_VARIABLE } from "../utils/UtilVariable";

const BASE_URL = UTIL_VARIABLE.REACT_BASE_URL + `/PasswordReset`;

export class PasswordResetService {
    /**
     * Gửi yêu cầu OTP để đặt lại mật khẩu
     * @param email Email của người dùng
     * @returns Promise với kết quả gửi OTP
     */
    async sendOtp(email: string) {
        try {
            const response = await axios.post(`${BASE_URL}/SendOtp`, { email });
            return response.data;
        } catch (error) {
            console.error("Error sending OTP:", error);
            throw error;
        }
    }

    /**
     * Xác thực mã OTP
     * @param email Email của người dùng
     * @param otp Mã OTP
     * @returns Promise với kết quả xác thực OTP
     */
    async verifyOtp(email: string, otp: string) {
        try {
            const response = await axios.post(`${BASE_URL}/VerifyOtp`, { email, otp });
            return response.data;
        } catch (error) {
            console.error("Error verifying OTP:", error);
            throw error;
        }
    }

    /**
     * Đặt lại mật khẩu
     * @param email Email của người dùng
     * @param otp Mã OTP
     * @param newPassword Mật khẩu mới
     * @param confirmPassword Xác nhận mật khẩu mới
     * @returns Promise với kết quả đặt lại mật khẩu
     */
    async resetPassword(email: string, otp: string, newPassword: string, confirmPassword: string) {
        try {
            const response = await axios.post(`${BASE_URL}/ResetPassword`, {
                email,
                otp,
                newPassword,
                confirmPassword
            });
            return response.data;
        } catch (error) {
            console.error("Error resetting password:", error);
            throw error;
        }
    }
}
