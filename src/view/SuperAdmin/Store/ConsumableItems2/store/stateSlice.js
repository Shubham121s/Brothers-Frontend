import { createSlice } from "@reduxjs/toolkit";

const stateSlice = createSlice({
  name: "consumableItem/state",
  initialState: {
    deleteConfirmation: false,
    consumablenewDialog: false,
    consumableEditDialog: false,
    selectedConsumableItem: {},
  },
  reducers: {
    toggleDeleteConfirmation: (state, action) => {
      state.deleteConfirmation = action.payload;
    },
    toggleNewDialog: (state, action) => {
      state.consumablenewDialog = action.payload;
    },
    toggleEditDialog: (state, action) => {
      state.consumableEditDialog = action.payload;
    },

    togglePasswordDialog: (state, action) => {
      state.passwordDialog = action.payload;
    },
    setSelectedConsumableItem: (state, action) => {
      state.selectedConsumableItem = action.payload;
    },
  },
});

export const {
  toggleDeleteConfirmation,

  toggleAttendanceDialog,
  toggleNewDialog,
  togglePasswordDialog,
  toggleEditDialog,
  setSelectedConsumableItem,
} = stateSlice.actions;

export default stateSlice.reducer;
