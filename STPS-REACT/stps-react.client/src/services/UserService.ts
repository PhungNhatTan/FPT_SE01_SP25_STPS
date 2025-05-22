
import axios from "axios";
import { UTIL_VARIABLE } from "../utils/UtilVariable";

// Cấu hình axios
axios.defaults.withCredentials = false;
axios.defaults.headers.common['Content-Type'] = 'application/json';
axios.defaults.headers.common['Accept'] = 'application/json';

// Thêm interceptor để xử lý lỗi
axios.interceptors.response.use(
  response => response,
  error => {
    console.error('Axios error:', error);
    console.error('Error response:', error.response);
    return Promise.reject(error);
  }
);

const API_URL = UTIL_VARIABLE.REACT_BASE_URL+'/Users';
const ROLE_URL = UTIL_VARIABLE.REACT_BASE_URL+ '/Roles';

// Log URL để debug
console.log('API URL:', API_URL);
console.log('ROLE URL:', ROLE_URL);

export const getUsers = () => axios.get(API_URL);
export const getUserById = (id: number) => axios.get(`${API_URL}/${id}`);
export const createUser = (data: any) => axios.post(API_URL, data);
export const updateUser = (id: number, data: any) => {
  console.log(`Calling PUT ${API_URL}/${id} with data:`, data);
  console.log(`User ID type: ${typeof id}, value: ${id}`);

  // Đảm bảo id là một số
  const userId = Number(id);
  if (isNaN(userId)) {
    console.error(`Invalid user ID: ${id}`);
    throw new Error(`Invalid user ID: ${id}`);
  }

  return axios.put(`${API_URL}/${userId}`, data);
};
export const deleteUser = (id: number) => axios.delete(`${API_URL}/${id}`);
export const getRoles = () => axios.get(ROLE_URL);