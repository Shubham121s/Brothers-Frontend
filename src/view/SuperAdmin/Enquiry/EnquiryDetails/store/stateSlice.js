import { createSlice } from "@reduxjs/toolkit";

const stateSlice = createSlice({
  name: "enquiry/accept/state",
  initialState: {
    deletePoItemDialog: false,
    addProductDialog: false,
    finishWeights: [],
    selectedProductItem: {},
    selectedProduct: [],
    selectedFabrication: [],
    selectedScrapFabrication: [],
  },
  reducers: {
    toggleDeletePoItemDialog: (state, action) => {
      state.deletePoItemDialog = action.payload;
    },
    toggleAddProductDialog: (state, action) => {
      state.addProductDialog = action.payload;
    },
    toggleFinishWeights: (state, action) => {
      const newItem = action.payload;
      const index = state.finishWeights.findIndex(
        (item) => item.drawing_number === newItem.drawing_number
      );

      if (index !== -1) {
        state.finishWeights.splice(index, 1);
      } else {
        state.finishWeights.push(newItem);
      }
    },
    setSelectedProductItem: (state, action) => {
      state.selectedProductItem = action.payload;
    },
    setSelectedProduct: (state, action) => {
      state.selectedProduct = [...state.selectedProduct, action.payload];
    },
    emptySelectedProduct: (state, action) => {
      state.selectedProduct = action.payload;
    },
    emptyFinishWeights: (state) => {
      state.finishWeights = [];
    },
    toggleDeleteSelectedProduct: (state, action) => {
      state.selectedProduct = state.selectedProduct.filter(
        (f) => f.enquiry_list_id !== action.payload.enquiry_list_id
      );
    },
    setSelectedFabrication: (state, action) => {
      state.selectedFabrication = [
        ...state.selectedFabrication,
        action.payload,
      ];
    },
    setSelectedScrapFabrication: (state, action) => {
      state.selectedScrapFabrication = [
        ...state.selectedScrapFabrication,
        action.payload,
      ];
    },
  },
});

export const {
  setSelectedProductItem,
  toggleAddProductDialog,
  toggleDeletePoItemDialog,
  setSelectedProduct,
  toggleDeleteSelectedProduct,
  toggleFinishWeights,
  setSelectedFabrication,
  setSelectedScrapFabrication,
  emptyFinishWeights,
  emptySelectedProduct,
} = stateSlice.actions;

export default stateSlice.reducer;
