import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface VillasState {
    villas: any[] | null;
    loading: boolean;
    error: string | null;
    villaDetails: any | null;
    categories: any[] | null
}

const initialState: VillasState = {
    villas: [],
    loading: false,
    error: null,
    villaDetails: null,
    categories: []
  };
  
  const villasSlice = createSlice({
    name: "villas",
    initialState,
    reducers: {
      setLoading: (state, action: PayloadAction<boolean>) => {
        state.loading = action.payload;
      },
      setError: (state, action: PayloadAction<string | null>) => {
        state.error = action.payload;
      },
      getAllVillas: (state, action: PayloadAction<any[]>) => {
        state.villas = action.payload;
        state.loading = false;
        state.error = null;
      },
      getAllCategories: (state, action: PayloadAction<any[]>) => {
        state.categories = action.payload;
        state.loading = false;
        state.error = null;
      },
      getVillaDetails: (state, action: PayloadAction<any[]>) => {
        state.villaDetails = action.payload;
        state.loading = false;
        state.error = null;
      },
    },
  });
  

export const { setLoading, setError, getAllVillas, getAllCategories, getVillaDetails } = villasSlice.actions;
export default villasSlice.reducer;


