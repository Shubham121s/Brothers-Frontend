import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { apiGetAllCustomers } from "../../../../../services/SuperAdmin/Customer/CustomerService";
import { apiGetAllProductsWithDrawing } from "../../../../../services/SuperAdmin/Product/IndexService";
import { apiNewPoRegister } from "../../../../../services/SuperAdmin/Po/PoService";

export const getAllCustomers = createAsyncThunk(
  "new/enquiry/data/customer/all",
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
  "new/enquiry/data/product/all",
  async () => {
    try {
      const response = await apiGetAllProductsWithDrawing();
      return response;
    } catch (error) {
      return error?.response;
    }
  }
);

export const postNewPoRegister = createAsyncThunk(
  "new/enquiry/data/po/register",
  async (data) => {
    try {
      const response = await apiNewPoRegister(data);
      return response;
    } catch (error) {
      return error?.response;
    }
  }
);

const dataSlice = createSlice({
  name: "new/enquiry/data",
  initialState: {
    customers: [],
    products: [],
  },
  extraReducers: {
    [getAllCustomers.fulfilled]: (state, action) => {
      state.customers = action.payload.data?.data || [];
    },
    [postNewPoRegister.fulfilled]: (state) => {},
    [getAllProductsWithDrawing.fulfilled]: (state, action) => {
      state.products = action.payload.data?.data || [];
    },
  },
});

export default dataSlice.reducer;
