import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { apiGetAllCustomers } from "../../../../../../services/SuperAdmin/Customer/CustomerService";
import { apiGetAllProductsWithDrawing } from "../../../../../../services/SuperAdmin/Product/IndexService";
import { apiPostNewEnquiry } from "../../../../../../services/SuperAdmin/Sales/enquiry";

export const getAllCustomers = createAsyncThunk(
  "new/quotation/data/customer/all",
  async () => {
    try {
      const response = await apiGetAllCustomers();
      return response;
    } catch (error) {
      return error?.response;
    }
  }
);

export const getAllProductsWithDrawing = createAsyncThunk(
  "new/quotation/data/product/all",
  async () => {
    try {
      const response = await apiGetAllProductsWithDrawing();
      return response;
    } catch (error) {
      return error?.response;
    }
  }
);

export const postNewEnquiry = createAsyncThunk(
  "new/quotation/data/register",
  async (data) => {
    try {
      const response = await apiPostNewEnquiry(data);
      return response;
    } catch (error) {
      return error?.response;
    }
  }
);

const dataSlice = createSlice({
  name: "new/quotation/data",
  initialState: {
    customers: [],
    products: [],
  },
  extraReducers: {
    [getAllCustomers.fulfilled]: (state, action) => {
      state.customers = action.payload.data?.data || [];
    },
    [postNewEnquiry.fulfilled]: (state) => {},
    [getAllProductsWithDrawing.fulfilled]: (state, action) => {
      state.products = action.payload.data?.data || [];
    },
  },
});

export default dataSlice.reducer;
