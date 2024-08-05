import { createSlice } from "@reduxjs/toolkit";

const stateSlice = createSlice({
  name: "product/datae",
  initialState: {
    deleteConfirmation: false,
    selectedProduct: {},
  },
  reducers: {
    togglDeleteConfirmationDialog: (state, action) => {
      state.deleteConfirmation = action.payload;
    },
    setSelectedProduct: (state, action) => {
      state.selectedProduct = action.payload;
    },
  },
});

export const { setSelectedProduct, togglDeleteConfirmationDialog } =
  stateSlice.actions;

export default stateSlice.reducer;
