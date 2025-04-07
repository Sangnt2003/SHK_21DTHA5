import { ObjectId } from 'mongodb';
import { findBookingByVillaId, getBookingUserDetail } from "../../../../../../lib/repositories/booking-repo";
import { errorResponse, successResponse } from "../../../../../../lib/utils";
import { authenticateJWT } from "../../../../../../middleware/authentication";

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
    try {

        const user = await authenticateJWT(request);
        if (!user.isAdmin) {
            return errorResponse('Bạn không có quyền truy cập tài nguyên này.', 403)
        }
        const id = await params;
        const villaId = id.id;
        return successResponse('Get all bookings by villa id successfully', await getBookingUserDetail(villaId));
    } catch (error) {
        return errorResponse(`${error}`, 500)
    }


}