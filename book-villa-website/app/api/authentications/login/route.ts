import { getUserByEmailFullOtion } from "../../../../lib/repositories/user-repo";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { errorResponse, successResponse } from "../../../../lib/utils";

export async function POST(request: Request) {
    try {
        const dataLogin = await request.json();
        const response = []
        // Validate input
        if (!dataLogin.email || !dataLogin.password) {
            return errorResponse('Email và mật khẩu là bắt buộc.', 400);
        }

        // Check if user exists
        const user = await getUserByEmailFullOtion(dataLogin.email);
        if (!user) {
            return errorResponse('Người dùng không tồn tại.', 401);
        }

        // Check password
        const isMatch = await bcrypt.compare(dataLogin.password, user.password);
        if (!isMatch) {
            return errorResponse('Mật khẩu không chính xác.', 401);
        }

        // Generate JWT token
        const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
        return successResponse('Đăng nhập thành công', { token });
    } catch (error) {
        return errorResponse('Đã xảy ra lỗi trong quá trình đăng nhập.', 500);
    }
}



