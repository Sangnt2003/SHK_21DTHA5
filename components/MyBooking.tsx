'use client';

import { useAppDispatch, useAppSelector } from "store/hooks";
import { getUserBookingAsync } from "store/slices/auth/authActions";
import { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Link from 'next/link';

export default function MyBooking() {
  const auth = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const [villaNames, setVillaNames] = useState<Record<string, string>>({});
  const [villaImages, setVillaImages] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState<string>('all');
  console.log(villaImages)
  useEffect(() => {
    const loadData = async () => {
      try {
        await dispatch(getUserBookingAsync());
      } catch (err) {
        setError('Không thể tải lịch sử đặt phòng');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [dispatch]);

  useEffect(() => {
    if (!auth.bookings || auth.bookings.length === 0) return;

    const fetchVillaDetails = async () => {
      try {
        const names: Record<string, string> = {};
        const images: Record<string, string> = {};
        
        await Promise.all(auth.bookings.map(async (booking) => {
          try {
            const res = await fetch(`/api/villas/${booking.villa}`);
            if (!res.ok) throw new Error('Failed to fetch villa');
            const data = await res.json();
            names[booking.villa] = data.data?.name || 'Villa không xác định';
            images[booking.villa] = data.data?.images?.[0] || '/placeholder-villa.jpg';
          } catch (err) {
            console.error('Error fetching villa:', err);
            names[booking.villa] = 'Villa không xác định';
            images[booking.villa] = '/placeholder-villa.jpg';
          }
        }));

        setVillaNames(names);
        setVillaImages(images);
      } catch (err) {
        console.error('Error fetching villa details:', err);
      }
    };

    fetchVillaDetails();
  }, [auth.bookings]);

  const getStatusClass = (status: string) => {
    const statusLower = status.toLowerCase();
    switch (statusLower) {
      case 'confirmed': return 'text-success';
      case 'cancelled': return 'text-danger';
      case 'pending': return 'text-warning';
      case 'completed': return 'text-primary';
      default: return 'text-secondary';
    }
  };

  const getStatusIcon = (status: string) => {
    const statusLower = status.toLowerCase();
    switch (statusLower) {
      case 'confirmed': return 'bi-check-circle-fill';
      case 'cancelled': return 'bi-x-circle-fill';
      case 'pending': return 'bi-hourglass-split';
      case 'completed': return 'bi-trophy-fill';
      default: return 'bi-question-circle-fill';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('vi-VN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const calculateNights = (checkIn: string, checkOut: string) => {
    const startDate = new Date(checkIn);
    const endDate = new Date(checkOut);
    const timeDiff = endDate.getTime() - startDate.getTime();
    return Math.ceil(timeDiff / (1000 * 3600 * 24));
  };
  
  const filteredBookings = auth.bookings?.filter(booking => {
    if (activeFilter === 'all') return true;
    return booking.status.toLowerCase() === activeFilter;
  });

  if (loading) {
    return (
      <div className="container-fluid bg-light py-5">
        <div className="container py-5 text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-3 text-muted">Đang tải lịch sử đặt phòng của bạn...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container-fluid bg-light py-5">
        <div className="container py-3">
          <div className="alert alert-danger d-flex align-items-center">
            <i className="bi bi-exclamation-triangle-fill me-2 fs-4"></i>
            <div>{error}</div>
          </div>
          <button className="btn btn-primary mt-2" onClick={() => window.location.reload()}>
            <i className="bi bi-arrow-clockwise me-2"></i>Thử lại
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container-fluid p-0">
      {/* Header banner */}
      <div className="bg-primary text-white py-4">
        <div className="container">
          <h1 className="h3 fw-bold mb-0">
            <i className="bi bi-clock-history me-2"></i>
            Đặt chỗ của tôi
          </h1>
        </div>
      </div>
      
      {/* Main content */}
      <div className="container-fluid bg-light py-4">
        <div className="container">
          {/* Filter tabs */}
          <div className="bg-white rounded-3 shadow-sm mb-4 p-3">
            <div className="d-flex flex-wrap gap-2">
              <button 
                className={`btn ${activeFilter === 'all' ? 'btn-primary' : 'btn-outline-secondary'}`}
                onClick={() => setActiveFilter('all')}
              >
                <i className="bi bi-collection me-1"></i> Tất cả đặt chỗ
              </button>
              <button 
                className={`btn ${activeFilter === 'confirmed' ? 'btn-primary' : 'btn-outline-secondary'}`}
                onClick={() => setActiveFilter('confirmed')}
              >
                <i className="bi bi-check-circle me-1"></i> Đã xác nhận
              </button>
              <button 
                className={`btn ${activeFilter === 'pending' ? 'btn-primary' : 'btn-outline-secondary'}`}
                onClick={() => setActiveFilter('pending')}
              >
                <i className="bi bi-hourglass-split me-1"></i> Đang chờ
              </button>
              <button 
                className={`btn ${activeFilter === 'completed' ? 'btn-primary' : 'btn-outline-secondary'}`}
                onClick={() => setActiveFilter('completed')}
              >
                <i className="bi bi-trophy me-1"></i> Đã hoàn thành
              </button>
              <button 
                className={`btn ${activeFilter === 'cancelled' ? 'btn-primary' : 'btn-outline-secondary'}`}
                onClick={() => setActiveFilter('cancelled')}
              >
                <i className="bi bi-x-circle me-1"></i> Đã hủy
              </button>
            </div>
          </div>
          
          {auth.bookings?.length === 0 ? (
            <div className="bg-white rounded-3 shadow-sm p-5 text-center">
              <div className="mb-4">
                <i className="bi bi-calendar-x text-muted" style={{ fontSize: '4rem' }}></i>
              </div>
              <h3 className="h4 mb-3">Bạn chưa có đơn đặt phòng nào</h3>
              <p className="text-muted mb-4">Hãy tìm và đặt chỗ nghỉ cho chuyến đi của bạn ngay hôm nay</p>
              <Link href="/" className="btn btn-primary btn-lg">
                <i className="bi bi-search me-2"></i>Tìm chỗ nghỉ
              </Link>
            </div>
          ) : filteredBookings?.length === 0 ? (
            <div className="bg-white rounded-3 shadow-sm p-5 text-center">
              <div className="mb-4">
                <i className="bi bi-filter-circle text-muted" style={{ fontSize: '4rem' }}></i>
              </div>
              <h3 className="h4 mb-3">Không tìm thấy đơn đặt phòng nào</h3>
              <p className="text-muted mb-4">Không có đơn đặt phòng nào phù hợp với bộ lọc đã chọn</p>
              <button className="btn btn-primary" onClick={() => setActiveFilter('all')}>
                <i className="bi bi-collection me-2"></i>Xem tất cả đặt chỗ
              </button>
            </div>
          ) : (
            <div className="mb-4">
              {filteredBookings?.map((booking) => (
                <div key={booking._id} className="card border-0 rounded-3 shadow-sm mb-4 overflow-hidden">
                  {/* Status banner */}
                  <div className={`d-flex align-items-center px-3 py-2 ${booking.status.toLowerCase() === 'cancelled' ? 'bg-danger bg-opacity-10' : 'bg-primary bg-opacity-10'}`}>
                    <i className={`bi ${getStatusIcon(booking.status)} me-2 ${getStatusClass(booking.status)}`}></i>
                    <span className={`fw-medium ${getStatusClass(booking.status)}`}>
                      {booking.status === 'confirmed' && 'Đã xác nhận'}
                      {booking.status === 'pending' && 'Đang chờ xác nhận'}
                      {booking.status === 'cancelled' && 'Đã hủy'}
                      {booking.status === 'completed' && 'Đã hoàn thành'}
                    </span>
                    {booking.status === 'confirmed' && (
                      <div className="ms-auto text-success">
                        <i className="bi bi-check-circle-fill me-1"></i>
                        <small>Đặt phòng của bạn đã được xác nhận</small>
                      </div>
                    )}
                    {booking.status === 'pending' && (
                      <div className="ms-auto text-warning">
                        <i className="bi bi-clock-fill me-1"></i>
                        <small>Đang chờ xác nhận từ chủ nhà</small>
                      </div>
                    )}
                  </div>
                  
                  <div className="card-body p-0">
                    <div className="row g-0">
                      {/* Villa image */}
                      <div className="col-md-3">
                        <div className="position-relative h-100">
                          <img 
                            src={villaImages[booking.villa] || "/placeholder-villa.jpg"} 
                            className="w-100 h-100 object-fit-cover"
                            style={{ minHeight: '180px' }}
                            alt={villaNames[booking.villa] || "Villa"}
                          />
                        </div>
                      </div>
                      
                      {/* Booking details */}
                      <div className="col-md-9">
                        <div className="p-3 p-md-4">
                          <div className="d-flex flex-column flex-md-row justify-content-between mb-3">
                            <h5 className="mb-1 text-primary fw-bold">
                              <i className="bi bi-house-door me-2"></i>
                              {villaNames[booking.villa] || 'Đang tải thông tin villa...'}
                            </h5>
                            <div className="d-flex align-items-center">
                              <span className="text-danger fw-bold h5 mb-0">
                                {booking.totalPrice.toLocaleString('vi-VN')} ₫
                              </span>
                            </div>
                          </div>
                          
                          {/* Stay details */}
                          <div className="row mb-3 g-3">
                            <div className="col-md-8">
                              <div className="bg-light rounded-3 p-3">
                                <div className="row g-2">
                                  <div className="col-md-6">
                                    <div className="d-flex align-items-center">
                                      <div className="bg-primary bg-opacity-10 p-2 rounded-circle text-primary me-2">
                                        <i className="bi bi-calendar-check"></i>
                                      </div>
                                      <div>
                                        <small className="text-muted d-block">Nhận phòng</small>
                                        <span className="fw-medium">{formatDate(booking.checkInDate)}</span>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="col-md-6">
                                    <div className="d-flex align-items-center">
                                      <div className="bg-primary bg-opacity-10 p-2 rounded-circle text-primary me-2">
                                        <i className="bi bi-calendar-x"></i>
                                      </div>
                                      <div>
                                        <small className="text-muted d-block">Trả phòng</small>
                                        <span className="fw-medium">{formatDate(booking.checkOutDate)}</span>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div className="row mt-2 g-2">
                                  <div className="col-md-6">
                                    <div className="d-flex align-items-center">
                                      <div className="bg-primary bg-opacity-10 p-2 rounded-circle text-primary me-2">
                                        <i className="bi bi-moon-stars"></i>
                                      </div>
                                      <div>
                                        <small className="text-muted d-block">Số đêm</small>
                                        <span className="fw-medium">
                                          {calculateNights(booking.checkInDate, booking.checkOutDate)} đêm
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="col-md-6">
                                    <div className="d-flex align-items-center">
                                      <div className="bg-primary bg-opacity-10 p-2 rounded-circle text-primary me-2">
                                        <i className="bi bi-people"></i>
                                      </div>
                                      <div>
                                        <small className="text-muted d-block">Số người</small>
                                        <span className="fw-medium">{booking.numberOfPeople} người</span>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="col-md-4">
                              <div className="bg-light rounded-3 p-3 h-100">
                                <div className="d-flex flex-column h-100">
                                  <small className="text-muted mb-1">Thanh toán</small>
                                  <div className="d-flex align-items-center mb-2">
                                    <i className={`bi bi-credit-card me-2 ${booking.payment.status.toLowerCase() === 'paid' ? 'text-success' : 'text-warning'}`}></i>
                                    <span className="fw-medium">{booking.payment.method}</span>
                                  </div>
                                  <div className="mt-auto">
                                    <span className={`badge ${booking.payment.status.toLowerCase() === 'paid' ? 'bg-success' : 'bg-warning text-dark'}`}>
                                      {booking.payment.status === 'paid' ? 'Đã thanh toán' : 'Chờ thanh toán'}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          
                          {/* Actions */}
                          <div className="d-flex flex-wrap justify-content-between align-items-center mt-3 pt-3 border-top">
                            <div className="mb-2 mb-md-0">
                              <small className="text-muted">Mã đặt phòng:</small>
                              <span className="ms-1 fw-medium">{booking._id.substring(0, 8).toUpperCase()}</span>
                            </div>
                            <div className="d-flex gap-2">
                              {booking.status !== 'cancelled' && booking.status !== 'completed' && (
                                <button className="btn btn-outline-danger btn-sm">
                                  <i className="bi bi-x-circle me-1"></i>
                                  Hủy đặt phòng
                                </button>
                              )}
                              <Link href={`/booking/${booking._id}`} className="btn btn-primary btn-sm">
                                <i className="bi bi-eye me-1"></i>
                                Xem chi tiết
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      
      {/* Need help section */}
      <div className="container my-5">
        <div className="card border-0 shadow-sm">
          <div className="card-body p-4">
            <div className="row align-items-center">
              <div className="col-md-8">
                <h4 className="mb-2">Cần hỗ trợ về đặt phòng?</h4>
                <p className="text-muted mb-0">Đội ngũ hỗ trợ của chúng tôi sẵn sàng giúp đỡ bạn 24/7</p>
              </div>
              <div className="col-md-4 text-md-end mt-3 mt-md-0">
                <button className="btn btn-primary">
                  <i className="bi bi-headset me-2"></i>
                  Liên hệ hỗ trợ
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}