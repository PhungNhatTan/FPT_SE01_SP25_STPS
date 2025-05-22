import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../style/new-homepage.css';
import { FaMapMarkerAlt, FaCalendarAlt, FaUsers, FaSearch, FaArrowRight, FaShieldAlt, FaCreditCard, FaHeadset, FaGlobe } from 'react-icons/fa';

// Import sample images
import heroImage from '../assets/hero-image.jpg';
import tourImage1 from '../assets/tour1.jpg';
import tourImage2 from '../assets/tour2.jpg';
import tourImage3 from '../assets/tour3.jpg';
import destImage1 from '../assets/dest1.jpg';
import destImage2 from '../assets/dest2.jpg';
import destImage3 from '../assets/dest3.jpg';
import destImage4 from '../assets/dest4.jpg';
import logoImage from '../assets/logo.png';

const NewHomePage = () => {
  const [activeTab, setActiveTab] = useState('tours');
  const [tours, setTours] = useState([]);
  const [destinations, setDestinations] = useState([]);

  useEffect(() => {
    // Simulated data - in a real app, this would be fetched from an API
    setTours([
      {
        id: 1,
        title: 'Tour Hà Nội',
        description: 'Khám phá vẻ đẹp của Hà Nội với tour trọn gói. Tham quan các địa điểm nổi tiếng như Hồ Gươm, Văn Miếu, Hoàng Thành Thăng Long.',
        price: 4990000,
        image: tourImage1,
        location: 'Hà Nội, Việt Nam',
        duration: '3 ngày 2 đêm',
        rating: 4.8
      },
      {
        id: 2,
        title: 'Tour Đà Nẵng - Hội An',
        description: 'Trải nghiệm vẻ đẹp của miền Trung với tour Đà Nẵng - Hội An. Tham quan Bà Nà Hills, Phố cổ Hội An, Cù Lao Chàm.',
        price: 5990000,
        image: tourImage2,
        location: 'Đà Nẵng, Việt Nam',
        duration: '4 ngày 3 đêm',
        rating: 4.9
      },
      {
        id: 3,
        title: 'Tour Phú Quốc',
        description: 'Nghỉ dưỡng tại đảo ngọc Phú Quốc. Tham quan Vinpearl Safari, Vinwonders, Bãi Sao, Hòn Thơm, Grand World.',
        price: 6990000,
        image: tourImage3,
        location: 'Phú Quốc, Việt Nam',
        duration: '4 ngày 3 đêm',
        rating: 4.7
      }
    ]);

    setDestinations([
      {
        id: 1,
        name: 'Hà Nội',
        country: 'Việt Nam',
        image: destImage1
      },
      {
        id: 2,
        name: 'Đà Nẵng',
        country: 'Việt Nam',
        image: destImage2
      },
      {
        id: 3,
        name: 'Phú Quốc',
        country: 'Việt Nam',
        image: destImage3
      },
      {
        id: 4,
        name: 'Nha Trang',
        country: 'Việt Nam',
        image: destImage4
      }
    ]);
  }, []);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN').format(price) + ' VND';
  };

  return (
    <div className="new-homepage">
      {/* Header */}
      <header className="site-header">
        <div className="container header-container">
          <Link to="/" className="logo">
            <img src={logoImage} alt="GoTour Logo" />
            <span className="logo-text">GOTOUR</span>
          </Link>
          
          <nav className="nav-menu">
            <Link to="/" className="nav-link active">Trang chủ</Link>
            <Link to="/tours" className="nav-link">Tour du lịch</Link>
            <Link to="/destinations" className="nav-link">Điểm đến</Link>
            <Link to="/about" className="nav-link">Về chúng tôi</Link>
            <Link to="/contact" className="nav-link">Liên hệ</Link>
          </nav>
          
          <div className="auth-buttons">
            <Link to="/register" className="btn btn-outline-primary">Đăng ký</Link>
            <Link to="/login" className="btn btn-primary">Đăng nhập</Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero-section">
        <img src={heroImage} alt="Hero" className="hero-image" />
        <div className="hero-overlay">
          <h1 className="hero-title">Khám phá những điểm đến tuyệt vời</h1>
          <p className="hero-subtitle">Trải nghiệm những chuyến đi đáng nhớ với dịch vụ tour du lịch chất lượng cao của chúng tôi</p>
        </div>
      </section>

      {/* Search Box */}
      <div className="container">
        <div className="search-box">
          <div className="search-tabs">
            <div 
              className={`search-tab ${activeTab === 'tours' ? 'active' : ''}`}
              onClick={() => setActiveTab('tours')}
            >
              Tour du lịch
            </div>
            <div 
              className={`search-tab ${activeTab === 'hotels' ? 'active' : ''}`}
              onClick={() => setActiveTab('hotels')}
            >
              Khách sạn
            </div>
            <div 
              className={`search-tab ${activeTab === 'flights' ? 'active' : ''}`}
              onClick={() => setActiveTab('flights')}
            >
              Vé máy bay
            </div>
          </div>
          
          <form className="search-form">
            <div className="search-row">
              <div className="form-group">
                <label className="form-label">Điểm đến</label>
                <div className="form-control">
                  <FaMapMarkerAlt /> Bạn muốn đi đâu?
                </div>
              </div>
              
              <div className="form-group">
                <label className="form-label">Ngày đi</label>
                <div className="form-control">
                  <FaCalendarAlt /> mm/dd/yyyy
                </div>
              </div>
              
              <div className="form-group">
                <label className="form-label">Ngày về</label>
                <div className="form-control">
                  <FaCalendarAlt /> mm/dd/yyyy
                </div>
              </div>
            </div>
            
            <div className="search-row">
              <div className="form-group">
                <label className="form-label">Số người</label>
                <div className="form-control">
                  <FaUsers /> 2 người lớn, 1 trẻ em
                </div>
              </div>
            </div>
            
            <button type="button" className="btn btn-primary search-button">
              <FaSearch /> TÌM KIẾM
            </button>
          </form>
        </div>
      </div>

      {/* Popular Tours Section */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Tour nổi bật</h2>
            <Link to="/tours" className="view-all">
              Xem tất cả <FaArrowRight />
            </Link>
          </div>
          
          <div className="card-grid">
            {tours.map(tour => (
              <div className="card" key={tour.id}>
                <img src={tour.image} alt={tour.title} className="card-img-top" />
                <div className="card-body">
                  <h3 className="card-title">{tour.title}</h3>
                  <p className="card-text">{tour.description}</p>
                  <div className="tour-details">
                    <div className="tour-location">
                      <FaMapMarkerAlt /> {tour.location}
                    </div>
                    <div className="tour-duration">
                      <FaCalendarAlt /> {tour.duration}
                    </div>
                  </div>
                </div>
                <div className="card-footer">
                  <div className="card-price">{formatPrice(tour.price)}</div>
                  <Link to={`/tour/${tour.id}`} className="btn btn-primary btn-sm">
                    Chi tiết
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Destinations */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Điểm đến phổ biến</h2>
            <Link to="/destinations" className="view-all">
              Xem tất cả <FaArrowRight />
            </Link>
          </div>
          
          <div className="card-grid">
            {destinations.map(destination => (
              <div className="destination-card" key={destination.id}>
                <img src={destination.image} alt={destination.name} className="destination-img" />
                <div className="destination-overlay">
                  <h3 className="destination-title">{destination.name}</h3>
                  <div className="destination-location">
                    <FaMapMarkerAlt /> {destination.country}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Tại sao chọn chúng tôi</h2>
          </div>
          
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">
                <FaShieldAlt />
              </div>
              <h3 className="feature-title">Đảm bảo an toàn</h3>
              <p className="feature-text">Chúng tôi đặt sự an toàn của khách hàng lên hàng đầu với các dịch vụ đạt chuẩn quốc tế.</p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">
                <FaCreditCard />
              </div>
              <h3 className="feature-title">Thanh toán linh hoạt</h3>
              <p className="feature-text">Nhiều phương thức thanh toán an toàn và bảo mật cho khách hàng.</p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">
                <FaHeadset />
              </div>
              <h3 className="feature-title">Hỗ trợ 24/7</h3>
              <p className="feature-text">Đội ngũ hỗ trợ chuyên nghiệp luôn sẵn sàng giúp đỡ bạn mọi lúc mọi nơi.</p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">
                <FaGlobe />
              </div>
              <h3 className="feature-title">Đa dạng điểm đến</h3>
              <p className="feature-text">Hàng nghìn tour du lịch hấp dẫn trong nước và quốc tế đang chờ đón bạn.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-grid">
            <div className="footer-column">
              <h3>Về GOTOUR</h3>
              <ul className="footer-links">
                <li><Link to="/about">Giới thiệu</Link></li>
                <li><Link to="/terms">Điều khoản sử dụng</Link></li>
                <li><Link to="/privacy">Chính sách bảo mật</Link></li>
                <li><Link to="/careers">Cơ hội việc làm</Link></li>
              </ul>
            </div>
            
            <div className="footer-column">
              <h3>Hỗ trợ</h3>
              <ul className="footer-links">
                <li><Link to="/faq">Câu hỏi thường gặp</Link></li>
                <li><Link to="/contact">Liên hệ</Link></li>
                <li><Link to="/feedback">Góp ý</Link></li>
                <li><Link to="/sitemap">Sơ đồ trang</Link></li>
              </ul>
            </div>
            
            <div className="footer-column">
              <h3>Thanh toán</h3>
              <ul className="footer-links">
                <li><Link to="/payment-methods">Phương thức thanh toán</Link></li>
                <li><Link to="/refund-policy">Chính sách hoàn tiền</Link></li>
                <li><Link to="/vouchers">Sử dụng voucher</Link></li>
              </ul>
            </div>
            
            <div className="footer-column">
              <h3>Theo dõi chúng tôi</h3>
              <ul className="footer-links">
                <li><a href="https://facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a></li>
                <li><a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a></li>
                <li><a href="https://youtube.com" target="_blank" rel="noopener noreferrer">YouTube</a></li>
                <li><a href="https://tiktok.com" target="_blank" rel="noopener noreferrer">TikTok</a></li>
              </ul>
            </div>
          </div>
          
          <div className="footer-bottom">
            <p>&copy; {new Date().getFullYear()} GOTOUR. Tất cả các quyền được bảo lưu.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default NewHomePage;
