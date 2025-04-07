// pages/villa-description.js
'use client'
import { useEffect, useState } from 'react';
import Head from 'next/head';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import '../public/css/villadescription.css';

import Payment from './VillaPayment';

export default function VillaDescription({ villa }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  
  const images = [
    '/images/villa-test.jpg',
    '/images/villa-test.jpg',
    '/images/villa-test.jpg',
    '/images/villa-test.jpg',
    '/images/villa-test.jpg',
    '/images/villa-test.jpg',
    '/images/villa-test.jpg',
    '/images/villa-test.jpg',
  ];

  console.log('id: ', villa)


  const handlePrevious = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handleThumbnailClick = (index) => {
    setCurrentImageIndex(index);
  };

  // Hàm mở modal đặt phòng
  const openPaymentModal = () => {
    setShowPaymentModal(true);
    // Thêm class để ngăn cuộn trang khi modal mở
    document.body.classList.add('modal-open');
  };

  // Hàm đóng modal đặt phòng
  const closePaymentModal = () => {
    setShowPaymentModal(false);
    // Loại bỏ class khi đóng modal
    document.body.classList.remove('modal-open');
  };


  return (
    <div className="container px-0">
      <Head>
        <title>{villa?.name}</title>
        <meta name="description" content={villa?.description} />
      </Head>

      {/* Header */}
      <div className="header d-flex justify-content-between align-items-center px-4 py-3">
        <div>
          <div className="rating">
            <i className="bi bi-star-fill text-warning"></i>
            <i className="bi bi-star-fill text-warning"></i>
            <i className="bi bi-star-fill text-warning"></i>
            <i className="bi bi-star-fill text-warning"></i>
            <i className="bi bi-hand-thumbs-up-fill text-warning"></i>
          </div>
          <h1 className="mt-2">{villa?.name}</h1>
          <p className="address">
            <i className="bi bi-geo-alt-fill text-primary"></i>
            120 To Hien Thanh Street, Ward 3, Đà Lạt, Việt Nam
            <a href="#" className="map-link ms-2">Vị trí xuất sắc - hiển thị bản đồ</a>
          </p>
        </div>
        <div className="d-flex">
          <button className="btn btn-outline-primary me-2">
            <i className="bi bi-heart"></i>
          </button>
          <button className="btn btn-outline-primary me-2">
            <i className="bi bi-share"></i>
          </button>
          {/* Thêm onClick event cho nút Đặt ngay */}
          <button className="btn btn-primary" onClick={openPaymentModal}>Đặt ngay</button>
        </div>
      </div>

      {/* Main Image Gallery */}
      <div className="image-gallery-container">
        <div className="main-image-container">
          <img 
            src={images[currentImageIndex]} 
            alt={`Villa view ${currentImageIndex + 1}`} 
            className="main-image"
          />
          <button className="gallery-nav prev-btn" onClick={handlePrevious}>
            <i className="bi bi-chevron-left"></i>
          </button>
          <button className="gallery-nav next-btn" onClick={handleNext}>
            <i className="bi bi-chevron-right"></i>
          </button>
        </div>

        {/* Thumbnails */}
        <div className="thumbnails-container">
          {images.slice(0, 5).map((image, index) => (
            <div 
              key={index}
              className={`thumbnail ${currentImageIndex === index ? 'active' : ''}`}
              onClick={() => handleThumbnailClick(index)}
            >
              <img src={image} alt={`Thumbnail ${index + 1}`} />
            </div>
          ))}
          {images.length > 5 && (
            <div className="more-images" onClick={() => handleThumbnailClick(5)}>
              <span>+{images.length - 5} ảnh</span>
            </div>
          )}
        </div>
      </div>

      {/* Villa Details */}
      <div className="container mt-4">
        <div className="row">
          <div className="col-lg-8">
            <div className="villa-details">
              <h2>Chi tiết về villa</h2>
              <p>
                "Nhà và phòng ngủ rất sạch sẽ, chủ nhà rất nhiệt tình và thân thiện, tiện 
                nghi trong nhà rất đầy đủ. Sẽ quay lại khi đến Đà Lạt."
              </p>
              
              <h3>Tiện nghi</h3>
              <div className="row amenities">
                <div className="col-md-4">
                  <div className="amenity-item">
                    <i className="bi bi-wifi"></i>
                    <span>WiFi miễn phí</span>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="amenity-item">
                    <i className="bi bi-cup-hot"></i>
                    <span>Bữa sáng</span>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="amenity-item">
                    <i className="bi bi-thermometer-sun"></i>
                    <span>Sưởi ấm</span>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="amenity-item">
                    <i className="bi bi-tree"></i>
                    <span>Vườn</span>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="amenity-item">
                    <i className="bi bi-tv"></i>
                    <span>TV</span>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="amenity-item">
                    <i className="bi bi-p-square"></i>
                    <span>Bãi đậu xe</span>
                  </div>
                </div>
              </div>
              
              <h3>Mô tả</h3>
              <p>
                Hoa Ngoc Lan - The Orchid Villa Dalat là một biệt thự sang trọng nằm trên một ngọn đồi với tầm nhìn ra 
                thành phố Đà Lạt. Villa được thiết kế theo phong cách hiện đại kết hợp với nét đẹp truyền thống, 
                mang đến không gian nghỉ dưỡng yên tĩnh và thoải mái.
              </p>
              <p>
                Mỗi phòng ngủ đều được trang bị đầy đủ tiện nghi với nội thất gỗ cao cấp, cửa sổ lớn đón ánh sáng tự nhiên 
                và tầm nhìn tuyệt đẹp. Phòng tắm rộng rãi với thiết bị hiện đại, đảm bảo sự riêng tư và thoải mái.
              </p>
            </div>
          </div>
          <div className="col-lg-4">
            <div className="rating-card">
              <div className="rating-header">
                <h3>Tuyệt hảo</h3>
                <div className="rating-score">9.3</div>
              </div>
              <p>129 đánh giá</p>
              
              <div className="guest-feedback">
                <h4>Khách lưu trú ở đây thích điều gì?</h4>
                <div className="feedback-item">
                  "Nhà và phòng ngủ rất sạch sẽ, chủ nhà rất nhiệt tình và thân thiện, tiện 
                  nghi trong nhà rất đầy đủ. Sẽ quay lại khi đến Đà Lạt."
                </div>
              </div>
              
              <div className="host-info">
                <div className="host-avatar">H</div>
                <div className="host-details">
                  <div className="host-name">Do</div>
                  <div className="host-location">
                    <img src="/images/vietnam-flag.jpg" alt="Vietnam flag" className="flag-icon" />
                    Việt Nam
                  </div>
                </div>
              </div>
              
              <div className="amenity-highlight">
                <div className="amenity-title">WiFi miễn phí</div>
                <div className="amenity-score">10</div>
              </div>
              
              <div className="map-preview">
                <img src="/images/map-preview.jpg" alt="Map location" />
                <button className="btn btn-primary w-100 mt-2">Hiển thị trên bản đồ</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showPaymentModal && (
        <div className="payment-modal-overlay">
          <div className="payment-modal-content">
            <div className="payment-modal-header">
              <h3>Thanh toán đặt Villa</h3>
              <button className="close-btn" onClick={closePaymentModal}>
                <i className="bi bi-x-lg"></i>
              </button>
            </div>
            <div className="payment-modal-body">
              {/* Kích hoạt cuộn chỉ trong modal */}
              <Payment wrapperClass="payment-inside-modal" onComplete={closePaymentModal} villaData={villa} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}