import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  apiUpdateCustomer,
  apiGetCustomerDetailsByCustomerId,
} from "../../../../../services/SuperAdmin/Customer/CustomerService";

export const updateCustomer = createAsyncThunk(
  "customer/edit/data/customer",
  async (data) => {
    try {
      const response = await apiUpdateCustomer(data);
      return response;
    } catch (error) {
      return error?.response;
    }
  }
);

export const getCustomerDetails = createAsyncThunk(
  "customer/get/data/customer",
  async (data) => {
    try {
      const response = await apiGetCustomerDetailsByCustomerId(data);
      return response;
    } catch (error) {
      return error?.response;
    }
  }
);

const dataSlice = createSlice({
  name: "customer/edit/data",
  initialState: {
    customerDetails: {},
  },
  reducers: {},
  extraReducers: {
    [updateCustomer.fulfilled]: (state) => {},
    [getCustomerDetails.fulfilled]: (state, action) => {
      state.customerDetails = action.payload.data.data || {};
    },
  },
});

export default dataSlice.reducer;
