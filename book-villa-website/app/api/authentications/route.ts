import { error } from "console";
import { authenticateJWT, authenticationUser } from "../../../middleware/authentication";
import { errorResponse, successResponse } from "../../../lib/utils";

export async function GET(request: Request) {
    try {
        const user = await authenticationUser(request);
        if(!user){
            return errorResponse('Đã có lỗi trong quá trình xác thực người dùng vui lòng đăng nhập lại!', 401)
        }
        return successResponse('Xác thực thành công', user);
    }catch (error) {
        return errorResponse(`${error}`, 500)
    }
}