import { createSlice } from "@reduxjs/toolkit";

const stateSlice = createSlice({
  name: "rawMaterial/state",
  initialState: {
    deleteConfirmation: false,
    newDialog: false,
    editDialog: false,

    passwordDialog: false,
    attendanceDialog: false,
    selectedRawMaterial: {},
  },
  reducers: {
    toggleDeleteConfirmation: (state, action) => {
      state.deleteConfirmation = action.payload;
    },
    toggleNewDialog: (state, action) => {
      state.newDialog = action.payload;
    },
    toggleEditDialog: (state, action) => {
      state.editDialog = action.payload;
    },

    togglePasswordDialog: (state, action) => {
      state.passwordDialog = action.payload;
    },
    setSelectedMaterial: (state, action) => {
      state.selectedRawMaterial = action.payload;
    },
  },
});

export const {
  toggleDeleteConfirmation,

  toggleAttendanceDialog,
  toggleNewDialog,
  togglePasswordDialog,
  toggleEditDialog,
  setSelectedMaterial,
} = stateSlice.actions;

export default stateSlice.reducer;
