import { ObjectId } from 'mongodb';
import { authenticateJWT } from '../../../../../middleware/authentication';
import { errorResponse, successResponse } from '../../../../../lib/utils';
import { findBookingByUserId } from '../../../../../lib/repositories/booking-repo';


export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
    try {

        const user = await authenticateJWT(request);
        if (!user) {
            return errorResponse('Bạn không có quyền truy cập tài nguyên này.', 403)
        }
        const id = await params;
        const userId = id.id;
        return successResponse('Get all bookings by user id successfully', await findBookingByUserId(user._id));
    } catch (error) {
        return errorResponse(`${error}`, 500)
    }
}