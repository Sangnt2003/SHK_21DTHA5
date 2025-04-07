"use client";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "store/hooks";
import { getAllOrdersManagerAsync } from "store/slices/order-manager/ordersAction";
import { getAllVillasAsync } from "store/slices/villas/villasActions";
import axios from "axios";

export default function OrdersPage() {
    const { orders, loading } = useAppSelector((state) => state.orderManager);
    const villas = useAppSelector((state) => state.villas);
    const [villaf, setVillaf] = useState([])
    const auth = useAppSelector((state) => state.auth);
    const dispatch = useAppDispatch();
    
    // State lưu thông tin booking chi tiết
    const [selectedBooking, setSelectedBooking] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [loadingDetails, setLoadingDetails] = useState(false);
    
    useEffect(() => {
        dispatch(getAllOrdersManagerAsync());
        dispatch(getAllVillasAsync());
        setVillaf(villas.villas)
    }, [dispatch]);

    // Hàm gọi API lấy thông tin chi tiết booking
    const fetchBookingDetails = async (bookingId) => {
        setLoadingDetails(true);
        try {
            const bookingRes = await axios.get(`http://localhost:3000/api/booking/${bookingId}`, {
                headers: { Authorization: `Bearer ${auth.jwt}` },
            });

            const bookingData = bookingRes.data.data;

            // Lấy thông tin user
            const userRes = await axios.get(`http://localhost:3000/api/manager/bookings/user/${bookingId}`, {
                headers: { Authorization: `Bearer ${auth.jwt}` },
            });

            setSelectedBooking({
                ...bookingData,
                villaName: villaf.find((v) => v._id === bookingData.villa)?.name || "Unknown Villa",
                user: userRes.data.data,
            });

            console.log('villa name: ', villas.villas.find((v) => v._id === bookingData.villa)?.name)

            setIsModalOpen(true);
        } catch (error) {
            console.error("Error fetching booking details:", error);
        }
        setLoadingDetails(false);
    };

    return (
        <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center p-8">
            <h2 className="text-3xl font-bold mb-6">Manage Orders</h2>

            {loading ? (
                <p className="text-gray-400 text-lg">Loading orders...</p>
            ) : orders.length === 0 ? (
                <p className="text-gray-400 text-lg">No orders found.</p>
            ) : (
                <div className="w-full max-w-5xl bg-gray-800 p-4 rounded-lg shadow-lg">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-gray-600">
                                <th className="p-3">Order ID</th>
                                <th className="p-3">Villa</th>
                                <th className="p-3">Status</th>
                                <th className="p-3">Total Price</th>
                                <th className="p-3 text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map((order) => {
                                const villa = villas.villas.find(v => v._id === order.villa);
                                return (
                                    <tr key={order._id} className="border-b border-gray-700 hover:bg-gray-700 transition">
                                        <td className="p-3">{order._id}</td>
                                        <td className="p-3">{villa ? villa.name : "Unknown Villa"}</td>
                                        <td className="p-3">
                                            <span className={`px-2 py-1 text-sm font-bold rounded-lg ${
                                                order.status === "Pending" ? "bg-yellow-500 text-black" :
                                                order.status === "Completed" ? "bg-green-500 text-white" :
                                                "bg-red-500 text-white"
                                            }`}>
                                                {order.status}
                                            </span>
                                        </td>
                                        <td className="p-3">{order.totalPrice.toLocaleString("vi-VN")} VND</td>
                                        <td className="p-3 text-center">
                                            <button
                                                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition"
                                                onClick={() => fetchBookingDetails(order._id)}
                                            >
                                                View Details
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            )}

            {/* Modal hiển thị chi tiết booking */}
            {isModalOpen && selectedBooking && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-gray-900 p-6 rounded-lg w-96 shadow-lg">
                        <h3 className="text-2xl font-bold mb-4">Booking Details</h3>
                        {loadingDetails ? (
                            <p>Loading details...</p>
                        ) : (
                            <div>
                                <p><strong>Order ID:</strong> {selectedBooking._id}</p>
                                <p><strong>Villa:</strong> {selectedBooking.villaName}</p>
                                <p><strong>Check-in:</strong> {new Date(selectedBooking.checkInDate).toLocaleDateString()}</p>
                                <p><strong>Check-out:</strong> {new Date(selectedBooking.checkOutDate).toLocaleDateString()}</p>
                                <p><strong>Total Price:</strong> {selectedBooking.totalPrice.toLocaleString("vi-VN")} VND</p>
                                <p><strong>Guests:</strong> {selectedBooking.numberOfPeople}</p>
                                <p><strong>Status:</strong> {selectedBooking.status}</p>
                                <p><strong>Payment Method:</strong> {(selectedBooking.paymentMethod === undefined)? "Unknown Payment Method" : `${selectedBooking.paymentMethod.toUppercase()}`}</p>
                                <p><strong>Payment Status:</strong> {selectedBooking.payment.status}</p>
                                <p><strong>Customer Name:</strong> {selectedBooking.user.fullName}</p>
                                <p><strong>Phone:</strong> {selectedBooking.user.phoneNumber}</p>
                                <button
                                    className="mt-4 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md transition w-full"
                                    onClick={() => setIsModalOpen(false)}
                                >
                                    Close
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
