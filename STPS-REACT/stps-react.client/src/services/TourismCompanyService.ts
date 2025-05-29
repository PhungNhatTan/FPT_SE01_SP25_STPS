import axios from 'axios';
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

const API_URL = UTIL_VARIABLE.REACT_BASE_URL +'/TourismCompanies';

// Log URL để debug
console.log('Tourism Companies API URL:', API_URL);

export const getCompanies = () => axios.get(API_URL);
export const getCompanyById = (id: number) => axios.get(`${API_URL}/${id}`);

// New API: Get company by user ID
export const getCompanyByUserId = (userId: number) => {
  console.log(`Calling GET ${API_URL}/User/${userId}`);
  return axios.get(`${API_URL}/User/${userId}`);
};

export const createCompany = (data: any) => {
  console.log(`Calling POST ${API_URL} with data:`, data);
  return axios.post(API_URL, data);
};
export const updateCompany = (id: number, data: any) => {
  console.log(`Calling PUT ${API_URL}/${id} with data:`, data);
  return axios.put(`${API_URL}/${id}`, data);
};
export const deleteCompany = (id: number) => {
  console.log(`Calling DELETE ${API_URL}/${id}`);
  return axios.delete(`${API_URL}/${id}`);
};