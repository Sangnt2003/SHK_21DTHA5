import crypto from 'crypto';
import moment from 'moment';

/**
 * Các tham số cần thiết:
 * - bookingId: Mã đơn hàng (ví dụ: "240685")
 * - amount: Số tiền VNĐ (ví dụ: 10000)
 * - orderInfo: Thông tin mô tả đơn hàng
 * - ipAddr: (Tùy chọn) Địa chỉ IP, nếu không truyền thì mặc định "127.0.0.1"
 * - expireMinutes: (Tùy chọn) Thời gian hết hạn tính bằng phút, mặc định 15 phút
 * - version: (Tùy chọn) Phiên bản VNPay, mặc định "2.1.1"
 * - orderType: (Tùy chọn) Loại đơn hàng, mặc định "topup"
 */
interface VNPayParams {
    bookingId: string;
    amount: number;
    orderInfo: string;
    ipAddr?: string;
    expireMinutes?: number;
    version?: string;
    orderType?: string;
}

export function generateVNPayUrl({
    bookingId,
    amount,
    orderInfo,
    req
}) {
    process.env.TZ = 'Asia/Ho_Chi_Minh';

    let date = new Date();
    let createDate = moment(date).format('YYYYMMDDHHmmss');

    let tmnCode = process.env.VNP_TMN_CODE as string;
    let secretKey = process.env.VNP_HASH_SECRET as string;
    let vnpUrl = process.env.VNP_URL as string;
    let returnUrl = process.env.VNP_RETURN_URL as string;
    let orderId = moment(date).format('DDHHmmss');
    const ipAddr =
        req.headers.get('x-forwarded-for') ||
        req.headers.get('host') ||
        '127.0.0.1';
    let bankCode = "VNBANK"

    let locale = "vn";
    if (locale === null || locale === '') {
        locale = 'vn';
    }
    let currCode = 'VND';
    let vnp_Params = {};
    vnp_Params['vnp_Version'] = '2.1.0';
    vnp_Params['vnp_Command'] = 'pay';
    vnp_Params['vnp_TmnCode'] = tmnCode;
    vnp_Params['vnp_Locale'] = locale;
    vnp_Params['vnp_CurrCode'] = currCode;
    vnp_Params['vnp_TxnRef'] = orderId;
    vnp_Params['vnp_OrderInfo'] = 'Thanh toan cho ma GD ' + orderId;
    vnp_Params['vnp_OrderType'] = 'other';
    vnp_Params['vnp_Amount'] = amount * 100;
    vnp_Params['vnp_ReturnUrl'] = returnUrl;
    vnp_Params['vnp_IpAddr'] = ipAddr;
    vnp_Params['vnp_CreateDate'] = createDate;
    vnp_Params['vnp_BankCode'] = "VNBANK";

    vnp_Params = sortObject(vnp_Params);

    let querystring = require('qs');
    let signData = querystring.stringify(vnp_Params, { encode: false });
    let crypto = require("crypto");
    let hmac = crypto.createHmac("sha512", secretKey);
    let signed = hmac.update(new Buffer(signData, 'utf-8')).digest("hex");
    vnp_Params['vnp_SecureHash'] = signed;
    vnpUrl += '?' + querystring.stringify(vnp_Params, { encode: false });

    return vnpUrl;
}


function sortObject(obj) {
    let sorted = {};
    let str = [];
    let key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) {
            str.push(encodeURIComponent(key));
        }
    }
    str.sort();
    for (key = 0; key < str.length; key++) {
        sorted[str[key]] = encodeURIComponent(obj[str[key]]).replace(/%20/g, "+");
    }
    return sorted;
}
