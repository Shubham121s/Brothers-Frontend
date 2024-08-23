import { createSlice } from "@reduxjs/toolkit";

const stateSlice = createSlice({
  name: "enquiry/state",
  initialState: {
    deleteConfirmation: false,
    selectedEnquiry: {},
    openDrawer: false,
    openEditDrawer: false,
  },
  reducers: {
    togglDeleteConfirmationDialog: (state, action) => {
      state.deleteConfirmation = action.payload;
    },
    toggleDrawer: (state, action) => {
      state.openDrawer = action.payload;
    },
    toggleEditDrawer: (state, action) => {
      state.openEditDrawer = action.payload;
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
  toggleEditDrawer,
} = stateSlice.actions;

export default stateSlice.reducer;
