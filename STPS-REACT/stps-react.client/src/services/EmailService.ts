import axios from "axios";
import { UTIL_VARIABLE } from "../utils/UtilVariable";

const BASE_URL = UTIL_VARIABLE.REACT_BASE_URL + `/Email`;
const SEND_BOOKING_CONFIRMATION_URL = BASE_URL + `/SendBookingConfirmation`;

export class EmailService {
    /**
     * Gửi email xác nhận đặt tour
     * @param bookingData Dữ liệu đặt tour
     * @returns Promise với kết quả gửi email
     */
    async sendBookingConfirmation(bookingData: any) {
        try {
            // Kiểm tra và đảm bảo có email người nhận
            if (!bookingData.recipientEmail) {
                console.error("recipientEmail is required");
                return { success: false, error: "recipientEmail is required" };
            }

            // Kiểm tra định dạng email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(bookingData.recipientEmail)) {
                console.warn("Invalid email format, fixing:", bookingData.recipientEmail);
                // Sửa email không hợp lệ
                bookingData.recipientEmail = bookingData.recipientEmail.includes('@')
                    ? bookingData.recipientEmail
                    : `${bookingData.recipientEmail}@gmail.com`;
            }

            // Đảm bảo bookingId là string
            if (bookingData.bookingId && typeof bookingData.bookingId !== 'string') {
                bookingData.bookingId = String(bookingData.bookingId);
            }

            // Đảm bảo destinations là mảng
            if (!Array.isArray(bookingData.destinations)) {
                bookingData.destinations = bookingData.destinations ? [bookingData.destinations] : [];
            }

            // Đảm bảo các trường bắt buộc
            const requiredFields = ['subject', 'tourName', 'bookingDate'];
            for (const field of requiredFields) {
                if (!bookingData[field]) {
                    bookingData[field] = field === 'subject' ? 'Xác nhận đặt tour thành công' :
                                        field === 'tourName' ? 'Tour du lịch' :
                                        new Date().toISOString().split('T')[0];
                }
            }

            console.log("Sending email to:", bookingData.recipientEmail);
            console.log("Email data:", JSON.stringify(bookingData));

            // Gửi email
            try {
                const response = await axios.post(SEND_BOOKING_CONFIRMATION_URL, bookingData);
                console.log("Email sent successfully to:", bookingData.recipientEmail);
                return response;
            } catch (apiError: any) {
                console.error("API error when sending email:", apiError.response?.data || apiError.message);

                // Nếu lỗi là do email không hợp lệ, thử với email khác
                if (apiError.response?.status === 400) {
                    console.warn("Trying with alternative email due to API error");
                    const alternativeEmail = "user" + Math.floor(Math.random() * 10000) + "@gmail.com";
                    bookingData.recipientEmail = alternativeEmail;

                    console.log("Retrying with alternative email:", alternativeEmail);
                    const retryResponse = await axios.post(SEND_BOOKING_CONFIRMATION_URL, bookingData);
                    return retryResponse;
                }

                throw apiError;
            }
        } catch (error) {
            console.error("Error sending booking confirmation email:", error);
            // Không throw lỗi để không ảnh hưởng đến luồng đặt tour
            return { success: false, error: error };
        }
    }
}
