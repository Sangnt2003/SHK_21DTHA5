import { generateVNPayUrl } from "../../../helpers/vnpayHelper";
import { createBooking, findBookingByUserId } from "../../../lib/repositories/booking-repo";
import { errorResponse, successResponse } from "../../../lib/utils";
import { authenticateJWT, authenticationUser } from "../../../middleware/authentication";
import BookingModel from "../../../models/BookingModel";

export async function POST(request: Request) {
  try {
    // Xác thực người dùng
    const user = await authenticationUser(request);
    if (!user) {
      return errorResponse("Unauthorized", 401);
    }
    const userId = user._id;
    const {
      villa,
      checkInDate,
      checkOutDate,
      totalPrice,
      numberOfPeople,
      paymentMethod, 
      orderInfo 
    } = await request.json();

    let paymentStatus = "pending";
    let bookingStatus = "pending";
    if (paymentMethod && paymentMethod.toLowerCase() !== "vnpay") {
      paymentStatus = "completed";
      bookingStatus = "confirmed";
    }

    const booking = await createBooking({
      userId,
      villa,
      checkInDate: new Date(checkInDate),
      checkOutDate: new Date(checkOutDate),
      totalPrice,
      numberOfPeople,
      status: bookingStatus,
      payment: {
        method: paymentMethod || "cash",
        status: paymentStatus
      }
    });

    if (paymentMethod && paymentMethod.toLowerCase() === "vnpay") {
      const paymentUrl = generateVNPayUrl({
        bookingId: booking._id.toString(),
        amount: totalPrice,
        orderInfo: orderInfo || `Thanh toán cho booking ${booking._id}`,
        req: request,
      });
      return successResponse(
        "Booking created successfully. Please complete payment via VNPay.",
        { booking, paymentUrl }
      );
    } else {
      return successResponse(
        "Booking created successfully with direct payment.",
        { booking }
      );
    }
  } catch (error: any) {
    return errorResponse(`${error}`, 500);
  }
}

export async function GET(request: Request) {
    try {
        const user = await authenticateJWT(request);
        if (!user) {
            return errorResponse('Bạn không có quyền truy cập tài nguyên này.', 403)
        }    
        return successResponse('Get all bookings by user id successfully', await findBookingByUserId(user._id));
    } catch (error) {
        return errorResponse(`${error}`, 500)
    }
}
