import danang from "../../../assets/danang.jpg";
import nhatrang from "../../../assets/nhatrang.jpg";
import phuquoc from "../../../assets/phuquoc.jpg";

const tourHistoryData = [
    {
        id: 1,
        name: "Tour Đà Nẵng - Hội An",
        image: danang,
        locations: ["Đà Nẵng", "Hội An", "Bà Nà Hills"],
        startDate: "2024-04-10",
        endDate: "2024-04-12",
        adults: 2,
        children: 1,
        adultPrice: 1500000,
        childPrice: 800000,
        totalPrice: 3800000,
        feedback: [],
    },
    {
        id: 2,
        name: "Tour Nha Trang - Vinpearl",
        image: nhatrang, // Import hình ảnh khác
        locations: ["Nha Trang", "Vinpearl"],
        startDate: "2024-05-05",
        endDate: "2024-05-07",
        adults: 2,
        children: 2,
        adultPrice: 2000000,
        childPrice: 1000000,
        totalPrice: 6000000,
        feedback: [],
    },
    {
        id: 3,
        name: "Tour Phú Quốc - Bãi Sao",
        image: phuquoc, // Import hình ảnh khác
        locations: ["Phú Quốc", "Bãi Sao"],
        startDate: "2024-06-15",
        endDate: "2024-06-17",
        adults: 3,
        children: 2,
        adultPrice: 1800000,
        childPrice: 900000,
        totalPrice: 7200000,
        feedback: [],
    },
    // Thêm các tour khác nếu cần
];

export default tourHistoryData;
