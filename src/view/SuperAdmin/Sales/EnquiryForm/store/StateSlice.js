import { createSlice } from "@reduxjs/toolkit";

const stateSlice = createSlice({
  name: "new/product/enquiry/state",
  initialState: {
    selectedEnquiryItem: [],
  },
  reducers: {
    setSelectedPoItem: (state, action) => {
      state.selectedEnquiryItem = [
        ...state.selectedEnquiryItem,
        action.payload,
      ];
    },
    deleteSelectedPoItem: (state, action) => {
      state.selectedEnquiryItem = state.selectedEnquiryItem.filter(
        (f) => action.payload !== f.Product?.product_id
      );
    },
  },
});

export const { setSelectedPoItem, deleteSelectedPoItem } = stateSlice.actions;

export default stateSlice.reducer;
