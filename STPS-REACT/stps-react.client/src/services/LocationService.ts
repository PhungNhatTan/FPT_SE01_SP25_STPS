import axios from "axios";
import { UTIL_VARIABLE } from "../utils/UtilVariable";

const BASE_URL = UTIL_VARIABLE.REACT_BASE_URL + "/Destinations";

export class LocationService {
    async getAllLocations() {
        return await axios.get(BASE_URL);
    }

    async getLocationById(id: number | string) {
        return await axios.get(`${BASE_URL}/${id}`);
    }

    async addLocation(data: FormData) {
        return await axios.post(BASE_URL, data, {
            headers: { "Content-Type": "multipart/form-data" }
        });
    }

    async updateLocation(id: number | string, data: FormData) {
        return await axios.put(`${BASE_URL}/${id}`, data, {
            headers: { "Content-Type": "multipart/form-data" }
        });
    }

    async deleteLocation(id: number | string) {
        return await axios.delete(`${BASE_URL}/${id}`);
    }
} 