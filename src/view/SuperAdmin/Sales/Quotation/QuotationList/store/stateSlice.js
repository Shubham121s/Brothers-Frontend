import { createSlice } from "@reduxjs/toolkit";

const stateSlice = createSlice({
  name: "quotation/state",
  initialState: {
    deleteConfirmation: false,
    selectedEnquiry: {},
    openDrawer: false,
  },
  reducers: {
    togglDeleteConfirmationDialog: (state, action) => {
      state.deleteConfirmation = action.payload;
    },
    toggleDrawer: (state, action) => {
      state.openDrawer = action.payload;
    },
    setSelectedEnquiry: (state, action) => {
      state.selectedEnquiry = action.payload;
    },
  },
});

export const {
  togglDeleteConfirmationDialog,
  setSelectedEnquiry,
  toggleDrawer,
} = stateSlice.actions;

export default stateSlice.reducer;
