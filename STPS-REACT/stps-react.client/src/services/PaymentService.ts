import axios from 'axios';
import {UTIL_VARIABLE} from "../utils/UtilVariable";
var BASE_URL = UTIL_VARIABLE.REACT_BASE_URL + `/Payment`;
const PaymentService = {
    createPaymentQR: async (bookingId, amount, description) => {
        try {
            const response = await axios.post(`${BASE_URL}/create-qr/${bookingId}`, {
                moneyToPay: amount,
                description: description
            });
            
            if (response.data && response.data.data && response.data.data.paymentUrl) {
                // Redirect to VNPay payment page
                window.location.href = response.data.data.paymentUrl;
                return response.data;
            } else {
                throw new Error('Invalid payment response: Missing payment URL');
            }
        } catch (error) {
            throw error.response?.data || error;
        }
    },

    getPaymentTransaction: async (bookingId) => {
        try {
            const response = await axios.get(`${BASE_URL}/transaction/${bookingId}`);
            return response.data;
        } catch (error) {
            throw error.response?.data || error;
        }
    },
    createRefundQR: async (refundId) => {
        try {
            const response = await axios.post(`${BASE_URL}/create-qr-refund/${refundId}`);

            if (response.data && response.data.data && response.data.data.paymentUrl) {
                // Redirect to VNPay payment page
                window.location.href = response.data.data.paymentUrl;
                return response.data;
            } else {
                throw new Error('Invalid payment response: Missing payment URL');
            }
        } catch (error) {
            throw error.response?.data || error;
        }
    },
    async createPaymentQRForCompany(id: any) {
        try {
            const response = await axios.post(`${BASE_URL}/create-qr-company/${id}`);

            if (response.data && response.data.data && response.data.data.paymentUrl) {
                window.location.href = response.data.data.paymentUrl;
                return response.data;
            } else {
                throw new Error('Invalid payment response: Missing payment URL');
            }
        } catch (error) {
            throw error.response?.data || error;
        }
    }
};

export default PaymentService;
