import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../../style/blogdetail.css";
import Header from "./header";
import { locData } from "./data/locData"; // import dữ liệu địa điểm
import { DesnitionService } from "../../services/DesnitionService";
import { CityService } from "../../services/CityService";
import DESTINATION_DEFAULT_IMAGE from "../../assets/images/des_default.jpeg";


const LocationDetail = () => {
    const { locId } = useParams();  // Lấy locId từ URL (chuỗi)
    const navigate = useNavigate();

    // Chuyển locId thành chuỗi và so sánh với item.id trong locData (cũng là chuỗi)
    const location = locData.find((item) => item.id === locId);  // So sánh với locId là chuỗi

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


    //-----fetch_data
    const [desDetails, setDesDetails] = useState();
    const _desService = new DesnitionService();

    const [cityAll, setCityAll] = useState([]);
    const _cityService = new CityService();

    useEffect(() => {
        const fetchTourData = async () => {
            try {
                const dataResponse = await _desService.getById(locId);
                await setDesDetails(dataResponse.data.data);

                const cityResponse = await _desService.findAll(locId);
                await setCityAll(cityResponse.data.data);


                console.log('tourDetails = ', dataResponse.data.data);

            } catch (error) {
                console.error("Lỗi khi fetch tour nổi bật:", error);
            }
        };

        fetchTourData();
    }, []);


    return (
        <div>
            <header className="header">
                <Header />
            </header>

            <h1 className="blog-title"><strong>{desDetails?.destinationName}</strong></h1>
            <img src={location.image} alt={location.name} className="blog-image" />
            <p className="blog-content">{desDetails?.description}</p>
            <h2 className="related-title"><strong>Các địa điểm khác</strong></h2>
            <div className="related-blogs">
                {/* {locData.slice(0, 8).map((item) => (
                    <div key={item.id} className="related-item" onClick={() => navigate(`/location/${item.id}`)}>
                        <img src={item.image} alt={item.name} className="related-image" />
                        <h3 className="related-title">{item.name}</h3>
                    </div>
                ))} */}

                {cityAll.map((item) => (
                    <div key={item.destinationId} className="related-item" onClick={() => navigate(`/location/${item.destinationId}`)}>
                        <img src={item.primaryImageUrl ? item.primaryImageUrl : DESTINATION_DEFAULT_IMAGE}
                            alt={item.cityName}
                            className="related-image"
                            onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = DESTINATION_DEFAULT_IMAGE;
                            }}
                        />
                        <h3 className="related-title">{item.cityName}</h3>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default LocationDetail;
