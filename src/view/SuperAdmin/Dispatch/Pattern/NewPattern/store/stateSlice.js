import { createSlice } from "@reduxjs/toolkit";

const stateSlice = createSlice({
  name: "new/pattern/invoice/state",
  initialState: {
    addDispatchItemDialog: { option: false, locationIndex: null },
    editDispatchItemDialog: { option: false, locationIndex: null },
    deleteDispatchItemDialog: false,
    newBoxDialog: false,
    editBoxDialog: false,
    deleteBoxDialog: false,
    selectedBox: {},
    selectedDispatchItem: {},
  },
  reducers: {
    toggleAddDispatchItemDialog: (state, action) => {
      state.addDispatchItemDialog = action.payload;
    },
    toggleEditDispatchItemDialog: (state, action) => {
      state.editDispatchItemDialog = action.payload;
    },
    toggleDeleteDispatchItemDialog: (state, action) => {
      state.deleteDispatchItemDialog = action.payload;
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
  },
});

export const {
  setSelectedDispatchItem,
  toggleDeleteDispatchItemDialog,
  toggleAddDispatchItemDialog,
  setSelectedBox,
  toggleEditBoxDialog,
  toggleDeleteBoxDialog,
  toggleNewBoxDialog,
  toggleEditDispatchItemDialog,
} = stateSlice.actions;

export default stateSlice.reducer;
