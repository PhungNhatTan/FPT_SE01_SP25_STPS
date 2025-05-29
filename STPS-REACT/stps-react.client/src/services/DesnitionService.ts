import axios from "axios";
import { UTIL_VARIABLE } from "../utils/UtilVariable";

var BASE_URL = UTIL_VARIABLE.REACT_BASE_URL + `/Destinations`;
var URL_GET_ALL = BASE_URL;
var URL_GET_FEATURED = BASE_URL + `/Featured`;
var URL_GET_BY_CITY = BASE_URL + `/City`;

// Giữ lại tên class cũ để tương thích với code hiện tại
export class DesnitionService {
    async findAll() {
        return await axios.get(URL_GET_ALL);
    }

    async getFeatured() {
        return await axios.get(URL_GET_FEATURED);
    }

    async getById(desId) {
        return await axios.get(`${URL_GET_ALL}/${desId}`);
    }

    async getByCity(cityId) {
        return await axios.get(`${URL_GET_BY_CITY}/${cityId}`);
    }

    async searchDestinations(searchTerm) {
        // Vì API không có endpoint tìm kiếm riêng, chúng ta sẽ lấy tất cả và lọc ở client
        const response = await this.findAll();
        if (response.data && response.data.success) {
            const destinations = response.data.data || [];
            const filteredDestinations = destinations.filter(dest =>
                dest.destinationName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                (dest.description && dest.description.toLowerCase().includes(searchTerm.toLowerCase()))
            );
            return {
                data: {
                    success: true,
                    data: filteredDestinations,
                    message: filteredDestinations.length > 0 ? "Tìm thấy địa điểm phù hợp" : "Không tìm thấy địa điểm phù hợp"
                }
            };
        }
        return response;
    }
}

// Đồng thời export class mới để sử dụng trong các component mới
export class DestinationService extends DesnitionService {
    // Kế thừa tất cả các phương thức từ DesnitionService
}
