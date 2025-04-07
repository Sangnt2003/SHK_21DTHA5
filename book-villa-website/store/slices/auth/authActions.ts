import { createAsyncThunk } from "@reduxjs/toolkit";
import {  login, logout, setError, setLoading, getUser, getUserBooking, register } from "./authSlice";

// API Login
export const loginAsync = createAsyncThunk(
  "auth/login",
  async ({ email, password }: { email: string; password: string }, { dispatch, rejectWithValue }) => {
    try {
      dispatch(setLoading(true));

      const response = await fetch("/api/authentications/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const result = await response.json();

      if (!response.ok || !result.status) {
        throw new Error(result.message || "Login failed");
      }

      const token = result.data.token;

      // Lưu token vào localStorage
      localStorage.setItem("jwt", token);

      dispatch(login({ token})); // Cập nhật state
      return token;
    } catch (error: any) {
      dispatch(setError(error.message));
      return rejectWithValue(error.message);
    } finally {
      dispatch(setLoading(false));
    }
  }
);

// API Register
export const registerAsync = createAsyncThunk(
  "auth/register",
  async ({ email, password, fullName }: { email: string; password: string, fullName: string }, { dispatch, rejectWithValue }) => {
    try {
      dispatch(setLoading(true));

      const response = await fetch("/api/authentications/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, fullName }),
      });

      const result = await response.json();

      if (!response.ok || !result.status) {
        throw new Error(result.message || "Login failed");
      }

      const token = result.data.token;

      // Lưu token vào localStorage
      localStorage.setItem("jwt", token);

      dispatch(register({ token })); // Cập nhật state
      return token;
    } catch (error: any) {
      dispatch(setError(error.message));
      return rejectWithValue(error.message);
    } finally {
      dispatch(setLoading(false));
    }
  }
);

// API Logout
export const logoutAsync = createAsyncThunk("auth/logout", async (_, { dispatch }) => {
  // Xóa token khỏi localStorage
  localStorage.removeItem("jwt");

  dispatch(logout());
});

export const getUserAsync = createAsyncThunk("auth/getUser",async (_, { dispatch }) => {
    const jwt = localStorage.getItem("jwt");
    console.log("jwt: ", jwt)
    if (!jwt) {
        dispatch(logout());
        return;
    }
    try {
        dispatch(setLoading(true));
        const response = await fetch("/api/authentications", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${jwt}`,
            },
        });

        const result = await response.json();
        const data = result.data
        console.log("get user profile: ", data)
        if (!response.ok || !result.status) {
            throw new Error(result.message || "Failed to fetch user");
        }

        dispatch(getUser(data));
        return data
    }
    catch (error: any) {
        dispatch(setError(error.message));
    }
})

export const getUserBookingAsync = createAsyncThunk("auth/getUserBooking",async (_, { dispatch }) => {
  const jwt = localStorage.getItem("jwt");
  if (!jwt) {
      dispatch(logout());
      return;
  }
  try {
      dispatch(setLoading(true));
      const response = await fetch("/api/booking", {
          method: "GET",
          headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${jwt}`,
          },
      });

      const result = await response.json();
      console.log("result booking: ", result.data);
      if (!response.ok || !result.status) {
          throw new Error(result.message || "Failed to fetch bookings");
      }
     
      dispatch(getUserBooking(result.data));
      return result.data;
  }
  catch (error: any) {
      dispatch(setError(error.message));
  }
})
