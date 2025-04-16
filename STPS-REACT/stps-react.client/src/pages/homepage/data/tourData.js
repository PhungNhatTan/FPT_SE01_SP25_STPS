import hanoi from "../../../assets/hanoi.jpg";
import hue from "../../../assets/Hue.jpg";
import danang from "../../../assets/danang.jpg";
import nhatrang from "../../../assets/nhatrang.jpg";
import hcm from "../../../assets/hcm.jpg";
import sapa from "../../../assets/sapa.jpg";
import dalat from "../../../assets/dalat.jpg";
import phuquoc from "../../../assets/phuquoc.jpg";
import hoian from "../../../assets/hoian.jpg";
import vungtau from "../../../assets/vungtau.jpg";
import cantho from "../../../assets/cantho.jpg";
import halong from "../../../assets/halong.jpg";
import quynhon from "../../../assets/quynhon.jpg";
import mocchau from "../../../assets/mocchau.jpg";
import tamdao from "../../../assets/tamdao.jpg";
import baria from "../../../assets/baria.jpg";
import buonmathuot from "../../../assets/buonmathuot.jpg";
import bentre from "../../../assets/bentre.jpg";
import travinh from "../../../assets/travinh.jpg";
import kontum from "../../../assets/kontum.jpg";

export const tourData = [
    { id: 1, name: "Tour Hà Nội", location: "Hà Nội", region: "Miền Bắc", type: "Đồng bằng", priceald: "4.990.000", pricechil: "4.990.000", duration: "3 Ngày 2 Đêm", vehicle: "Xe du lịch", highlights: ["Lăng Bác", "Cột cờ Hà Nội", "Hồ Gươm"], image: hanoi },
    { id: 2, name: "Tour Đà Nẵng", location: "Đà Nẵng", region: "Miền Trung", type: "Biển", priceald: "4.990.000", pricechil: "4.990.000", duration: "4 Ngày 3 Đêm", vehicle: "Máy bay", highlights: ["Bà Nà Hills", "Cầu Vàng", "Biển Mỹ Khê"], image: danang },
    { id: 3, name: "Tour Huế", location: "Huế", region: "Miền Trung", type: "Đồng bằng", priceald: "4.500.000", pricechil: "3.500.000", duration: "3 Ngày 2 Đêm", vehicle: "Xe du lịch", highlights: ["Đại Nội", "Lăng Tự Đức", "Chùa Thiên Mụ"], image: hue },
    { id: 4, name: "Tour Nha Trang", location: "Nha Trang", region: "Miền Trung", type: "Biển", priceald: "5.500.000", pricechil: "4.500.000", duration: "3 Ngày 2 Đêm", vehicle: "Máy bay", highlights: ["Vinpearl Land", "Hòn Mun", "Chợ Đầm"], image: nhatrang },
    { id: 5, name: "Tour Hồ Chí Minh", location: "Hồ Chí Minh", region: "Miền Nam", type: "Đồng bằng", priceald: "5.500.000", pricechil: "4.500.000", duration: "3 Ngày 2 Đêm", vehicle: "Xe du lịch", highlights: ["Dinh Độc Lập", "Chợ Bến Thành", "Nhà thờ Đức Bà"], image: hcm },
    { id: 6, name: "Tour Sapa", location: "Sapa", region: "Miền Bắc", type: "Núi", priceald: "6.000.000", pricechil: "4.800.000", duration: "4 Ngày 3 Đêm", vehicle: "Xe khách", highlights: ["Lào Cai", "Núi Fansipan", "Thung lũng Mường Hoa"], image: sapa },
    { id: 7, name: "Tour Đà Lạt", location: "Đà Lạt", region: "Miền Trung", type: "Núi", priceald: "5.000.000", pricechil: "4.000.000", duration: "3 Ngày 2 Đêm", vehicle: "Xe du lịch", highlights: ["Hồ Xuân Hương", "Thung lũng Tình Yêu", "Đồi Chè Cầu Đất"], image: dalat },
    { id: 8, name: "Tour Phú Quốc", location: "Phú Quốc", region: "Miền Nam", type: "Biển", priceald: "7.000.000", pricechil: "5.000.000", duration: "4 Ngày 3 Đêm", vehicle: "Máy bay", highlights: ["Vinpearl Safari", "Bãi Sao", "Chợ Dương Đông"], image: phuquoc },
    { id: 9, name: "Tour Hội An", location: "Hội An", region: "Miền Trung", type: "Biển", priceald: "4.800.000", pricechil: "3.800.000", duration: "3 Ngày 2 Đêm", vehicle: "Xe du lịch", highlights: ["Phố cổ Hội An", "Chùa Cầu", "Bãi biển An Bàng"], image: hoian },
    { id: 10, name: "Tour Vũng Tàu", location: "Vũng Tàu", region: "Miền Nam", type: "Biển", priceald: "4.000.000", pricechil: "3.000.000", duration: "2 Ngày 1 Đêm", vehicle: "Xe du lịch", highlights: ["Tượng Chúa Kito", "Bãi Sau", "Ngọn Hải Đăng"], image: vungtau },
    { id: 11, name: "Tour Cần Thơ", location: "Cần Thơ", region: "Miền Nam", type: "Sông", priceald: "4.500.000", pricechil: "3.500.000", duration: "3 Ngày 2 Đêm", vehicle: "Xe du lịch", highlights: ["Chợ nổi Cái Răng", "Bến Ninh Kiều", "Vườn trái cây"], image: cantho },
    { id: 12, name: "Tour Hạ Long", location: "Hạ Long", region: "Miền Bắc", type: "Biển", priceald: "7.500.000", pricechil: "5.000.000", duration: "3 Ngày 2 Đêm", vehicle: "Xe du lịch", highlights: ["Vịnh Hạ Long", "Đảo Ti Tốp", "Hang Sửng Sốt"], image: halong },
    { id: 13, name: "Tour Quy Nhơn", location: "Quy Nhơn", region: "Miền Trung", type: "Biển", priceald: "5.500.000", pricechil: "4.200.000", duration: "3 Ngày 2 Đêm", vehicle: "Máy bay", highlights: ["Eo Gió", "Kỳ Co", "Hòn Khô"], image: quynhon },
    { id: 14, name: "Tour Mộc Châu", location: "Mộc Châu", region: "Miền Bắc", type: "Núi", priceald: "4.200.000", pricechil: "3.200.000", duration: "2 Ngày 1 Đêm", vehicle: "Xe khách", highlights: ["Thảo nguyên Mộc Châu", "Rừng thông bản Áng", "Hoa cải Mộc Châu"], image: mocchau },
    { id: 15, name: "Tour Tam Đảo", location: "Tam Đảo", region: "Miền Bắc", type: "Núi", priceald: "4.500.000", pricechil: "3.800.000", duration: "2 Ngày 1 Đêm", vehicle: "Xe du lịch", highlights: ["Thác Bạc", "Tượng Phật Tam Đảo", "Chùa Tây Thiên"], image: tamdao },
    { id: 16, name: "Tour Bà Rịa", location: "Bà Rịa", region: "Miền Nam", type: "Biển", priceald: "5.000.000", pricechil: "4.000.000", duration: "2 Ngày 1 Đêm", vehicle: "Xe du lịch", highlights: ["Biển Long Hải", "Tượng Chúa Kito", "Công viên Suối Mơ"], image: baria },
    { id: 17, name: "Tour Buôn Ma Thuột", location: "Buôn Ma Thuột", region: "Miền Trung", type: "Núi", priceald: "5.500.000", pricechil: "4.500.000", duration: "3 Ngày 2 Đêm", vehicle: "Xe khách", highlights: ["Thác Dray Sap", "Làng cà phê Buôn Ma Thuột", "Hồ Lak"], image: buonmathuot },
    { id: 18, name: "Tour Bến Tre", location: "Bến Tre", region: "Miền Nam", type: "Sông", priceald: "4.000.000", pricechil: "3.000.000", duration: "2 Ngày 1 Đêm", vehicle: "Xe du lịch", highlights: ["Vườn dừa Bến Tre", "Chợ Dừa", "Làng nghề truyền thống"], image: bentre },
    { id: 19, name: "Tour Trà Vinh", location: "Trà Vinh", region: "Miền Nam", type: "Sông", priceald: "4.500.000", pricechil: "3.500.000", duration: "3 Ngày 2 Đêm", vehicle: "Xe du lịch", highlights: ["Chùa Hang", "Chợ Nổi Trà Vinh", "Vườn trái cây"], image: travinh },
    { id: 20, name: "Tour Kon Tum", location: "Kon Tum", region: "Miền Trung", type: "Núi", priceald: "5.000.000", pricechil: "4.000.000", duration: "3 Ngày 2 Đêm", vehicle: "Xe du lịch", highlights: ["Thác K50", "Chùa Bác Ái", "Làng Kon Klor"], image: kontum },
];

export default tourData;
