import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { apiGetAllCustomers } from "../../../../../services/SuperAdmin/Customer/CustomerService";
import { apiGetAllCategories } from "../../../../../services/SuperAdmin/Product/CategoryService";
import {
  apiGetAllStockData,
  apiNewPurchaseOrderoRegister,
} from "../../../../../services/SuperAdmin/Stock/StockService";

export const getAllCustomers = createAsyncThunk(
  "new/po/data/customer/all",
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
  "new/po/data/product/all",
  async (data) => {
    try {
      const response = await apiGetAllStockData(data);
      return response;
    } catch (error) {
      return error?.response;
    }
  }
);

export const postNewPoRegister = createAsyncThunk(
  "new/po/data/po/register",
  async (data) => {
    try {
      const response = await apiNewPurchaseOrderoRegister(data);
      return response;
    } catch (error) {
      return error?.response;
    }
  }
);

export const getAllCategories = createAsyncThunk(
  "new/po/data/po/category/all",
  async (data) => {
    try {
      const response = await apiGetAllCategories(data);
      return response;
    } catch (error) {
      return error?.response;
    }
  }
);

const dataSlice = createSlice({
  name: "new/po/data",
  initialState: {
    customers: [],
    products: [],
    categoryList: [],
  },
  extraReducers: {
    [getAllCustomers.fulfilled]: (state, action) => {
      state.customers = action.payload.data?.data || [];
    },
    [postNewPoRegister.fulfilled]: (state) => {},
    [getAllProductsWithDrawing.fulfilled]: (state, action) => {
      state.products = action.payload.data?.data || [];
    },
    [getAllCategories.fulfilled]: (state, action) => {
      state.categoryList = action.payload?.data?.data || [];
    },
  },
});

export default dataSlice.reducer;
