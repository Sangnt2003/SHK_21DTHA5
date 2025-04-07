import createUser, { getUserByEmailFullOtion } from "../../../../lib/repositories/user-repo";
import UserModel from "../../../../models/UserModel";
import jwt from 'jsonwebtoken';
import { errorResponse, successResponse } from "../../../../lib/utils";
import bcrypt from 'bcrypt';

export async function POST(request:Request) {
    try {
        const dataRegister = await request.json();
        // Validate input
        if (!dataRegister.email || !dataRegister.password || !dataRegister.fullName) {
            return errorResponse(`Email, mật khẩu và tên là bắt buộc.`, 400);
        }

        // Check if user already exists
        const existingUser = await getUserByEmailFullOtion(dataRegister.email);
        if (existingUser) {
            return errorResponse(`Người dùng đã tồn tại.`, 409);
        }
        const saltRounds = parseInt(process.env.SALTROUNDS, 10);

        // Create new user
        const newUser = new UserModel({
            email: dataRegister.email,
            password: await bcrypt.hash(dataRegister.password, saltRounds),
            fullName: dataRegister.fullName,
            cin: dataRegister.cin,
            phoneNumber: dataRegister.phoneNumber,
            dateOfBirth: dataRegister.dateOfBirth,
        })
        
        // Chuyển đổi salt rounds sang number
        const createdUser = await createUser(newUser);
        const token = jwt.sign({ email: newUser.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
        return successResponse('Đăng ký thành công', { token });
    } catch (error) {
        return errorResponse(`Đã xảy ra lỗi trong quá trình đăng ký. ${error}`, 500);
    }
    
}