import { ObjectId } from 'mongodb';
import { getDb } from "../mongodb";
import CategoryModel from '../../models/CategoryModel';
const collectionName = "bookings";

const db = await getDb();


export const findBookingById = async (id: ObjectId) => {
  const booking = await db.collection(collectionName).findOne({ _id: id });
  return booking;
}
export const findBookingByUserId = async (userId: ObjectId) => {
  const bookings = await db.collection(collectionName)
    .find({ userId: userId })
    .toArray();
  return bookings;
}
export const findBookingByVillaId = async (villaId: string) => {
  const booking = await db.collection(collectionName).findOne({ villa: villaId });
  return booking;
}
export const createBooking = async (booking: any) => {
    const result = await db.collection(collectionName).insertOne(booking);
    if (result.insertedId) {
      // Truy vấn lại booking vừa tạo dựa trên _id
      const createdBooking = await db.collection(collectionName).findOne({ _id: result.insertedId });
      return createdBooking;
    }
    throw new Error("Failed to create booking");
  }
  
export const updateBooking = async (id: ObjectId, booking: any) => {
  const result = await db.collection(collectionName).updateOne({ _id: id }, { $set: booking });
  return result;
}
export const deleteBooking = async (id: ObjectId) => {
  const result = await db.collection(collectionName).deleteOne({ _id: id });
  return result;
}
export const getAllBookings = async () => {
  const bookings = await db.collection(collectionName).find().toArray();
  return bookings;
}


/**
 * Lấy thông tin user (họ tên và số điện thoại) của booking dựa vào bookingId.
 * @param {ObjectId} bookingId - ID của booking.
 * @returns {Promise<{ fullName: string, phoneNumber: string }>} - Thông tin user.
 * @throws Nếu không tìm thấy booking hoặc user.
 */
export const getBookingUserDetail = async (id: string) => {
  const db = await getDb();
  
  // Lấy thông tin booking theo bookingId
  const booking = await db.collection('bookings').findOne({ _id: new ObjectId(id) });
  if (!booking) {
    throw new Error('Booking not found');
  }
  
  // Sử dụng trường user trong booking để lấy thông tin user
  const user = await db.collection('users').findOne({ _id: new ObjectId(booking.userId) });
  if (!user) {
    throw new Error(`User not found ${booking.userId}`,);
  }
  
  // Giả sử user có các trường fullName và phoneNumber
  return {
    fullName: user.fullName,
    phoneNumber: user.phoneNumber,
  };
};
