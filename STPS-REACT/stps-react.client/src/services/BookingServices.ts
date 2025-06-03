import axios from "axios";
import { UTIL_VARIABLE } from "../utils/UtilVariable";

const BASE_URL = UTIL_VARIABLE.REACT_BASE_URL;
const URL_GET_BOOKING_DETAILS = BASE_URL + `/Booking`;
const URL_CANCEL_BOOKING = BASE_URL + `/Booking/cancel`;
const URL_GET_COMPANY_BOOKINGS = BASE_URL + `/Booking/company-bookings`;

export class BookingServices {
    async getBookingDetails(bookingId: number) {
        try {
            if (!bookingId) {
                throw new Error("Booking ID is required");
            }

            const numericBookingId = Number(bookingId);
            if (isNaN(numericBookingId)) {
                throw new Error(`Invalid booking ID: ${bookingId}`);
            }

            console.log("Fetching booking details for ID:", numericBookingId);
            return await axios.get(`${URL_GET_BOOKING_DETAILS}/${numericBookingId}`);
        } catch (error) {
            console.error("Error in getBookingDetails:", error);
            throw error;
        }
    }

    async cancelBooking(bookingId: number, refundRequest) {
        try {
            if (!bookingId) {
                throw new Error("Booking ID is required");
            }

            const numericBookingId = Number(bookingId);
            if (isNaN(numericBookingId)) {
                throw new Error(`Invalid booking ID: ${bookingId}`);
            }

            console.log("Cancelling booking with ID:", numericBookingId);
            return await axios.post(`${URL_CANCEL_BOOKING}/${numericBookingId}`, refundRequest);
        } catch (error) {
            console.error("Error in cancelBooking:", error);
            throw error;
        }
    }

    async getCompanyBookings(companyId: number) {
        try {
            return await axios.get(`${URL_GET_COMPANY_BOOKINGS}/${companyId}`);
        } catch (error) {
            console.error("Error in getCompanyBookings:", error);
            throw error;
        }
    }
    async  getCompanyPaymentDetails(transactionId: number) {
        try {
            const response = await axios.get(`${BASE_URL}/TourismCompanies/payment-details/${transactionId}`);
            return response;
        } catch (error) {
            throw error;
        }
    }
}