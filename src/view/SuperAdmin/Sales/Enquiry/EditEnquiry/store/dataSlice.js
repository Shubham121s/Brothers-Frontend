import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { apiGetAllCustomers } from "../../../../../../services/SuperAdmin/Customer/CustomerService";
import { apiGetAllProductsWithDrawing } from "../../../../../../services/SuperAdmin/Product/IndexService";
import {
  apiPostNewEnquiry,
  apiGetEnquiryById,
} from "../../../../../../services/SuperAdmin/Sales/enquiry";

export const getAllCustomers = createAsyncThunk(
  "edit/enquiry/data/customer/all",
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
  "edit/enquiry/data/product/all",
  async () => {
    try {
      const response = await apiGetAllProductsWithDrawing();
      return response;
    } catch (error) {
      return error?.response;
    }
  }
);

export const getEnquiryById = createAsyncThunk(
  "edit/enquiry/data/get",
  async (data) => {
    try {
      const response = await apiGetEnquiryById(data);
      return response;
    } catch (error) {
      return error?.response;
    }
  }
);

export const postNewEnquiry = createAsyncThunk(
  "edit/enquiry/data/register",
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
  name: "edit/enquiry/data",
  initialState: {
    customers: [],
    products: [],
    enquiry: {},
  },
  extraReducers: {
    [getAllCustomers.fulfilled]: (state, action) => {
      state.customers = action.payload.data?.data || [];
    },
    [postNewEnquiry.fulfilled]: (state) => {},
    [getAllProductsWithDrawing.fulfilled]: (state, action) => {
      state.products = action.payload.data?.data || [];
    },
    [getEnquiryById.fulfilled]: (state, action) => {
      state.enquiry = action.payload.data?.data || {};
    },
  },
});

export default dataSlice.reducer;
