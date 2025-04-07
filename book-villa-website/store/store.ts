import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/auth/authSlice";
import villasReducer from './slices/villas/villasSlice'
import orderManagerReducer from './slices/order-manager/ordersSlice'


export const store = configureStore({
  reducer: {
    auth: authReducer,
    villas: villasReducer,
    orderManager: orderManagerReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
