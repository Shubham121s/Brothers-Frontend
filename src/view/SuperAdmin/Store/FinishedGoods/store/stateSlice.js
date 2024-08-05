import { createSlice } from "@reduxjs/toolkit";

const stateSlice = createSlice({
  name: "finishGoods/state",
  initialState: {
    deleteConfirmation: false,
    goodsNewDialog: false,
    goodsEditDialog: false,
    selectedGood: {},
  },
  reducers: {
    toggleDeleteConfirmation: (state, action) => {
      state.deleteConfirmation = action.payload;
    },
    toggleGoodsNewDialog: (state, action) => {
      state.goodsNewDialog = action.payload;
    },
    toggleGoodsEditDialog: (state, action) => {
      state.goodsEditDialog = action.payload;
    },
    setSelectedGood: (state, action) => {
      state.selectedGood = action.payload;
    },
  },
});

export const {
  toggleDeleteConfirmation,
  toggleGoodsNewDialog,
  toggleGoodsEditDialog,
  setSelectedGood,
} = stateSlice.actions;

export default stateSlice.reducer;
