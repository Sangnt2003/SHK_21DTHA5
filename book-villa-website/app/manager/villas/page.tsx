"use client"
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "store/hooks";
import { getAllVillasAsync } from "store/slices/villas/villasActions";

export default function VillasPage() {
    const dispatch = useAppDispatch();
    const { villas } = useAppSelector((state) => state.villas);
    const [currentPage, setCurrentPage] = useState(1);
    const villasPerPage = 5;
    const [categories, setCategories] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [editingVilla, setEditingVilla] = useState(null);
    const [formData, setFormData] = useState({
        name: "",
        location: "",
        images: [],
        description: "",
        phoneNumber: "",
        email: "",
        available: true,
        numberOfRooms: "",
        acreage: "",
        pool: false,
        price: "",
        maxPeople: "",
        category: ""
    });

    // Fetch all categories when the page loads
    useEffect(() => {
        async function fetchCategories() {
            const response = await fetch("http://localhost:3000/api/categories");
            const data = await response.json();
            setCategories(data);
        }
        fetchCategories();
    }, []);

    useEffect(() => {
        dispatch(getAllVillasAsync());
    }, [dispatch]);

    const handleEdit = (villa) => {
        setEditingVilla(villa);
        setFormData({ ...villa, images: [] });
        setShowModal(true);
    };

    const handleDelete = async (id) => {
        if (confirm("Are you sure you want to delete this villa?")) {
            await fetch(`http://localhost:3000/api/villas/${id}`, {
                method: "DELETE",
                headers: { Authorization: `Bearer YOUR_JWT_TOKEN` },
            });
            dispatch(getAllVillasAsync());
        }
    };

    const handleAdd = () => {
        setEditingVilla(null);
        setFormData({
            name: "",
            location: "",
            images: [],
            description: "",
            phoneNumber: "",
            email: "",
            available: true,
            numberOfRooms: "",
            acreage: "",
            pool: false,
            price: "",
            maxPeople: "",
            category: ""
        });
        setShowModal(true);
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({ ...formData, [name]: type === "checkbox" ? checked : value });
    };

    const handleFileChange = (e) => {
        const files = Array.from(e.target.files);
        setFormData({ ...formData, images: files });
    };

    const handleSave = async () => {
        const method = editingVilla ? "PUT" : "POST";
        const url = editingVilla
            ? `http://localhost:3000/api/villas/${editingVilla._id}`
            : "http://localhost:3000/api/villas";

        const formDataToSend = new FormData();
        Object.keys(formData).forEach((key) => {
            if (key !== "images") {
                formDataToSend.append(key, formData[key]);
            }
        });

        // Append images to formData
        formData.images.forEach((image) => {
            formDataToSend.append("images", image);
        });

        await fetch(url, {
            method,
            headers: {
                Authorization: `Bearer YOUR_JWT_TOKEN`,
            },
            body: formDataToSend,
        });
        setShowModal(false);
        dispatch(getAllVillasAsync());
    };

    const indexOfLastVilla = currentPage * villasPerPage;
    const indexOfFirstVilla = indexOfLastVilla - villasPerPage;
    const currentVillas = villas.slice(indexOfFirstVilla, indexOfLastVilla);

    return (
        <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center p-8">
            <h2 className="text-3xl font-bold mb-6">Manage Villas</h2>

            <button
                className="mb-4 px-4 py-2 bg-green-500 text-white rounded"
                onClick={handleAdd}
            >
                Add Villa
            </button>

            <div className="w-full max-w-5xl bg-gray-800 p-4 rounded-lg shadow-lg">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="border-b border-gray-600">
                            <th className="p-3">#</th>
                            <th className="p-3">Name</th>
                            <th className="p-3">Location</th>
                            <th className="p-3">Price</th>
                            <th className="p-3">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentVillas.map((villa, index) => (
                            <tr key={villa._id} className="border-b border-gray-700">
                                <td className="p-3">{indexOfFirstVilla + index + 1}</td>
                                <td className="p-3">{villa.name}</td>
                                <td className="p-3">{villa.location}</td>
                                <td className="p-3">{villa.price.toLocaleString("vi-VN")} VND</td>
                                <td className="p-3">
                                    <button className="px-3 py-2 bg-blue-500 text-white rounded mr-2" onClick={() => handleEdit(villa)}>Edit</button>
                                    <button className="px-3 py-2 bg-red-500 text-white rounded" onClick={() => handleDelete(villa._id)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-6 rounded-lg shadow-lg text-black">
                        <h2 className="text-xl font-bold mb-4">{editingVilla ? "Edit Villa" : "Add Villa"}</h2>

                        {/* Name */}
                        <input
                            className="w-full p-2 mb-2 border border-gray-300 rounded"
                            placeholder="Villa Name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                        />

                        {/* Location */}
                        <input
                            className="w-full p-2 mb-2 border border-gray-300 rounded"
                            placeholder="Location"
                            name="location"
                            value={formData.location}
                            onChange={handleChange}
                        />

                        {/* Images (Choose files, will handle upload later) */}
                        <input
                            type="file"
                            multiple
                            name="images"
                            onChange={handleFileChange}
                            className="w-full p-2 mb-2 border border-gray-300 rounded"
                        />

                        {/* Description */}
                        <textarea
                            className="w-full p-2 mb-2 border border-gray-300 rounded"
                            placeholder="Description"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                        />

                        {/* Phone Number */}
                        <input
                            className="w-full p-2 mb-2 border border-gray-300 rounded"
                            placeholder="Phone Number"
                            name="phoneNumber"
                            value={formData.phoneNumber}
                            onChange={handleChange}
                        />

                        {/* Email */}
                        <input
                            className="w-full p-2 mb-2 border border-gray-300 rounded"
                            placeholder="Email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                        />

                        {/* Available */}
                        <div className="mb-2">
                            <label>
                                <input
                                    type="checkbox"
                                    name="available"
                                    checked={formData.available}
                                    onChange={handleChange}
                                />
                                Available
                            </label>
                        </div>

                        {/* Number of Rooms */}
                        <input
                            className="w-full p-2 mb-2 border border-gray-300 rounded"
                            placeholder="Number of Rooms"
                            name="numberOfRooms"
                            value={formData.numberOfRooms}
                            onChange={handleChange}
                            type="number"
                        />

                        {/* Acreage */}
                        <input
                            className="w-full p-2 mb-2 border border-gray-300 rounded"
                            placeholder="Acreage"
                            name="acreage"
                            value={formData.acreage}
                            onChange={handleChange}
                            type="number"
                        />

                        {/* Pool */}
                        <div className="mb-2">
                            <label>
                                <input
                                    type="checkbox"
                                    name="pool"
                                    checked={formData.pool}
                                    onChange={handleChange}
                                />
                                Pool
                            </label>
                        </div>

                        {/* Price */}
                        <input
                            className="w-full p-2 mb-2 border border-gray-300 rounded"
                            placeholder="Price"
                            name="price"
                            value={formData.price}
                            onChange={handleChange}
                            type="number"
                        />

                        {/* Max People */}
                        <input
                            className="w-full p-2 mb-2 border border-gray-300 rounded"
                            placeholder="Max People"
                            name="maxPeople"
                            value={formData.maxPeople}
                            onChange={handleChange}
                            type="number"
                        />

                        {/* Category */}
                        <select
                            name="category"
                            className="w-full p-2 mb-2 border border-gray-300 rounded"
                            value={formData.category}
                            onChange={handleChange}
                        >
                            <option value="">Select Category</option>
                            {categories.map((cat) => (
                                <option key={cat._id} value={cat._id}>{cat.name}</option>
                            ))}
                        </select>

                        {/* Save Button */}
                        <button
                            className="px-4 py-2 bg-green-500 text-white rounded"
                            onClick={handleSave}
                        >
                            Save
                        </button>

                        {/* Close Button */}
                        <button
                            className="px-4 py-2 bg-red-500 text-white rounded ml-2"
                            onClick={() => setShowModal(false)}
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
