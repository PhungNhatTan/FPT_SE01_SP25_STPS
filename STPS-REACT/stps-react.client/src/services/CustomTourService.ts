import axios from "axios";
import { UTIL_VARIABLE } from "../utils/UtilVariable";

const BASE_URL = UTIL_VARIABLE.REACT_BASE_URL + "/CustomTours";

export class CustomTourService {
    async getAllCustomTours() {
        return await axios.get(BASE_URL);
    }

    async getCustomTourById(id: number | string) {
        return await axios.get(`${BASE_URL}/${id}`);
    }

    async getCustomToursByUserId(userId: number | string) {
        return await axios.get(`${BASE_URL}/User/${userId}`);
    }

    async createCustomTour(data: any) {
        return await axios.post(BASE_URL, data);
    }

    async updateCustomTour(data: any) {
        return await axios.put(BASE_URL, data);
    }

    async deleteCustomTour(id: number | string) {
        return await axios.delete(`${BASE_URL}/${id}`);
    }
}
