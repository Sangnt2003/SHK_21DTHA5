import { getAllBookings } from "../../../../lib/repositories/booking-repo";
import { errorResponse, successResponse } from "../../../../lib/utils";
import { authenticateJWT } from "../../../../middleware/authentication";

export async function GET(request: Request) {
    try{
        const user = await authenticateJWT(request);
    if (!user.isAdmin) {
        return errorResponse('Bạn không có quyền truy cập tài nguyên này.', 403)
    }
    return successResponse('Get all bookings successfully', await getAllBookings());
    }catch (error) {
        return errorResponse(` ${error}`, 500);
    }
}