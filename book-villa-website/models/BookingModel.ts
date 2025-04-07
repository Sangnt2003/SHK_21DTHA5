import mongoose from 'mongoose';
const { Schema } = mongoose;

const BookingSchema = new Schema({
  // Liên kết đến user (người đặt)
  user: { 
    type: Schema.Types.ObjectId, 
    ref: 'users', 
    required: true 
  },
  // Liên kết đến villa được đặt
  villa: { 
    type: Schema.Types.ObjectId, 
    ref: 'villas', 
    required: true 
  },
  // Ngày nhận phòng
  checkInDate: { 
    type: Date, 
    required: true 
  },
  // Ngày trả phòng
  checkOutDate: { 
    type: Date, 
    required: true 
  },
  // Tổng giá trị của booking
  totalPrice: { 
    type: Number, 
    required: true 
  },
  // Số người đặt
  numberOfPeople: { 
    type: Number, 
    required: true 
  },
  // Trạng thái booking
  status: { 
    type: String, 
    enum: ['pending', 'confirmed', 'cancelled'], 
    default: 'pending' 
  },
  // Thông tin thanh toán
  payment: {
    // Phương thức thanh toán: credit_card, paypal, bank_transfer, cash, ...
    method: { 
      type: String, 
      enum: ['credit_card', 'paypal', 'bank_transfer', 'cash'], 
      default: 'cash' 
    },
    // Trạng thái thanh toán
    status: { 
      type: String, 
      enum: ['pending', 'completed', 'failed'], 
      default: 'pending' 
    },
    // Mã giao dịch thanh toán (nếu có)
    transactionId: { 
      type: String 
    },
    // Thời gian thanh toán thành công
    paidAt: { 
      type: Date 
    }
  }
}, { timestamps: true });

// Sử dụng model hiện có nếu đã tồn tại, tránh lỗi OverwriteModelError
const BookingModel = mongoose.models.bookings || mongoose.model('bookings', BookingSchema);
export default BookingModel;
