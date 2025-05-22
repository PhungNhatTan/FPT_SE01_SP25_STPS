import axios from "axios";
import { UTIL_VARIABLE } from "../utils/UtilVariable";

const BASE_URL = UTIL_VARIABLE.REACT_BASE_URL + "/Voucher";

export class VoucherService {
    async getAllVouchers() {
        return await axios.get(BASE_URL);
    }
    async getVoucherById(id) {
        return await axios.get(`${BASE_URL}/${id}`);
    }
    async addVoucher(data) {
        return await axios.post(BASE_URL, data);
    }
    async updateVoucher(id, data) {
        return await axios.put(`${BASE_URL}/${id}`, data);
    }
    async deleteVoucher(id) {
        return await axios.delete(`${BASE_URL}/${id}`);
    }
} 