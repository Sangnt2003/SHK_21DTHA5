
import { createAsyncThunk } from "@reduxjs/toolkit";
import { getAllOrdersManager, setError, setLoading } from "./ordersSlice";

export const getAllOrdersManagerAsync = createAsyncThunk("order-manager/getAllOrdersManager",async (_, { dispatch }) => {
    const jwt = localStorage.getItem("jwt");
    console.log("jwt: ", jwt)
    
    try {
        dispatch(setLoading(true));
        const response = await fetch("/api/manager/bookings", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${jwt}`,
            },
        });

        const result = await response.json();
        const data = result.data
        console.log("get orders profile: ", result)
        if (!response.ok || !result.status) {
            throw new Error(result.message || "Failed to fetch user");
        }

        dispatch(getAllOrdersManager(data));
        return data
    }
    catch (error: any) {
        dispatch(setError(error.message));
    }
})