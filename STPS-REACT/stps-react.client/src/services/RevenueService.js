import axios from 'axios';

const API_BASE_URL = 'https://localhost:7082/api';

export class RevenueService {
    // Lấy thống kê doanh thu của công ty
    async getCompanyRevenue(companyId, fromDate = null, toDate = null) {
        try {
            let url = `${API_BASE_URL}/Revenue/company/${companyId}`;
            const params = new URLSearchParams();

            if (fromDate) params.append('fromDate', fromDate);
            if (toDate) params.append('toDate', toDate);

            if (params.toString()) {
                url += `?${params.toString()}`;
            }

            const response = await axios.get(url);
            return response.data;
        } catch (error) {
            console.error('Error getting company revenue:', error);
            throw error;
        }
    }

    // Lấy thống kê doanh thu tổng quan cho admin
    async getAdminRevenueStatistics(fromDate = null, toDate = null) {
        try {
            let url = `${API_BASE_URL}/Revenue/admin/statistics`;
            const params = new URLSearchParams();

            if (fromDate) params.append('fromDate', fromDate);
            if (toDate) params.append('toDate', toDate);

            if (params.toString()) {
                url += `?${params.toString()}`;
            }

            const response = await axios.get(url);
            return response.data;
        } catch (error) {
            console.error('Error getting admin revenue statistics:', error);
            throw error;
        }
    }

    // Lấy danh sách giao dịch chuyển tiền đang chờ
    async getPendingRevenueTransfers() {
        try {
            const response = await axios.get(`${API_BASE_URL}/Revenue/pending-transfers`);
            return response.data;
        } catch (error) {
            console.error('Error getting pending revenue transfers:', error);
            throw error;
        }
    }

    // Xử lý chuyển tiền theo lịch (Admin)
    async processScheduledRevenueTransfers() {
        try {
            const response = await axios.post(`${API_BASE_URL}/Revenue/process-transfers`);
            return response.data;
        } catch (error) {
            console.error('Error processing scheduled revenue transfers:', error);
            throw error;
        }
    }

    // Xử lý một giao dịch chuyển tiền cụ thể
    async processRevenueTransfer(transactionId) {
        try {
            const response = await axios.post(`${API_BASE_URL}/Revenue/process-transfer/${transactionId}`);
            return response.data;
        } catch (error) {
            console.error('Error processing revenue transfer:', error);
            throw error;
        }
    }
}

export default new RevenueService();
