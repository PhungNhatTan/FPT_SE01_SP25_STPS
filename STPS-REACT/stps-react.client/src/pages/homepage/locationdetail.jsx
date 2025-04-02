import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../../style/blogdetail.css"; 
import Header from "./header";
import bana from "../../assets/banahills.jpg";

const locData = [
    {
        id: "1",
        title: "Bà Nà Hills – Thiên Đường Châu Âu Giữa Lòng Đà Nẵng",
        image: bana,
        content: "Bà Nà Hills là một trong những điểm du lịch nổi tiếng nhất tại Đà Nẵng, được mệnh danh là “chốn bồng lai tiên cảnh” nhờ khí hậu mát mẻ quanh năm và khung cảnh thiên nhiên tuyệt đẹp. Nằm trên đỉnh núi Chúa, cách trung tâm thành phố khoảng 25 km, Bà Nà Hills thu hút du khách bởi hệ thống cáp treo hiện đại, công trình kiến trúc ấn tượng và những trải nghiệm giải trí đẳng cấp.",
    },
    {
        id: "2",
        title: "Bà Nà Hills – Thiên Đường Châu Âu Giữa Lòng Đà Nẵng",
        image: bana,
        content: "Bà Nà Hills là một trong những điểm du lịch nổi tiếng nhất tại Đà Nẵng, được mệnh danh là “chốn bồng lai tiên cảnh” nhờ khí hậu mát mẻ quanh năm và khung cảnh thiên nhiên tuyệt đẹp. Nằm trên đỉnh núi Chúa, cách trung tâm thành phố khoảng 25 km, Bà Nà Hills thu hút du khách bởi hệ thống cáp treo hiện đại, công trình kiến trúc ấn tượng và những trải nghiệm giải trí đẳng cấp.",
    },
    {
        id: "3",
        title: "Bà Nà Hills – Thiên Đường Châu Âu Giữa Lòng Đà Nẵng",
        image: bana,
        content: "Bà Nà Hills là một trong những điểm du lịch nổi tiếng nhất tại Đà Nẵng, được mệnh danh là “chốn bồng lai tiên cảnh” nhờ khí hậu mát mẻ quanh năm và khung cảnh thiên nhiên tuyệt đẹp. Nằm trên đỉnh núi Chúa, cách trung tâm thành phố khoảng 25 km, Bà Nà Hills thu hút du khách bởi hệ thống cáp treo hiện đại, công trình kiến trúc ấn tượng và những trải nghiệm giải trí đẳng cấp.",
    },
    {
        id: "4",
        title: "Bà Nà Hills – Thiên Đường Châu Âu Giữa Lòng Đà Nẵng",
        image: bana,
        content: "Bà Nà Hills là một trong những điểm du lịch nổi tiếng nhất tại Đà Nẵng, được mệnh danh là “chốn bồng lai tiên cảnh” nhờ khí hậu mát mẻ quanh năm và khung cảnh thiên nhiên tuyệt đẹp. Nằm trên đỉnh núi Chúa, cách trung tâm thành phố khoảng 25 km, Bà Nà Hills thu hút du khách bởi hệ thống cáp treo hiện đại, công trình kiến trúc ấn tượng và những trải nghiệm giải trí đẳng cấp.",
    },
    {
        id: "5",
        title: "Bà Nà Hills – Thiên Đường Châu Âu Giữa Lòng Đà Nẵng",
        image: bana,
        content: "Bà Nà Hills là một trong những điểm du lịch nổi tiếng nhất tại Đà Nẵng, được mệnh danh là “chốn bồng lai tiên cảnh” nhờ khí hậu mát mẻ quanh năm và khung cảnh thiên nhiên tuyệt đẹp. Nằm trên đỉnh núi Chúa, cách trung tâm thành phố khoảng 25 km, Bà Nà Hills thu hút du khách bởi hệ thống cáp treo hiện đại, công trình kiến trúc ấn tượng và những trải nghiệm giải trí đẳng cấp.",
    }
];

const LocationDetail = () => {
    const { locId } = useParams();
    const navigate = useNavigate();

    const location = locData.find((item) => item.id === locId);

    if (!location) {
        return (
            <div className="container">
                <header className="header">
                    <Header />
                </header>
                <h2 className="error-message">🚫 Địa điểm không tồn tại!</h2>
                <button className="back-btn" onClick={() => navigate("/")}>🏠 Về trang chủ</button>
            </div>
        );
    }

    return (
        <div>
            <header className="header">
                <Header />
            </header>

            <h1 className="blog-title"><strong>{location.title}</strong></h1>
            <img src={location.image} alt={location.title} className="blog-image" />
            <p className="blog-content">{location.content}</p>
            <h2 className="related-title"><strong>Các địa điểm khác</strong></h2>
            <div className="related-blogs">
                {locData.slice(0, 4).map((item) => (
                    <div key={item.id} className="related-item" onClick={() => navigate(`/location/${item.id}`)}>
                        <img src={item.image} alt={item.title} className="related-image" />
                        <h3 className="related-title">{item.title}</h3>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default LocationDetail;