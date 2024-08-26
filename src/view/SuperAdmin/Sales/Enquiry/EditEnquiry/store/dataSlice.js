import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { apiGetAllCustomers } from "../../../../../../services/SuperAdmin/Customer/CustomerService";
import { apiGetAllProductsWithDrawing } from "../../../../../../services/SuperAdmin/Product/IndexService";
import {
  apiPostNewEnquiry,
  apiGetEnquiryById,
  apiUpdateEnquiry,
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

export const UpdateEnquiry = createAsyncThunk(
  "edit/enquiry/data/update",
  async (data) => {
    try {
      const response = await apiUpdateEnquiry(data);
      return response;
    } catch (error) {
      return error?.response;
    }
  }
);

const dataSlice = createSlice({
  name: "edit/enquiry/data",
  initialState: {
    loading: {
      getAllCustomers: true,
      getAllProductsWithDrawing: true,
      getEnquiryById: true,
    },
    customers: [],
    products: [],
    enquiry: {},
  },
  extraReducers: {
    [getAllCustomers.fulfilled]: (state, action) => {
      state.customers = action.payload.data?.data || [];
      state.loading.getAllCustomers = false;
    },
    [UpdateEnquiry.fulfilled]: (state) => {},
    [getAllProductsWithDrawing.fulfilled]: (state, action) => {
      state.products = action.payload.data?.data || [];
      state.loading.getAllProductsWithDrawing = false;
    },
    [getEnquiryById.fulfilled]: (state, action) => {
      state.enquiry = action.payload.data?.data || {};
      state.loading.getEnquiryById = false;
    },
  },
});

export default dataSlice.reducer;
