import { createAsyncThunk } from "@reduxjs/toolkit";
import { getAllCategories, getAllVillas, getVillaDetails, setError, setLoading } from "./villasSlice";


export const getAllVillasAsync = createAsyncThunk(
  "villas/getAllVillas",
  async (_, { dispatch }) => {
    try {
      dispatch(setLoading(true));

      const response = await fetch("/api/villas", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      const result = await response.json();
      const data = result.data;
      console.log("call api ", data);
      dispatch(getAllVillas(data)); // Dispatch the array directly
      return result;
    } catch (error: any) {
      dispatch(setError(error.message));
    } finally {
      dispatch(setLoading(false));
    }
  }
);


export const getAllCategoriesAsync = createAsyncThunk(
  "villas/getAllCategories",
  async (_, { dispatch }) => {
    try {
      dispatch(setLoading(true));

      const response = await fetch("/api/categories", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      const result = await response.json();
      const data = result.data;
      console.log("call api ", data);
      dispatch(getAllCategories(data)); // Dispatch the array directly
      return result;
    } catch (error: any) {
      dispatch(setError(error.message));
    } finally {
      dispatch(setLoading(false));
    }
  }
);

export const getVillaDetailsAsync = createAsyncThunk(
  "villas/getAllCategories",
  async ({ id }: { id: any}, { dispatch }) => {
    try {
      dispatch(setLoading(true));

      const response = await fetch(`/api/villas/${id}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      const result = await response.json();
      const data = result.data;
      console.log("villa detail ", data);
      dispatch(getVillaDetails(data)); // Dispatch the array directly
      return result;
    } catch (error: any) {
      dispatch(setError(error.message));
    } finally {
      dispatch(setLoading(false));
    }
  }
);
