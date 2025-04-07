// lib/auth.js
import jwt from 'jsonwebtoken';
import { getUserByEmailFullOtion, getUserProfile } from '../lib/repositories/user-repo';

export async function authenticateJWT(request) {
  const authHeader = request.headers.get('Authorization');
  if (!authHeader) {
    throw new Error('Không có quyền truy cập, vui lòng đăng nhập tài khoản.');
  }

  const token = authHeader.split(' ')[1];
  try {
    // Giải mã token sử dụng secret
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // Lấy thông tin user từ database theo email trong payload
    const user = await getUserByEmailFullOtion(decoded.email);
    if (!user) {
      throw new Error('Token không hợp lệ, người dùng không tồn tại.');
    }
    return user;
  } catch (err) {
    throw new Error(`${err}`);
  }
}

export async function authenticationUser(request){
  const authHeader = request.headers.get('Authorization');
  if (!authHeader) {
    throw new Error('Không có quyền truy cập, vui lòng đăng nhập tài khoản.');
  }

  const token = authHeader.split(' ')[1];
  try {
    // Giải mã token sử dụng secret
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // Lấy thông tin user từ database theo email trong payload
    const user = await getUserProfile(decoded.email);
    if (!user) {
      throw new Error('Token không hợp lệ, người dùng không tồn tại.');
    }
    return user;
  } catch (err) {
    throw new Error(`${err}`);
  }
}
