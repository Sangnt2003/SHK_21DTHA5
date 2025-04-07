import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { get } from "http";

interface AuthState {
    user: any | null;
    loading: boolean;
    error: string | null;
    jwt: string | null;
    bookings: any [] | null;
}

const initialState: AuthState = {
    user: null,
    loading: false,
    error: null,
    jwt: typeof window !== "undefined" ? localStorage.getItem("jwt") : null,
    bookings: []
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (state, action: PayloadAction<{ token: string }>) => {
            state.jwt = action.payload.token;
            state.loading = false;
            state.error = null;
        },
        logout: (state) => {
            state.jwt = null;
            state.user = null;
        },
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload;
        },
        setError: (state, action: PayloadAction<string | null>) => {
            state.error = action.payload;
            state.user = null
            state.jwt = null
            localStorage.removeItem('jwt')
        },
        getUser: (state, action: PayloadAction<any>) => {
            console.log("Updating user state with:", action.payload);
            state.user = action.payload;
            state.loading = false;
            state.error = null;
        },
        getUserBooking: (state, action: PayloadAction<any>) => {
            console.log("booking user: ",action.payload);
            state.bookings = action.payload;
            state.loading = false;
            state.error = null;
        },
        register: (state, action: PayloadAction<any>) => {
            state.jwt = action.payload.token;
            state.loading = false;
            state.error = null;
        }
        
    },
});

export const { login, logout, setLoading, setError, getUser, getUserBooking, register } = authSlice.actions;
export default authSlice.reducer;
