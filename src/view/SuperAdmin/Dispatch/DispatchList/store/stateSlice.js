import { createSlice } from "@reduxjs/toolkit";

const stateSlice = createSlice({
  name: "dispatch/invoice/state",
  initialState: {
    invoiceDialog: false,
    detailDialog: false,
    selectedInvoice: {},
  },
  reducers: {
    toggleInvoiceDialog: (state, action) => {
      state.invoiceDialog = action.payload;
    },
    toggleDetailDialog: (state, action) => {
      state.detailDialog = action.payload;
    },
    setSelectedInvoice: (state, action) => {
      state.selectedInvoice = action.payload;
    },
  },
});

export const { toggleInvoiceDialog, setSelectedInvoice, toggleDetailDialog } =
  stateSlice.actions;

export default stateSlice.reducer;
