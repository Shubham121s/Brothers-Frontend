import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { apiGetAllCustomers } from "../../../../../services/SuperAdmin/Customer/CustomerService";
import { apiGetAllProductsWithDrawing } from "../../../../../services/SuperAdmin/Product/IndexService";
import { apiNewPoRegister } from "../../../../../services/SuperAdmin/Po/PoService";
import { apiGetUniquePONumber } from "../../../../../services/SuperAdmin/Po/PoService";
import {
  apiGetAllNotesWithOutPagination,
  apiGetAllConditionWithOutPagination,
} from "../../../../../services/SuperAdmin/Po/Note.Service";

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

export const getAllNotes = createAsyncThunk(
  "new/po/data/notes/all",
  async () => {
    try {
      const response = await apiGetAllNotesWithOutPagination();
      return response;
    } catch (error) {
      return error?.response;
    }
  }
);

export const getAllCondition = createAsyncThunk(
  "new/po/data/condition/all",
  async () => {
    try {
      const response = await apiGetAllConditionWithOutPagination();
      return response;
    } catch (error) {
      return error?.response;
    }
  }
);

export const getAllProductsWithDrawing = createAsyncThunk(
  "new/po/data/product/all",
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
  "new/po/data/po/register",
  async (data) => {
    try {
      const response = await apiNewPoRegister(data);
      return response;
    } catch (error) {
      return error?.response;
    }
  }
);

export const getUniquePoNumber = createAsyncThunk(
  "new/po/data/po/unique/number",
  async (data) => {
    try {
      const response = await apiGetUniquePONumber(data);
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
    notes: [],
    condition: [],
    number: "",
  },
  extraReducers: {
    [getAllCustomers.fulfilled]: (state, action) => {
      state.customers = action.payload.data?.data || [];
    },
    [getUniquePoNumber.fulfilled]: (state, action) => {
      state.number = action.payload.data?.data || "";
    },
    [postNewPoRegister.fulfilled]: (state) => {},
    [getAllProductsWithDrawing.fulfilled]: (state, action) => {
      state.products = action.payload.data?.data || [];
    },
    [getAllNotes.fulfilled]: (state, action) => {
      state.notes = action.payload.data?.data || [];
    },
    [getAllCondition.fulfilled]: (state, action) => {
      state.condition = action.payload.data?.data || [];
    },
  },
});

export default dataSlice.reducer;
