import axios from "axios";
import { UTIL_VARIABLE } from "../utils/UtilVariable";
import { getUserIdFromToken } from "../utils/JwtHelper";

var BASE_URL = UTIL_VARIABLE.REACT_BASE_URL;
var URL_GET_TOUR_FEATURED = BASE_URL + `/Tours/Featured`;
var URL_GET_TOUR_DETAILS = BASE_URL + `/Tours`;
var URL_BOOK = BASE_URL + `/Tours/Book`;
var URL_HISTORY = BASE_URL + `/Tours/BookingHistory`;
var URL_SEARCH = BASE_URL + `/Tours/Search`;
var URL_TOURS_BY_COMPANY = BASE_URL + `/Tours/Company`;

export class TourServices {
    async getTourFeatured() {
        return await axios.get(URL_GET_TOUR_FEATURED);
    }

    async getTourById(tourId) {
        return await axios.get(`${URL_GET_TOUR_DETAILS}/${tourId}`);
    }

    // New method: Get tours by company ID
    async getToursByCompanyId(companyId) {
        console.log(`Getting tours for company ID: ${companyId}`);
        return await axios.get(`${URL_TOURS_BY_COMPANY}/${companyId}`);
    }

    async getTourHistory(userId) {
        return await axios.get(`${URL_HISTORY}/${userId}`);
    }

    async searchTours(searchParams) {
        return await axios.post(URL_SEARCH, searchParams);
    }

    async bookNow(tourId: any, tourDate: any, adultCount: any, childCount: any) {
        try {
            // Kiểm tra tourId
            if (!tourId) {
                throw new Error("tourId is required");
            }

            // Đảm bảo tourId là số
            const numericTourId = Number(tourId);
            if (isNaN(numericTourId)) {
                throw new Error(`Invalid tourId: ${tourId}`);
            }

            // Kiểm tra xem có token không
            if (!localStorage.getItem('token')) {
                throw new Error("User not logged in");
            }

            // Thử lấy userId từ localStorage trước
            let userId = localStorage.getItem('userId');

            // Nếu không có, thử lấy từ token JWT
            if (!userId) {
                userId = getUserIdFromToken();
            }

            // Nếu vẫn không có, báo lỗi
            if (!userId) {
                throw new Error("User ID not found");
            }

            // Chuyển đổi userId thành số
            const numericUserId = Number(userId);
            if (isNaN(numericUserId)) {
                throw new Error(`Invalid userId: ${userId}`);
            }

            console.log("Booking with user ID:", numericUserId);

            // Chuẩn bị dữ liệu đặt tour
            const requestData = {
                tourId: numericTourId,
                userId: numericUserId,
                tourDate: tourDate,
                adultCount: Number(adultCount) || 1,
                childCount: Number(childCount) || 0,
                paymentMethod: "creditCard",
                passengers: [
                    {
                        passengerName: "Khách hàng",
                        passengerType: "adult"
                    }
                ]
            };

            console.log("Booking request data:", JSON.stringify(requestData));
            console.log("Booking URL:", URL_BOOK);

            // Gọi API đặt tour
            return await axios.post(URL_BOOK, requestData);
        } catch (error) {
            console.error("Error in bookNow:", error);
            throw error;
        }
    }

    async bookNowWithDetails(
        tourId: any,
        tourDate: any,
        adultCount: any,
        childCount: any,
        paymentMethod: string,
        passengers: any[],
        contactInfo: any,
        adultPrice: any = null,
        childPrice: any = null,
        totalPrice: any = null
    ) {
        try {
            // Kiểm tra tourId
            if (!tourId) {
                throw new Error("tourId is required");
            }

            // Đảm bảo tourId là số
            const numericTourId = Number(tourId);
            if (isNaN(numericTourId)) {
                throw new Error(`Invalid tourId: ${tourId}`);
            }

            // Kiểm tra xem có token không
            if (!localStorage.getItem('token')) {
                throw new Error("User not logged in");
            }

            // Thử lấy userId từ localStorage trước
            let userId = localStorage.getItem('userId');

            // Nếu không có, thử lấy từ token JWT
            if (!userId) {
                userId = getUserIdFromToken();
            }

            // Nếu vẫn không có, báo lỗi
            if (!userId) {
                throw new Error("User ID not found");
            }

            // Chuyển đổi userId thành số
            const numericUserId = Number(userId);
            if (isNaN(numericUserId)) {
                throw new Error(`Invalid userId: ${userId}`);
            }

            console.log("Booking with user ID:", numericUserId);

            // Chuẩn bị dữ liệu đặt tour
            const requestData = {
                tourId: numericTourId,
                userId: numericUserId,
                tourDate: tourDate,
                adultCount: Number(adultCount) || 1,
                childCount: Number(childCount) || 0,
                adultPrice: adultPrice !== null ? Number(adultPrice) : null,
                childPrice: childPrice !== null ? Number(childPrice) : null,
                totalPrice: totalPrice !== null ? Number(totalPrice) : null,
                paymentMethod: paymentMethod || "creditCard",
                passengers: passengers || [
                    {
                        passengerName: contactInfo?.name || "Khách hàng",
                        passengerType: "adult"
                    }
                ],
                contactInfo: {
                    name: contactInfo?.name,
                    phone: contactInfo?.phone,
                    email: contactInfo?.email,
                    address: contactInfo?.address,
                    note: contactInfo?.note
                }
            };

            console.log("Booking request data:", JSON.stringify(requestData));
            console.log("Booking URL:", URL_BOOK);

            // Gọi API đặt tour
            return await axios.post(URL_BOOK, requestData);
        } catch (error) {
            console.error("Error in bookNowWithDetails:", error);
            throw error;
        }
    }

    // CRUD cho quản lý tour
    async getAllTours() {
        return await axios.get(`${URL_GET_TOUR_DETAILS}`);
    }

    async addTour(tourData) {
        return await axios.post(`${URL_GET_TOUR_DETAILS}`, tourData);
    }

    async updateTour(tourId, tourData) {
        return await axios.put(`${URL_GET_TOUR_DETAILS}/${tourId}`, tourData);
    }

    async deleteTour(tourId) {
        return await axios.delete(`${URL_GET_TOUR_DETAILS}/${tourId}`);
    }
}
