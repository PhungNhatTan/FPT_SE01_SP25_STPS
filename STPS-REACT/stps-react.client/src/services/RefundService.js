import axios from 'axios';

const API_BASE_URL = 'https://localhost:7082/api';

export class RefundService {
    // Kiểm tra có thể hủy booking không
    async canCancelBooking(bookingId) {
        try {
            const response = await axios.get(`${API_BASE_URL}/Tours/Booking/CanCancel/${bookingId}`);
            return response.data;
        } catch (error) {
            console.error('Error checking if booking can be cancelled:', error);
            throw error;
        }
    }

    // Tạo yêu cầu hoàn tiền (hủy booking)
    async createRefundRequest(refundData) {
        try {
            const response = await axios.post(`${API_BASE_URL}/Tours/Booking/Cancel`, refundData);
            return response.data;
        } catch (error) {
            console.error('Error creating refund request:', error);
            throw error;
        }
    }

    // Lấy thông tin yêu cầu hoàn tiền
    async getRefundRequest(bookingId) {
        try {
            const response = await axios.get(`${API_BASE_URL}/Refund/booking/${bookingId}`);
            return response.data;
        } catch (error) {
            console.error('Error getting refund request:', error);
            throw error;
        }
    }

    // Lấy danh sách yêu cầu hoàn tiền đang chờ (Admin)
    async getPendingRefunds() {
        try {
            const response = await axios.get(`${API_BASE_URL}/Refund/pending`);
            return response.data;
        } catch (error) {
            console.error('Error getting pending refunds:', error);
            throw error;
        }
    }

    // Xác nhận hoàn tiền (Admin)
    async processRefund(refundRequestId) {
        try {
            const response = await axios.post(`${API_BASE_URL}/Refund/process/${refundRequestId}`);
            return response.data;
        } catch (error) {
            console.error('Error processing refund:', error);
            throw error;
        }
    }
}

export default new RefundService();
