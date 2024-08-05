import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import {
  apiPostInward,
  apiGetNewGRNNumber,
} from "../../../../../services/SuperAdmin/PruchaseOrder/InwardService";
import { apiGetPurchaseOrderDetailsByPurchaseORderId } from "../../../../../services/SuperAdmin/PruchaseOrder/PurchaseOrderService";

export const getPoDetailsByPoId = createAsyncThunk(
  "po/details/data/details",
  async (data) => {
    try {
      const response = await apiGetPurchaseOrderDetailsByPurchaseORderId(data);
      return response;
    } catch (error) {
      return error.response;
    }
  }
);

export const postInward = createAsyncThunk(
  "po/details/data/post",
  async (data) => {
    try {
      const response = await apiPostInward(data);
      return response;
    } catch (error) {
      return error.response;
    }
  }
);

export const getNewGRN = createAsyncThunk(
  "po/details/data/get/grn",
  async (data) => {
    try {
      const response = await apiGetNewGRNNumber();
      return response;
    } catch (error) {
      return error.response;
    }
  }
);

const dataSlice = createSlice({
  name: "inward/data",
  initialState: {
    poDetails: {},
    newGRN: "",
    loading: false,
  },
  reducers: {},
  extraReducers: {
    [getPoDetailsByPoId.fulfilled]: (state, action) => {
      state.loading = false;
      state.poDetails =
        {
          ...action.payload.data?.data,
          PurchaseOrderLists:
            action.payload?.data?.data?.PurchaseOrderLists?.map((m) => {
              return { ...m, actual_quantity: "", comments: "" };
            }),
        } || {};
    },
    [getPoDetailsByPoId.pending]: (state, action) => {
      state.loading = true;
    },
    [postInward.fulfilled]: (state, action) => {},
    [getNewGRN.fulfilled]: (state, action) => {
      state.newGRN = action.payload.data?.data || "";
    },
  },
});

export const {} = dataSlice.actions;

export default dataSlice.reducer;
