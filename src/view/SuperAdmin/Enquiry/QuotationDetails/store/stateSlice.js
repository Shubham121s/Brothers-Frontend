import { createSlice } from "@reduxjs/toolkit";

const stateSlice = createSlice({
  name: "quotation/accept/state",
  initialState: {
    deletePoItemDialog: false,
    openDialog: false,
    selectedQuotation: {},
  },
  reducers: {
    toggleDeletePoItemDialog: (state, action) => {
      state.deletePoItemDialog = action.payload;
    },
    toggleQuotationDialog: (state, action) => {
      state.openDialog = action.payload;
    },

    setSelectedQuotation: (state, action) => {
      state.selectedQuotation = action.payload;
    },
  },
});

export const { toggleQuotationDialog, setSelectedQuotation } =
  stateSlice.actions;

export default stateSlice.reducer;
