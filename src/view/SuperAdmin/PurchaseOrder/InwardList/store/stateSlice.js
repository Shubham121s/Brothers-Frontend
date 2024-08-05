import { createSlice } from "@reduxjs/toolkit";

const stateSlice = createSlice({
  name: "inward/data/list",
  initialState: {
    deletePoItemDialog: false,
    openDialog: false,
    selectedPurchase: {},
  },
  reducers: {
    toggleDeletePoItemDialog: (state, action) => {
      state.deletePoItemDialog = action.payload;
    },
    toggleDialog: (state, action) => {
      state.openDialog = action.payload;
    },

    setSelectedPurchase: (state, action) => {
      state.selectedPurchase = action.payload;
    },
  },
});

export const { toggleDialog, setSelectedPurchase } = stateSlice.actions;

export default stateSlice.reducer;
