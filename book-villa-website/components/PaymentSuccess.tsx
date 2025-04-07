'use client';

import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

export default function PaymentSuccess() {
  const searchParams = useSearchParams();
  const bookingId = searchParams.get('bookingId') || "BK-12345678";
  const paymentMethod = searchParams.get('paymentMethod') || "vnpay";
  
  const bookingData = {
    id: bookingId,
    villa: "Ocean View Villa",
    checkInDate: "2023-09-01T00:00:00.000Z",
    checkOutDate: "2023-09-05T00:00:00.000Z",
    totalPrice: 150000,
    numberOfPeople: 4,
    paymentMethod: paymentMethod,
    paymentId: "VNP13579246",
    transactionDate: new Date().toISOString()
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN', {
      weekday: 'short',
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  const formatTransactionDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN', {
      day: 'numeric',
      month: 'numeric',
      year: 'numeric'
    }) + ' ' + date.toLocaleTimeString('vi-VN', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Calculate number of nights
  const nights = Math.round((new Date(bookingData.checkOutDate).getTime() - new Date(bookingData.checkInDate).getTime()) / (1000 * 60 * 60 * 24));

  // Format price
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price);
  };

  return (
    <>
      <header className="py-3" style={{ backgroundColor: '#003580' }}>
        <div className="container">
          <div className="row align-items-center">
            <div className="col">
              <h1 className="h4 m-0 text-white">Booking.com</h1>
            </div>
          </div>
        </div>
      </header>

      <div className="container my-5">
        <div className="row justify-content-center">
          <div className="col-md-8">
            <div className="card border-0 shadow mb-4">
              <div className="card-body text-center p-5">
                <div className="mb-4">
                  <i className="bi bi-check-circle-fill text-success" style={{ fontSize: '5rem' }}></i>
                </div>
                <h2 className="mb-3">Thanh toán thành công!</h2>
                <p className="lead text-muted mb-4">Cảm ơn bạn đã đặt Villa. Chúng tôi đã gửi xác nhận chi tiết vào email của bạn.</p>
                
                <div className="alert" style={{ backgroundColor: '#ebf3ff' }}>
                  <div className="d-flex align-items-center">
                    <i className="bi bi-info-circle text-primary me-3 fs-5"></i>
                    <p className="mb-0 text-start">Mã đặt phòng của bạn: <strong>{bookingData.id}</strong></p>
                  </div>
                </div>
                
                <div className="d-grid gap-3 d-sm-flex justify-content-sm-center mt-4">
                  <Link href="/my-bookings" className="btn btn-outline-primary" style={{ borderColor: '#0071c2', color: '#0071c2' }}>
                    Xem đặt phòng của tôi
                  </Link>
                  <Link href="/" className="btn btn-primary" style={{ backgroundColor: '#0071c2', borderColor: '#0071c2' }}>
                    Trở về trang chủ
                  </Link>
                </div>
              </div>
            </div>

            <div className="card shadow mb-4">
              <div className="card-header bg-white">
                <h3 className="h5 mb-0">Chi tiết đặt phòng</h3>
              </div>
              <div className="card-body">
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <div className="fw-bold mb-1">Villa</div>
                    <div>{bookingData.villa}</div>
                  </div>
                  <div className="col-md-6 mb-3">
                    <div className="fw-bold mb-1">Số người</div>
                    <div>{bookingData.numberOfPeople} người</div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <div className="fw-bold mb-1">Nhận phòng</div>
                    <div>{formatDate(bookingData.checkInDate)}</div>
                  </div>
                  <div className="col-md-6 mb-3">
                    <div className="fw-bold mb-1">Trả phòng</div>
                    <div>{formatDate(bookingData.checkOutDate)}</div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <div className="fw-bold mb-1">Thời gian lưu trú</div>
                    <div>{nights} đêm</div>
                  </div>
                  <div className="col-md-6 mb-3">
                    <div className="fw-bold mb-1">Tổng giá tiền</div>
                    <div className="fw-bold" style={{ color: '#0071c2' }}>{formatPrice(bookingData.totalPrice)}</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="card shadow">
              <div className="card-header bg-white">
                <h3 className="h5 mb-0">Chi tiết thanh toán</h3>
              </div>
              <div className="card-body">
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <div className="fw-bold mb-1">Phương thức thanh toán</div>
                    <div className="d-flex align-items-center">
                      {bookingData.paymentMethod === 'vnpay' ? (
                        <>
                          <span>VNPay</span>
                          <img 
                            src="https://sandbox.vnpayment.vn/paymentv2/Images/brands/logo.svg" 
                            alt="VNPay" 
                            className="ms-2" 
                            height="20" 
                          />
                        </>
                      ) : (
                        <>
                          <span>Thanh toán khi nhận Villa</span>
                          <i className="bi bi-cash-coin ms-2 text-success"></i>
                        </>
                      )}
                    </div>
                  </div>
                  <div className="col-md-6 mb-3">
                    <div className="fw-bold mb-1">Mã giao dịch</div>
                    <div>{bookingData.paymentId}</div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <div className="fw-bold mb-1">Ngày giao dịch</div>
                    <div>{formatTransactionDate(bookingData.transactionDate)}</div>
                  </div>
                  <div className="col-md-6 mb-3">
                    <div className="fw-bold mb-1">Trạng thái</div>
                    <div><span className="badge bg-success">Thành công</span></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-8">
            <div className="card shadow mb-4">
              <div className="card-body">
                <div className="row align-items-center">
                  <div className="col-auto">
                    <i className="bi bi-envelope-check fs-1 text-primary"></i>
                  </div>
                  <div className="col">
                    <h4>Xác nhận đã được gửi đến email của bạn</h4>
                    <p className="mb-0">Vui lòng kiểm tra hộp thư của bạn để tìm email xác nhận từ Booking.com</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <footer className="py-4 mt-5" style={{ backgroundColor: '#f5f5f5' }}>
        <div className="container">
          <div className="small text-center text-muted">
            © 2023 Booking.com. Bảo lưu mọi quyền.
          </div>
        </div>
      </footer>
    </>
  );
}