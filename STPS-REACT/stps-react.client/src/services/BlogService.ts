import axios from "axios";
import { UTIL_VARIABLE } from "../utils/UtilVariable";

const BASE_URL = UTIL_VARIABLE.REACT_BASE_URL + "/Blog";

export class BlogService {
    async getAllBlogs() {
        return await axios.get(BASE_URL);
    }
    async getBlogById(id) {
        return await axios.get(`${BASE_URL}/${id}`);
    }
    async addBlog(data) {
        // data: { title, description, imageFile }
        const formData = new FormData();
        formData.append("Title", data.title);
        formData.append("Description", data.description);
        if (data.imageFile) formData.append("Image", data.imageFile);
        return await axios.post(BASE_URL, formData, { headers: { "Content-Type": "multipart/form-data" } });
    }
    async updateBlog(id, data) {
        // data: { id, title, description, imageFile }
        const formData = new FormData();
        formData.append("Id", id);
        formData.append("Title", data.title);
        formData.append("Description", data.description);
        if (data.imageFile) formData.append("Image", data.imageFile);
        return await axios.put(`${BASE_URL}/${id}`, formData, { headers: { "Content-Type": "multipart/form-data" } });
    }
    async deleteBlog(id) {
        return await axios.delete(`${BASE_URL}/${id}`);
    }
} 