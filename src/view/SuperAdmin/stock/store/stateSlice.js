import { createSlice } from "@reduxjs/toolkit";

const stateSlice = createSlice({
  name: "stock/state",
  initialState: {
    deleteConfirmation: false,
    addDialog: false,
    editDialog: false,
    selectedStock: {},
  },
  reducers: {
    toggleDeleteConfirmation: (state, action) => {
      state.deleteConfirmation = action.payload;
    },
    toggleAddDialog: (state, action) => {
      state.addDialog = action.payload;
    },
    toggleEditDialog: (state, action) => {
      state.editDialog = action.payload;
    },
    setSelectedStock: (state, action) => {
      state.selectedStock = action.payload;
    },
  },
});

export const {
  toggleDeleteConfirmation,
  setSelectedStock,
  toggleAddDialog,
  toggleEditDialog,
} = stateSlice.actions;

export default stateSlice.reducer;
