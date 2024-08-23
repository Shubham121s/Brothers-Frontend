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
    loading: {
      getAllCustomers: false,
      getUniquePoNumber: false,
      getAllProductsWithDrawing: false,
      getAllNotes: false,
      getAllCondition: false,
    },
    customers: [],
    products: [],
    notes: [],
    condition: [],
    number: "",
  },
  extraReducers: {
    // Pending states
    [getAllCustomers.pending]: (state) => {
      state.loading.getAllCustomers = true;
    },
    [getUniquePoNumber.pending]: (state) => {
      state.loading.getUniquePoNumber = true;
    },
    [getAllProductsWithDrawing.pending]: (state) => {
      state.loading.getAllProductsWithDrawing = true;
    },
    [getAllNotes.pending]: (state) => {
      state.loading.getAllNotes = true;
    },
    [getAllCondition.pending]: (state) => {
      state.loading.getAllCondition = true;
    },

    // Fulfilled states
    [getAllCustomers.fulfilled]: (state, action) => {
      state.loading.getAllCustomers = false;
      state.customers = action.payload.data?.data || [];
    },
    [getUniquePoNumber.fulfilled]: (state, action) => {
      state.loading.getUniquePoNumber = false;
      state.number = action.payload.data?.data || "";
    },
    [postNewPoRegister.fulfilled]: (state) => {},
    [getAllProductsWithDrawing.fulfilled]: (state, action) => {
      state.loading.getAllProductsWithDrawing = false;
      state.products = action.payload.data?.data || [];
    },
    [getAllNotes.fulfilled]: (state, action) => {
      state.loading.getAllNotes = false;
      state.notes = action.payload.data?.data || [];
    },
    [getAllCondition.fulfilled]: (state, action) => {
      state.loading.getAllCondition = false;
      state.condition = action.payload.data?.data || [];
    },

    // Rejected states
    [getAllCustomers.rejected]: (state) => {
      state.loading.getAllCustomers = false;
    },
    [getUniquePoNumber.rejected]: (state) => {
      state.loading.getUniquePoNumber = false;
    },
    [getAllProductsWithDrawing.rejected]: (state) => {
      state.loading.getAllProductsWithDrawing = false;
    },
    [getAllNotes.rejected]: (state) => {
      state.loading.getAllNotes = false;
    },
    [getAllCondition.rejected]: (state) => {
      state.loading.getAllCondition = false;
    },
  },
});

export default dataSlice.reducer;
