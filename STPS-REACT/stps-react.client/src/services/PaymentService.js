import axios from 'axios';

const API_BASE_URL = 'https://localhost:7082/api';

export class PaymentService {
    // Tạo QR thanh toán
    async createPaymentQR(bookingId) {
        try {
            const response = await axios.post(`${API_BASE_URL}/Tours/Payment/CreateQR/${bookingId}`);
            return response.data;
        } catch (error) {
            console.error('Error creating payment QR:', error);
            throw error;
        }
    }

    // Xác nhận thanh toán
    async confirmPayment(bookingId, transactionId) {
        try {
            const response = await axios.post(`${API_BASE_URL}/Tours/Payment/Confirm/${bookingId}`, {
                transactionId: transactionId
            });
            return response.data;
        } catch (error) {
            console.error('Error confirming payment:', error);
            throw error;
        }
    }

    // Lấy thông tin giao dịch thanh toán
    async getPaymentTransaction(bookingId) {
        try {
            const response = await axios.get(`${API_BASE_URL}/Payment/transaction/${bookingId}`);
            return response.data;
        } catch (error) {
            console.error('Error getting payment transaction:', error);
            throw error;
        }
    }
}

export default new PaymentService();
