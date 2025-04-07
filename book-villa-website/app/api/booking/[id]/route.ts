import { ObjectId } from 'mongodb';
import { findBookingById, updateBooking } from "../../../../lib/repositories/booking-repo";
import { errorResponse, successResponse } from "../../../../lib/utils";
import { authenticateJWT } from "../../../../middleware/authentication";

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const user = await authenticateJWT(request);
        if (!user) {
            return errorResponse('Bạn không có quyền truy cập tài nguyên này.', 403)
        }
        const id = await params;
        const bookingId = id.id;
        const body = await request.json();
        const cr = await findBookingById(new ObjectId(bookingId));
        if (!cr) {
            return errorResponse('Booking not found', 404)
        }
        return successResponse('Update booking successfully', await updateBooking(cr._id, body));
    } catch (error) {
        return errorResponse(`${error}`, 500)
    }
}

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }){
    try {
        const user = await authenticateJWT(request);
        if (!user) {
            return errorResponse('Bạn không có quyền truy cập tài nguyên này.', 403)
        }
        const id = await params;
        const bookingId = id.id;
        const cr = await findBookingById(new ObjectId(bookingId));
        if (!cr) {
            return errorResponse('Booking not found', 404)
        }
        return successResponse('Find booking successfully',cr);
    } catch (error) {
        return errorResponse(`${error}`, 500)
    }
}