import { createSlice } from "@reduxjs/toolkit";

const stateSlice = createSlice({
  name: "edit/foreign/invoice/state",
  initialState: {
    editDispatchItemDialog: false,
    addDispatchItemDialog: { option: true, locationIndex: null },
    deleteConfirmation: false,
    selectedDispatchItem: {},
    newBoxDialog: false,
    editBoxDialog: false,
    deleteBoxDialog: false,
    selectedBox: {},
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
    toggleNewBoxDialog: (state, action) => {
      state.newBoxDialog = action.payload;
    },
    toggleDeleteBoxDialog: (state, action) => {
      state.deleteBoxDialog = action.payload;
    },
    toggleEditBoxDialog: (state, action) => {
      state.editBoxDialog = action.payload;
    },
    setSelectedBox: (state, action) => {
      state.selectedBox = action.payload;
    },
    toggleAddDispatchItemDialog: (state, action) => {
      state.addDispatchItemDialog = action.payload;
    },
  },
});

export const {
  setSelectedDispatchItem,
  toggleEditDispatchItemDialog,
  togglDeleteConfirmationDialog,
  setSelectedBox,
  toggleEditBoxDialog,
  toggleDeleteBoxDialog,
  toggleNewBoxDialog,
  toggleAddDispatchItemDialog,
} = stateSlice.actions;

export default stateSlice.reducer;
