import { createSlice } from "@reduxjs/toolkit";

const stateSlice = createSlice({
  name: "purchase/order/data/list",
  initialState: {
    deleteConfirmation: false,

    deletePoItemDialog: false,
    openDialog: false,
    selectedPurchase: {},
  },
  reducers: {
    toggleDeletePoItemDialog: (state, action) => {
      state.deletePoItemDialog = action.payload;
    },
    toggleDeleteConfirmation: (state, action) => {
      state.deleteConfirmation = action.payload;
    },
    toggleDialog: (state, action) => {
      state.openDialog = action.payload;
    },

    setSelectedPurchase: (state, action) => {
      state.selectedPurchase = action.payload;
    },
  },
});

export const { toggleDialog, setSelectedPurchase, toggleDeleteConfirmation } =
  stateSlice.actions;

export default stateSlice.reducer;
