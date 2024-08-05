import { createSlice } from "@reduxjs/toolkit";

const stateSlice = createSlice({
  name: "customers/data",
  initialState: {
    deleteConfirmation: false,
    selectedCustomer: {},
  },
  reducers: {
    togglDeleteConfirmationDialog: (state, action) => {
      state.deleteConfirmation = action.payload;
    },
    setSelectedCustomer: (state, action) => {
      state.selectedCustomer = action.payload;
    },
  },
});

export const { setSelectedCustomer, togglDeleteConfirmationDialog } =
  stateSlice.actions;

export default stateSlice.reducer;
