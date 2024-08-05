import { createSlice } from "@reduxjs/toolkit";

const stateSlice = createSlice({
  name: "edit/foreign/invoice/state",
  initialState: {
    editDispatchItemDialog: false,
    deleteConfirmation: false,
    selectedDispatchItem: {},
  },
  reducers: {
    toggleEditDispatchItemDialog: (state, action) => {
      state.editDispatchItemDialog = action.payload;
    },
    togglDeleteConfirmationDialog: (state, action) => {
      state.deleteConfirmation = action.payload;
    },
    setSelectedDispatchItem: (state, action) => {
      state.selectedDispatchItem = action.payload;
    },
  },
});

export const {
  setSelectedDispatchItem,
  toggleEditDispatchItemDialog,
  togglDeleteConfirmationDialog,
} = stateSlice.actions;

export default stateSlice.reducer;
