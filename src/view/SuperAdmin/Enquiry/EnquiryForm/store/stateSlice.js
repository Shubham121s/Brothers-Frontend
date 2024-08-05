import { createSlice } from "@reduxjs/toolkit";

const stateSlice = createSlice({
  name: "newEnquiry/state",
  initialState: {
    deleteConfirmation: false,
    newDialog: false,
    reviewDialog: false,
    selectedProducts: [],
    savedReview: [],
    selectedType: {},
  },
  reducers: {
    toggleDeleteConfirmation: (state, action) => {
      state.deleteConfirmation = action.payload;
    },
    toggleNewDialog: (state, action) => {
      state.newDialog = action.payload;
    },
    toggleReviewDialog: (state, action) => {
      state.reviewDialog = action.payload;
    },
    toggleSetProduct: (state, action) => {
      state.selectedProducts = [...state.selectedProducts, action.payload];
    },
    toggleDeleteSelectedProduct: (state, action) => {
      state.selectedProducts = state.selectedProducts.filter(
        (f) => f.enquiry_list_id !== action.payload
      );
    },
    toggleEmptyProduct: (state, action) => {
      state.selectedProducts = [];
    },
    toggleSetProductType: (state, action) => {
      state.selectedType = action.payload;
    },
    toggleSetEnquiryReview: (state, action) => {
      state.savedReview = [...state.savedReview, action.payload];
    },
  },
});

export const {
  toggleDeleteConfirmation,
  toggleNewDialog,
  toggleSetProduct,
  toggleSetProductType,
  toggleReviewDialog,
  toggleEmptyProduct,
  toggleDeleteSelectedProduct,
  toggleSetEnquiryReview,
} = stateSlice.actions;

export default stateSlice.reducer;
