import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface OrdersManagerState {
    orders: any[] | null;
    loading: boolean;
    error: string | null;
}

const initialState: OrdersManagerState = {
    orders: [],
    loading: false,
    error: null,
};



const orderManagerSlice = createSlice({
    name: "order-manager",
    initialState,
    reducers: {
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload;
        },
        setError: (state, action: PayloadAction<string | null>) => {
            state.error = action.payload;
        },
        getAllOrdersManager: (state, action: PayloadAction<any>) => {
            console.log("get orders state with:", action.payload);
            state.orders = action.payload;
            state.loading = false;
            state.error = null;
        },
        
    },
});

export const { setLoading, setError, getAllOrdersManager } = orderManagerSlice.actions;
export default orderManagerSlice.reducer;
