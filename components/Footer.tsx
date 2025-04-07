import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

export const Footer = () => {
  return (
    <footer className="text-white py-5" style={{ backgroundColor: '#30302E' }}>
      <div className="container">
        <div className="row">
          {/* Logo and Description */}
          <div className="col-lg-4 mb-4 mb-lg-0">
            <h3 className="mb-3">Tada</h3>
            <p className="opacity-75">
              Khám phá những căn villa sang trọng và yên bình cho kỳ nghỉ của bạn. 
              Chúng tôi cung cấp những không gian nghỉ dưỡng đẳng cấp với dịch vụ chất lượng nhất.
            </p>
            <div className="mt-4">
              <a href="#" className="text-white me-3 fs-5"><i className="bi bi-facebook"></i></a>
              <a href="#" className="text-white me-3 fs-5"><i className="bi bi-instagram"></i></a>
              <a href="#" className="text-white me-3 fs-5"><i className="bi bi-twitter-x"></i></a>
              <a href="#" className="text-white me-3 fs-5"><i className="bi bi-youtube"></i></a>
            </div>
          </div>

          <div className="col-lg-2 col-md-4 mb-4 mb-md-0">
            <h5 className="mb-3 border-bottom border-secondary pb-2">Liên kết nhanh</h5>
            <ul className="list-unstyled">
              <li className="mb-2"><a href="#" className="text-white text-decoration-none opacity-75 hover-opacity-100">Trang chủ</a></li>
              <li className="mb-2"><a href="#" className="text-white text-decoration-none opacity-75 hover-opacity-100">Danh sách Villa</a></li>
              <li className="mb-2"><a href="#" className="text-white text-decoration-none opacity-75 hover-opacity-100">Đặt phòng</a></li>
              <li className="mb-2"><a href="#" className="text-white text-decoration-none opacity-75 hover-opacity-100">Khuyến mãi</a></li>
              <li className="mb-2"><a href="#" className="text-white text-decoration-none opacity-75 hover-opacity-100">Liên hệ</a></li>
            </ul>
          </div>

          {/* Villas */}
          <div className="col-lg-2 col-md-4 mb-4 mb-md-0">
            <h5 className="mb-3 border-bottom border-secondary pb-2">Villa phổ biến</h5>
            <ul className="list-unstyled">
              <li className="mb-2"><a href="#" className="text-white text-decoration-none opacity-75 hover-opacity-100">Tấn Sang Villa</a></li>
              <li className="mb-2"><a href="#" className="text-white text-decoration-none opacity-75 hover-opacity-100">Vũng Tàu Paradise</a></li>
              <li className="mb-2"><a href="#" className="text-white text-decoration-none opacity-75 hover-opacity-100">Phú Quốc Resort</a></li>
              <li className="mb-2"><a href="#" className="text-white text-decoration-none opacity-75 hover-opacity-100">Đà Lạt Green Villa</a></li>
              <li className="mb-2"><a href="#" className="text-white text-decoration-none opacity-75 hover-opacity-100">Nha Trang Beachfront</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="col-lg-4 col-md-4">
            <h5 className="mb-3 border-bottom border-secondary pb-2">Liên hệ</h5>
            <ul className="list-unstyled">
              <li className="mb-2">
                <i className="bi bi-geo-alt me-2"></i>
                <span className="opacity-75">123 Nguyễn Huệ, Quận 1, TP.HCM</span>
              </li>
              <li className="mb-2">
                <i className="bi bi-telephone me-2"></i>
                <span className="opacity-75">(028) 3822 9999</span>
              </li>
              <li className="mb-2">
                <i className="bi bi-envelope me-2"></i>
                <span className="opacity-75">info@villasparadise.vn</span>
              </li>
              <li className="mb-2">
                <i className="bi bi-clock me-2"></i>
                <span className="opacity-75">8:00 - 20:00, Thứ Hai - Chủ Nhật</span>
              </li>
            </ul>
          </div>
        </div>

        <hr className="my-4 opacity-25" />

        <div className="row align-items-center">
          <div className="col-md-6 text-center text-md-start mb-3 mb-md-0">
            <div className="opacity-75">&copy; 2025 Tứ Đại Thiên Vương. Tất cả quyền được bảo lưu.</div>
          </div>
          <div className="col-md-6 text-center text-md-end">
            <ul className="list-inline mb-0">
              <li className="list-inline-item">
                <a href="#" className="text-white text-decoration-none opacity-75 small">Điều khoản dịch vụ</a>
              </li>
              <li className="list-inline-item ms-3">
                <a href="#" className="text-white text-decoration-none opacity-75 small">Chính sách bảo mật</a>
              </li>
              <li className="list-inline-item ms-3">
                <a href="#" className="text-white text-decoration-none opacity-75 small">Chính sách đặt phòng</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;