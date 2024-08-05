import { createSlice } from "@reduxjs/toolkit";

const stateSlice = createSlice({
  name: "worker/state",
  initialState: {
    deleteConfirmation: false,
    newDialog: false,
    editDialog: false,
    passwordDialog: false,
    attendanceDialog: false,
    selectedWorker: {},
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
    toggleAttendanceDialog: (state, action) => {
      state.attendanceDialog = action.payload;
    },
    setSelectedWorker: (state, action) => {
      state.selectedWorker = action.payload;
    },
  },
});

export const {
  toggleDeleteConfirmation,
  toggleAttendanceDialog,
  toggleNewDialog,
  togglePasswordDialog,
  toggleEditDialog,
  setSelectedWorker,
} = stateSlice.actions;

export default stateSlice.reducer;
