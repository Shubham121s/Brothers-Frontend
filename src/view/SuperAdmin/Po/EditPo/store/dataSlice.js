import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { apiGetAllCustomers } from "../../../../../services/SuperAdmin/Customer/CustomerService";
import { apiGetAllProductsWithDrawing } from "../../../../../services/SuperAdmin/Product/IndexService";
import { apiUpdatePo } from "../../../../../services/SuperAdmin/Po/PoService";
import { apiGetPoDetailsByPoId } from "../../../../../services/SuperAdmin/Po/PoService";

export const getPoDetailsByPoId = createAsyncThunk(
  "po/details/data/details",
  async (data) => {
    try {
      const response = await apiGetPoDetailsByPoId(data);
      return response;
    } catch (error) {
      return error.response;
    }
  }
);

export const getAllCustomers = createAsyncThunk(
  "edit/po/data/customer/all",
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
  "edit/po/data/product/all",
  async () => {
    try {
      const response = await apiGetAllProductsWithDrawing();
      return response;
    } catch (error) {
      return error?.response;
    }
  }
);

export const postUpdatePo = createAsyncThunk(
  "edit/po/data/po/update",
  async (data) => {
    try {
      const response = await apiUpdatePo(data);
      return response;
    } catch (error) {
      return error?.response;
    }
  }
);

const dataSlice = createSlice({
  name: "edit/po/data",
  initialState: {
    customers: [],
    products: [],
    poDetails: {},
  },
  extraReducers: {
    [getPoDetailsByPoId.fulfilled]: (state, action) => {
      state.poDetails = {
        ...action.payload.data.data,
        PoLists: action.payload.data.data.PoLists.map((f) => {
          return { ...f, revision_number: f.Drawing.revision_number };
        }),
      };
    },
    [getAllCustomers.fulfilled]: (state, action) => {
      state.customers = action.payload.data?.data || [];
    },
    [postUpdatePo.fulfilled]: (state) => {},
    [getAllProductsWithDrawing.fulfilled]: (state, action) => {
      state.products = action.payload.data?.data || [];
    },
  },
});

export default dataSlice.reducer;
