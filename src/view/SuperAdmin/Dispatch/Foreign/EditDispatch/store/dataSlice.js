import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  apiGetDispatchForeignInvoiceByInvoiceId,
  apiUpdateDispatchListByDispatchListId,
  apiDeleteDispatchListByDispatchListId,
  apiUpdateForeignInvoiceDate,
} from "../../../../../../services/SuperAdmin/Invoice/DispatchServices";
import { apiGetAllPosByCustomerId } from "../../../../../../services/SuperAdmin/Po/PoService";

export const getForeignInvoiceDetailsByInvoiceId = createAsyncThunk(
  "edit/foreign/invoice/data/details",
  async (data) => {
    try {
      const response = await apiGetDispatchForeignInvoiceByInvoiceId(data);
      return response;
    } catch (error) {
      return error?.response;
    }
  }
);

export const updateDispatchListByDispatchListId = createAsyncThunk(
  "edit/foreign/invoice/data/list/update",
  async (data) => {
    try {
      const response = await apiUpdateDispatchListByDispatchListId(data);
      return response;
    } catch (error) {
      return error?.response;
    }
  }
);

export const deleteDispatchListByDispatchListId = createAsyncThunk(
  "edit/foreign/invoice/data/list/delete",
  async (data) => {
    try {
      const response = await apiDeleteDispatchListByDispatchListId(data);
      return response;
    } catch (error) {
      return error?.response;
    }
  }
);

export const UpdateForeignInvoiceDate = createAsyncThunk(
  "edit/foreign/invoice/date/update",
  async (data) => {
    try {
      const response = await apiUpdateForeignInvoiceDate(data);
      return response;
    } catch (error) {
      return error?.response;
    }
  }
);

const dataSlice = createSlice({
  name: "edit/foreign/invoice/data",
  initialState: {
    invoiceDetails: {},
    loading: false,
    poList: [],
  },
  reducers: {},
  extraReducers: {
    [getForeignInvoiceDetailsByInvoiceId.fulfilled]: (state, action) => {
      state.invoiceDetails = action.payload.data?.data || {};
      state.loading = false;
    },
    [getForeignInvoiceDetailsByInvoiceId.pending]: (state) => {
      state.invoiceDetails = {};
      state.loading = true;
    },
    [updateDispatchListByDispatchListId.fulfilled]: (state, action) => {},
    [deleteDispatchListByDispatchListId.fulfilled]: (state, action) => {},
    [UpdateForeignInvoiceDate.fulfilled]: (state, action) => {},
  },
});

export default dataSlice.reducer;
