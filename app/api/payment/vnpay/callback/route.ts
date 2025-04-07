import { ObjectId } from 'mongodb';

import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { updateBooking } from '../../../../../lib/repositories/booking-repo';

export async function GET(request: Request) {
  try {
    // Lấy các tham số từ URL callback của VNPay
    const { searchParams } = new URL(request.url);
    const vnp_Params: Record<string, string> = {};
    searchParams.forEach((value, key) => {
      vnp_Params[key] = value;
    });

    // Lấy secure hash từ VNPay và loại bỏ nó khỏi params để tính toán lại
    const secureHash = vnp_Params.vnp_SecureHash;
    delete vnp_Params.vnp_SecureHash;
    delete vnp_Params.vnp_SecureHashType;

    // Sắp xếp lại các tham số theo thứ tự chữ cái
    const sortedParams = Object.keys(vnp_Params)
      .sort()
      .reduce((acc, key) => {
        acc[key] = vnp_Params[key];
        return acc;
      }, {} as Record<string, string>);

    // Tạo chuỗi query từ các tham số đã sắp xếp
    const querystring = Object.entries(sortedParams)
      .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
      .join('&');

    // Tính toán secure hash dựa trên secret key của bạn
    const vnp_HashSecret = process.env.VNP_HASH_SECRET as string;
    const computedHash = crypto
      .createHmac('sha512', vnp_HashSecret)
      .update(querystring)
      .digest('hex');

    // Kiểm tra secure hash
    if (computedHash !== secureHash) {
      return NextResponse.json({ error: 'Hash không hợp lệ' }, { status: 400 });
    }

    // Lấy thông tin từ các tham số trả về của VNPay
    const responseCode = vnp_Params.vnp_ResponseCode;
    const txnRef = vnp_Params.vnp_TxnRef; // Đây là bookingId của bạn
    const transactionId = vnp_Params.vnp_TransactionNo;

    // Nếu giao dịch thành công (mã '00' thường biểu thị giao dịch thành công)
    if (responseCode === '00') {
      await updateBooking(new ObjectId(txnRef), {
        'payment.status': 'completed',
        'payment.transactionId': transactionId,
        'payment.paidAt': new Date()
      });
      // Chuyển hướng người dùng đến trang thanh toán thành công (frontend có thể hiển thị thông báo)
      return NextResponse.redirect(new URL('/payment-success', request.url));
    } else {
      // Nếu giao dịch thất bại, cập nhật trạng thái là failed
      await updateBooking(new ObjectId(txnRef), {
        'payment.status': 'failed',
        'payment.transactionId': transactionId
      });
      // Chuyển hướng đến trang thông báo thất bại
      return NextResponse.redirect(new URL('/payment-failed', request.url));
    }
  } catch (error) {
    return NextResponse.json(
      { error: 'Có lỗi xảy ra trong quá trình xử lý callback' },
      { status: 500 }
    );
  }
}
