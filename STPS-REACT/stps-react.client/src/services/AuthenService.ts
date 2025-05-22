import axios from "axios";
import { UTIL_VARIABLE } from "../utils/UtilVariable";

var BASE_URL = UTIL_VARIABLE.REACT_BASE_URL + `/Auth`;
var URL_LOG_IN = BASE_URL + `/login`;
var URL_REGISTER = BASE_URL + `/register`;

export class AuthenService {
    async login(emailRq: any, passRq: any) {
        const requestData = {
            email: emailRq,
            password: passRq,
        }

        return await axios.post(URL_LOG_IN, requestData);
    }

    async register(username: string, fullName: string, email: string, password: string) {
        const requestData = {
            username,
            fullName,
            email,
            password
        }

        try {
            return await axios.post(URL_REGISTER, requestData);
        } catch (error) {
            console.error("Register API error:", error);
            throw error;
        }
    }
}
