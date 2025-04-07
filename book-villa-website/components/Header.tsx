'use client';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import "../public/css/header.css";
import React, { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import HotelSearchForm from './SearchBar';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { getUserAsync, loginAsync, logoutAsync, registerAsync } from '../store/slices/auth/authActions';

interface AuthModalProps {
  showModal: boolean;
  setShowModal: (value: boolean) => void;
  authMode: string;
  setAuthMode: (mode: string) => void;
  onLoginSuccess: () => void;
  onRegisterSuccess: (fullName: string) => void;
  showPassword: boolean;
  setShowPassword: (value: boolean) => void;
  showConfirmPassword: boolean;
  setShowConfirmPassword: (value: boolean) => void;
}

const AuthModal = React.memo(({ 
  showModal, 
  setShowModal, 
  authMode, 
  setAuthMode, 
  onLoginSuccess, 
  onRegisterSuccess,
  showPassword,
  setShowPassword,
  showConfirmPassword,
  setShowConfirmPassword
}: AuthModalProps) => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const dispatch = useAppDispatch();

  useEffect(() => {
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setShowPassword(false);
    setShowConfirmPassword(false);
  }, [authMode, setShowPassword, setShowConfirmPassword]);
  
  const handleLogin = useCallback((e) => {
    e.preventDefault();
    const emailValue = e.target.email.value;
    const passwordValue = e.target.password.value;
    dispatch(loginAsync({ email: emailValue, password: passwordValue })).then(() => {
      onLoginSuccess();
      setShowModal(false);
      alert('Đăng nhập thành công!');
      setEmail('');
      setPassword('');
    });
  }, [dispatch, onLoginSuccess, setShowModal]);

  const handleRegister = useCallback((e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('Mật khẩu xác nhận không khớp');
      return;
    }
    if (password.length < 8) {
      alert('Mật khẩu phải có ít nhất 8 ký tự');
      return;
    }
    const fullName = email.split('@')[0].toUpperCase();
    dispatch(registerAsync({ email, password, fullName })).then(() => {
      onRegisterSuccess(fullName);
      setShowModal(false);
      alert('Đăng ký thành công!');
      setEmail('');
      setPassword('');
      setConfirmPassword('');
    });
  }, [email, password, confirmPassword, dispatch, onRegisterSuccess, setShowModal]);

  return (
    <div 
      className={`modal fade ${showModal ? 'show' : ''}`} 
      style={{ display: showModal ? 'block' : 'none', backgroundColor: 'rgba(0,0,0,0.5)' }} 
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content border-0 shadow">
          <div className="modal-header border-0 bg-primary text-white">
            <h5 className="modal-title fw-bold">
              {authMode === 'login' ? 'Đăng nhập vào tài khoản' : 'Đăng ký tài khoản mới'}
            </h5>
            <button 
              type="button" 
              className="btn-close btn-close-white" 
              onClick={() => setShowModal(false)}
              aria-label="Close"
            ></button>
          </div>
          
          <div className="modal-body p-4">
            {authMode === 'login' ? (
              <div>
              <div className="text-center mb-4">
                <div className="display-6 text-primary mb-3">
                  <i className="bi bi-person-circle"></i>
                </div>
                <p className="text-muted">Đăng nhập để truy cập tài khoản của bạn</p>
              </div>
              
              <form onSubmit={handleLogin}>
                <div className="form-floating mb-3">
                  <input 
                    type="email" 
                    className="form-control " 
                    id="email" 
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    autoFocus
                    required
                  />
                  <label htmlFor="email">Địa chỉ email</label>
                </div>
                
                <div className="form-floating mb-3 position-relative">
                  <input 
                    type={showPassword ? "text" : "password"}
                    className="form-control" 
                    id="password" 
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <label htmlFor="password">Mật khẩu</label>
                  <button
                    type="button"
                    className="btn btn-link position-absolute end-0 top-50 translate-middle-y"
                    onClick={() => setShowPassword(!showPassword)}
                    style={{ zIndex: 5 }}
                  >
                    <i className={`bi ${showPassword ? 'bi-eye-slash' : 'bi-eye'}`}></i>
                  </button>
                </div>
                
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <div className="form-check">
                    <input className="form-check-input" type="checkbox" id="rememberMe" />
                    <label className="form-check-label" htmlFor="rememberMe">
                      Ghi nhớ đăng nhập
                    </label>
                  </div>
                  <a href="#" className="text-decoration-none">Quên mật khẩu?</a>
                </div>
                
                <div className="d-grid mb-4">
                  <button type="submit" className="btn btn-primary btn-lg">
                    <i className="bi bi-box-arrow-in-right me-2"></i>
                    Đăng nhập
                  </button>
                </div>
                
                <div className="text-center">
                  <p className="text-muted">Hoặc đăng nhập với</p>
                  <div className="d-flex justify-content-center gap-3 mb-4">
                    <button type="button" className="btn btn-outline-secondary">
                      <i className="bi bi-google"></i>
                    </button>
                    <button type="button" className="btn btn-outline-secondary">
                      <i className="bi bi-facebook"></i>
                    </button>
                    <button type="button" className="btn btn-outline-secondary">
                      <i className="bi bi-apple"></i>
                    </button>
                  </div>
                  
                  <div className="border-top pt-3">
                    <p>Chưa có tài khoản? 
                      <button 
                        type="button" 
                        className="btn btn-link text-decoration-none" 
                        onClick={() => setAuthMode('register')}>
                        Đăng ký ngay
                      </button>
                    </p>
                  </div>
                </div>
              </form>
            </div>
            ) : (
              <div>
                  <div className="text-center mb-4">
                    <div className="display-6 text-primary mb-3">
                      <i className="bi bi-person-plus-fill"></i>
                    </div>
                    <p className="text-muted">Tạo tài khoản mới để bắt đầu đặt villa</p>
                  </div>
                  
                  <form onSubmit={handleRegister}>
                    <div className="form-floating mb-3">
                      <input 
                        type="email" 
                        className="form-control" 
                        id="register-email" 
                        placeholder="name@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        autoFocus
                        required
                      />
                      <label htmlFor="register-email">Địa chỉ email</label>
                    </div>
                    
                    <div className="form-floating mb-3 position-relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        className="form-control" 
                        id="register-password" 
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                      <label htmlFor="register-password">Mật khẩu</label>
                      <button
                        type="button"
                        className="btn btn-link position-absolute end-0 top-50 translate-middle-y"
                        onClick={() => setShowPassword(!showPassword)}
                        style={{ zIndex: 5 }}
                      >
                        <i className={`bi ${showPassword ? 'bi-eye-slash' : 'bi-eye'}`}></i>
                      </button>
                      <div className="form-text">
                        Mật khẩu phải có ít nhất 8 ký tự
                      </div>
                    </div>
                    
                    <div className="form-floating mb-3 position-relative">
                      <input 
                        type={showConfirmPassword ? "text" : "password"}
                        className="form-control" 
                        id="confirm-password" 
                        placeholder="Confirm Password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                      />
                      <label htmlFor="confirm-password">Xác nhận mật khẩu</label>
                      <button
                        type="button"
                        className="btn btn-link position-absolute end-0 top-50 translate-middle-y"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        style={{ zIndex: 5 }}
                      >
                        <i className={`bi ${showConfirmPassword ? 'bi-eye-slash' : 'bi-eye'}`}></i>
                      </button>
                    </div>
                    
                    <div className="form-check mb-3">
                      <input className="form-check-input" type="checkbox" id="agreeTerms" required />
                      <label className="form-check-label" htmlFor="agreeTerms">
                        Tôi đồng ý với <a href="#" className="text-decoration-none">Điều khoản dịch vụ</a> và <a href="#" className="text-decoration-none">Chính sách bảo mật</a>
                      </label>
                    </div>
                    
                    <div className="d-grid mb-4">
                      <button type="submit" className="btn btn-primary btn-lg">
                        <i className="bi bi-person-plus me-2"></i>
                        Đăng ký tài khoản
                      </button>
                    </div>
                    
                    <div className="text-center">
                      <p className="text-muted">Hoặc đăng ký với</p>
                      <div className="d-flex justify-content-center gap-3 mb-4">
                        <button type="button" className="btn btn-outline-secondary">
                          <i className="bi bi-google"></i>
                        </button>
                        <button type="button" className="btn btn-outline-secondary">
                          <i className="bi bi-facebook"></i>
                        </button>
                        <button type="button" className="btn btn-outline-secondary">
                          <i className="bi bi-apple"></i>
                        </button>
                      </div>
                      
                      <div className="border-top pt-3">
                        <p>Đã có tài khoản? 
                          <button 
                            type="button" 
                            className="btn btn-link text-decoration-none" 
                            onClick={() => setAuthMode('login')}
                          >
                            Đăng nhập
                          </button>
                        </p>
                      </div>
                    </div>
                  </form>
                </div>
              )}
          </div>
        </div>
      </div>
    </div>
  );
});

export default function Header() {
  const [name, setName] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState('login');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const dispatch = useAppDispatch();
  const auth = useAppSelector((state) => state.auth);
  const router = useRouter();
  const onLoginSuccess = useCallback(() => {
    setIsLoggedIn(true);
  }, []);

  const onRegisterSuccess = useCallback((fullName) => {
    setName(fullName);
    setIsLoggedIn(true);
  }, []);

  useEffect(() => {
    if (auth?.jwt) {
      dispatch(getUserAsync());
    }
    if (auth?.user) {
      setName(auth.user.name);
      setIsLoggedIn(true);
    }
  }, [dispatch, auth?.jwt]);

  useEffect(() => {
    if (auth?.user && auth?.user?.isAdmin) {
      router.push('/manager');
    }
  }, [auth?.user, router]);

  const handleLogout = useCallback(() => {
    dispatch(logoutAsync());
  }, [dispatch]);

  return (
    <div className="container-fluid p-0">
      <header className="booking-header py-2">
        <div className="container-xxl d-flex justify-content-between align-items-center">
          <Link href="/" className="booking-logo text-decoration-none h2">Tada.com</Link>
          
          <div className="d-flex align-items-center gap-3">
            <button className="btn flag-btn p-0">
              <div className="vietnam-flag">
                <div className="star">★</div>
              </div>
            </button>
            
            {auth?.user ? (
              <div className="d-flex align-items-center gap-2">
                <Link href="/my-orders" className="text-white text-decoration-none">Lịch sử đặt phòng</Link>
                <div className="d-flex align-items-center">
                  <div className="user-avatar d-flex align-items-center justify-content-center me-2">
                    <span>{auth?.user?.fullName.charAt(0)}</span>
                  </div>
                  <div className="d-flex flex-column">
                    <span className="user-name">{auth?.user?.fullName} {auth?.user?.isAdmin ? "(Quản Trị Viên)" : "(Khách Hàng)"}</span>
                    <span className="user-level">Genius Cấp 1</span>
                  </div>
                </div>
                <button 
                  className="btn text-white fw-bold btn-sm ms-2" 
                  onClick={handleLogout}
                >
                  Đăng xuất
                </button>
              </div>
            ) : (
              <div className="d-flex align-items-center gap-2">
                <button 
                  className="btn text-white fw-bold btn-sm ms-2 fs-6" 
                  onClick={() => {
                    setAuthMode('register');
                    setShowAuthModal(true);
                  }}
                >
                  Đăng ký
                </button>
                <button 
                  className="btn text-white fw-bold btn-sm ms-2 fs-6" 
                  onClick={() => {
                    setAuthMode('login');
                    setShowAuthModal(true);
                  }}
                >
                  Đăng nhập
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      <nav className="booking-nav">
        <div className="container-xxl">
          <div className="d-flex gap-3">
            <button className="nav-btn active-nav">
              <span className="nav-icon">🏨</span>
              <span>Lưu trú</span>
            </button>
            <button className="nav-btn">
              <span className="nav-icon">✈️</span>
              <span>Chuyến bay</span>
            </button>
            <button className="nav-btn">
              <span className="nav-icon">🏨✈️</span>
              <span>Chuyến bay + Khách sạn</span>
            </button>
            <button className="nav-btn">
              <span className="nav-icon">🚗</span>
              <span>Thuê xe</span>
            </button>
            <button className="nav-btn">
              <span className="nav-icon">🏛️</span>
              <span>Địa điểm tham quan</span>
            </button>
            <button className="nav-btn">
              <span className="nav-icon">🚕</span>
              <span>Taxi sân bay</span>
            </button>
          </div>
        </div>
      </nav>

      <main className="booking-hero">
        <div className="container-xxl">
          <h1 className="hero-title">
            {isLoggedIn 
              ? `${auth?.user?.fullName}, kẻ tiếp bạn sẽ du lịch đến đâu?` 
              : "Bạn sẽ du lịch đến đâu?"}
          </h1>
          <p className="hero-subtitle">Tìm ưu đãi Genius đặc biệt tại khắp nơi trên thế giới!</p>
          <div>
            <HotelSearchForm />
          </div>
        </div>
      </main>
      
      <AuthModal
        showModal={showAuthModal}
        setShowModal={setShowAuthModal}
        authMode={authMode}
        setAuthMode={setAuthMode}
        onLoginSuccess={onLoginSuccess}
        onRegisterSuccess={onRegisterSuccess}
        showPassword={showPassword}
        setShowPassword={setShowPassword}
        showConfirmPassword={showConfirmPassword}
        setShowConfirmPassword={setShowConfirmPassword}
      />
    </div>
  );
}