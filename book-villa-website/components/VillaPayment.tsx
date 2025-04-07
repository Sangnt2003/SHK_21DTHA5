'use client';
import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import '../public/css/villa-payment.css';
import { useRouter } from 'next/navigation';
import { useAppDispatch, useAppSelector } from 'store/hooks';
export default function Payment({ wrapperClass, onComplete, villaData }) {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const auth = useAppSelector((state) => state.auth);
  const bookingData = {
    villa: "67e7d9b65585096c5c073372",
    checkInDate: "2025-09-01T00:00:00.000Z",
    checkOutDate: "2025-09-05T00:00:00.000Z",
    totalPrice: 150000,
    numberOfPeople: 4,
    paymentMethod: "vnpay",
    orderInfo: "Thanh toán đặt villa qua VNPay"
  };

  const [paymentMethod, setPaymentMethod] = useState('vnpay');
  const [isLoading, setIsLoading] = useState(false);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN', {
      weekday: 'short',
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  // Calculate number of nights
  const nights = Math.round((new Date(bookingData.checkOutDate).getTime() - new Date(bookingData.checkInDate).getTime()) / (1000 * 60 * 60 * 24));

  // Format price
  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Prepare payment data
    const paymentData = {
      ...bookingData,
      paymentMethod: paymentMethod
    };

    try {

      const queryParams = new URLSearchParams({
        villa: bookingData.villa,
        checkInDate: bookingData.checkInDate,
        checkOutDate: bookingData.checkOutDate,
        totalPrice: bookingData.totalPrice.toString(),
        numberOfPeople: bookingData.numberOfPeople.toString(),
        paymentMethod: bookingData.paymentMethod,
        orderInfo: bookingData.orderInfo
      })

      // redirect(``)


      // Here you would typically make an API call to your backend
      console.log('Sending payment data:', paymentData);

      // Simulate API call
      const response = await fetch("/api/booking", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth.jwt}`,
        },
        body: JSON.stringify(paymentData),
      });
      const result = await response.json();
      // console.log("data respone from backend send to frontend booking: ", result.data)
      // console.log("payment url: ", result.data.paymentUrl)
      const urlPayment = result.data.paymentUrl
      if (paymentMethod === 'vnpay') {
        //Chờ chuyển sang trang VNPAY thanh toán nè cu Khan
        if(urlPayment){
          router.push(`${urlPayment}`);
        }else{
          alert("co loi khi tao booking")
        }
        // router.push('/vnpay-redirect'); chổ này gửi về back-end ???
      } else {
        // Thanh toán trực tiếp nè trả về trang thông báo đặt phòng thành công luôn
        alert('Đặt phòng thành công! Bạn sẽ thanh toán khi nhận villa.');
        router.push('/payment-success');
      }

      // Nếu onComplete được truyền vào, gọi nó khi hoàn thành
      if (onComplete) {
        onComplete();
      }
    } catch (error) {
      console.error('Payment error:', error);
      alert('Có lỗi xảy ra khi xử lý thanh toán. Vui lòng thử lại.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={wrapperClass || ''}>
      <div className="row">
        <div className="col-md-8">
          <div className="card mb-4 shadow-sm">
            <div className="card-header bg-white">
              <h2 className="h5 mb-0">Thanh toán đặt Villa</h2>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <h3 className="h6 mb-3">Chọn phương thức thanh toán</h3>
                  <div className="border rounded p-3">
                    <div className="form-check mb-3">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="paymentMethod"
                        id="vnpay"
                        value="vnpay"
                        checked={paymentMethod === 'vnpay'}
                        onChange={() => setPaymentMethod('vnpay')}
                      />
                      <label className="form-check-label d-flex align-items-center" htmlFor="vnpay">
                        <span className="ms-2">Thanh toán qua VNPay</span>
                        <img
                          src="https://sandbox.vnpayment.vn/paymentv2/Images/brands/logo.svg"
                          alt="VNPay"
                          className="ms-auto"
                          height="30"
                        />
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="paymentMethod"
                        id="direct"
                        value="direct"
                        checked={paymentMethod === 'direct'}
                        onChange={() => setPaymentMethod('direct')}
                      />
                      <label className="form-check-label d-flex align-items-center" htmlFor="direct">
                        <span className="ms-2">Thanh toán khi nhận Villa</span>
                        <i className="bi bi-cash-coin ms-auto text-success fs-4"></i>
                      </label>
                    </div>
                  </div>
                </div>

                <div className="d-grid">
                  <button
                    type="submit"
                    className="btn btn-primary btn-lg"
                    style={{ backgroundColor: '#0071c2', borderColor: '#0071c2' }}
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                        Đang xử lý...
                      </>
                    ) : (
                      'Xác nhận đặt phòng'
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card shadow-sm mb-4">
            <div className="card-header bg-white">
              <h3 className="h5 mb-0">Chi tiết đặt phòng</h3>
            </div>
            <div className="card-body">
              <div className="mb-3 pb-3 border-bottom">
                <div className="d-flex align-items-center mb-2">
                  <i className="bi bi-calendar3 me-2 text-primary"></i>
                  <div>
                    <div className="small text-muted">Nhận phòng</div>
                    <div className="fw-bold">{formatDate(bookingData.checkInDate)}</div>
                  </div>
                </div>
                <div className="d-flex align-items-center">
                  <i className="bi bi-calendar3 me-2 text-primary"></i>
                  <div>
                    <div className="small text-muted">Trả phòng</div>
                    <div className="fw-bold">{formatDate(bookingData.checkOutDate)}</div>
                  </div>
                </div>
              </div>

              <div className="mb-3 pb-3 border-bottom">
                <div className="d-flex align-items-center">
                  <i className="bi bi-people me-2 text-primary"></i>
                  <div>
                    <div className="small text-muted">Số người</div>
                    <div className="fw-bold">{bookingData.numberOfPeople} người</div>
                  </div>
                </div>
              </div>

              <div className="mb-3 pb-3 border-bottom">
                <div className="d-flex align-items-center">
                  <i className="bi bi-house me-2 text-primary"></i>
                  <div>
                    <div className="small text-muted">Thời gian lưu trú</div>
                    <div className="fw-bold">{nights} đêm</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="card-footer bg-white">
              <div className="d-flex justify-content-between align-items-center mb-2">
                <span>Giá Villa ({nights} đêm)</span>
                <span>{formatPrice(bookingData.totalPrice)}</span>
              </div>
              <div className="d-flex justify-content-between align-items-center fw-bold fs-5 mt-3">
                <span>Tổng cộng</span>
                <span style={{ color: '#0071c2' }}>{formatPrice(bookingData.totalPrice)}</span>
              </div>
            </div>
          </div>

          <div className="card shadow-sm">
            <div className="card-body">
              <div className="d-flex align-items-center">
                <i className="bi bi-shield-check text-success fs-4 me-3"></i>
                <div>
                  <div className="fw-bold">Thanh toán an toàn</div>
                  <div className="small text-muted">Thông tin thanh toán của bạn được bảo mật an toàn.</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}