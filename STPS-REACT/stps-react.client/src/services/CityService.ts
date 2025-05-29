import axios from "axios";
import { UTIL_VARIABLE } from "../utils/UtilVariable";

var BASE_URL = UTIL_VARIABLE.REACT_BASE_URL + `/Cities`;
var URL_GET_ALL = BASE_URL;

export class CityService {
    async findAll() {
        return await axios.get(URL_GET_ALL);
    }

    async getAllCities() {
        return await axios.get(URL_GET_ALL);
    }

    async findById(idCity) {
        return await axios.get(`${URL_GET_ALL}/${idCity}`);
    }
}
