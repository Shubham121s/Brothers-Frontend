import { createSlice } from "@reduxjs/toolkit";

const stateSlice = createSlice({
  name: "po/data/list",
  initialState: {
    deleteConfirmation: false,
    selectedOrder: {},
  },
  reducers: {
    togglDeleteConfirmationDialog: (state, action) => {
      state.deleteConfirmation = action.payload;
    },
    setSelectedOrder: (state, action) => {
      state.selectedOrder = action.payload;
    },
  },
});

export const { setSelectedOrder, togglDeleteConfirmationDialog } =
  stateSlice.actions;

export default stateSlice.reducer;
