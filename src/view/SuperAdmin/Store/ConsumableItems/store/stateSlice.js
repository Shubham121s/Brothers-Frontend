import { createSlice } from "@reduxjs/toolkit";

const stateSlice = createSlice({
  name: "unusedItem/state",
  initialState: {
    deleteConfirmation: false,
    itemNewDialog: false,
    itemEditDialog: false,
    selectedItem: {},
  },
  reducers: {
    toggleDeleteConfirmation: (state, action) => {
      state.deleteConfirmation = action.payload;
    },
    toggleItemNewDialog: (state, action) => {
      state.itemNewDialog = action.payload;
    },
    toggleItemEditDialog: (state, action) => {
      state.itemEditDialog = action.payload;
    },
    setSelectedItem: (state, action) => {
      state.selectedItem = action.payload;
    },
  },
});

export const {
  toggleDeleteConfirmation,
  toggleItemNewDialog,
  toggleItemEditDialog,
  setSelectedItem,
} = stateSlice.actions;

export default stateSlice.reducer;
