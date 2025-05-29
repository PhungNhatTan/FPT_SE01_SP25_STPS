import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../style/homepage.css";
import banner from "../../assets/banner.jpg";
import { tourData } from "./data/tourData";
import { blogsData } from "./data/blogsData";
import { locData } from "./data/locData";
import Header from "./header";
import { TourServices } from "../../services/TourSevices";
import TOUR_DEFAULT_IMAGE from "../../assets/images/tour_default.jpg";
import DESTINATION_DEFAULT_IMAGE from "../../assets/images/des_default.jpeg";
import { DesnitionService } from "../../services/DesnitionService";


const SearchBox = () => {
    return (
        <div className="search-box">
            <input className="search-input full-width" type="text" placeholder="Nhập điểm đến" />
            <div className="search-fields">
                <div className="search-item">
                    <span>📅</span>
                    <input type="date" />
                </div>
                <div className="search-item">
                    <span>📅</span>
                    <input type="date" />
                </div>
                <div className="search-item">
                    <span>👥</span>
                    <input type="text" value="5 người lớn, 1 trẻ em" />
                </div>
            </div>
            <button className="search-button">TÌM KIẾM</button>
        </div>
    );
};

const Homepage = () => {
    const navigate = useNavigate();

    const [listTourFeatured, setListTourFeatured] = useState([]);
    const [listDesnition, setListDesnition] = useState([]);
    const _tourService = new TourServices();
    const _desnitionService = new DesnitionService();

    useEffect(() => {
        const fetchTourData = async () => {
            try {
                const dataResponse = await _tourService.getTourFeatured();
                await setListTourFeatured(dataResponse.data.data);

                const desnitionDataResponse = await _desnitionService.findAll();
                await setListDesnition(desnitionDataResponse.data.data)

                console.log('listTourFeatured = ', dataResponse.data.data);
                console.log('listDes = ', desnitionDataResponse.data.data);

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
            <section className="background">
                <img src={banner} alt="Gotour Background" />
            </section>
            <br />

            {/* Danh sách Tour nổi bật */}
            {/* <section className="tours">
                <div className="list-header">
                    <h2 style={{ color: "black" }}>Danh sách Tour nổi bật</h2>
                    <button className="btn btn-primary" onClick={() => navigate("/tourlist")}>
                        Xem thêm
                    </button>
                </div>
                <div className="blog-list tour-list">
                    {tourData.slice(0, 12).map(tour => (
                        <div className="blog-item tour-item" key={tour.id}>
                            <Link to={`/tour/${tour.id}`}>
                                <img src={tour.image} alt={tour.name} />
                            </Link>
                            <h3 style={{ color: "black" }}>{tour.name}</h3>
                        </div>
                    ))}
                </div>
            </section> */}

            <section className="tours">
                <div className="list-header">
                    <h2 style={{ color: "black" }}>Danh sách Tour nổi bật</h2>
                    <button className="btn btn-primary" onClick={() => navigate("/tourlist")}>
                        Xem thêm
                    </button>
                </div>
                <div className="blog-list tour-list">
                    {listTourFeatured.map(tour => (
                        <div className="blog-item tour-item" key={tour.id}>
                            <Link to={`/tour/${tour.tourId}`}>
                                <img src={tour.primaryImageUrl ? tour.primaryImageUrl : TOUR_DEFAULT_IMAGE}
                                    alt={tour.tourName}
                                    onError={(e) => {

                                        e.target.onerror = null;
                                        e.target.src = TOUR_DEFAULT_IMAGE;
                                    }}
                                />
                            </Link>
                            <h3 style={{ color: "black" }}>{tour.tourName}</h3>
                        </div>
                    ))}
                </div>
            </section>

            {/* Địa điểm */}
            <section className="promo">
                <div className="list-header">
                    <h2 style={{ color: "black" }}>Danh sách Địa điểm du lịch</h2>
                    <button className="btn btn-primary" onClick={() => navigate("/locationlist")}>
                        Xem thêm
                    </button>
                </div>
                <div className="blog-list promo-list">
                    {/* {locData.slice(0, 10).map(location => (
                        <div className="blog-item" key={location.id}>
                            <Link to={`/location/${location.id}`}>
                                <img src={location.image} alt="Khuyến mãi" />
                            </Link>
                            <p style={{ color: "black" }}>{location.name}</p>
                        </div>
                    ))} */}


                    {listDesnition.slice(0, 10).map(location => (
                        <div className="blog-item" key={location.id}>
                            <Link to={`/location/${location.destinationId}`}>
                                {/* <img src={location.primaryImageUrl} alt="Khuyến mãi" /> */}
                                <img src={location.primaryImageUrl ? location.primaryImageUrl : DESTINATION_DEFAULT_IMAGE}
                                    alt={location.destinationName}
                                    onError={(e) => {

                                        e.target.onerror = null;
                                        e.target.src = TOUR_DEFAULT_IMAGE;
                                    }}
                                />
                            </Link>
                            <p style={{ color: "black" }}>{location.destinationName}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Blogs */}
            <section className="blogs">
                <div className="list-header">
                    <h2>Blogs</h2>
                    <button className="btn btn-primary" onClick={() => navigate("/bloglist")}>
                        Xem thêm
                    </button>
                </div>
                <div className="blog-list">
                    {blogsData.slice(0, 10).map(blog => (
                        <div className="blog-item" key={blog.id}>
                            <Link to={`/blog/${blog.id}`}>
                                <img src={blog.image} alt={blog.title} />
                            </Link>
                            <h3 style={{ color: "black" }}>{blog.title}</h3>
                            <p style={{ color: "black" }}>
                                {blog.description?.substring(0, 50) || "No description available..."}...
                            </p>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default Homepage;
