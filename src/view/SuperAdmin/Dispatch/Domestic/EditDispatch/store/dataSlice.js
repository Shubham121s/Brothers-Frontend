import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  apiGetDispatchDomesticInvoiceByInvoiceId,
  apiUpdateDispatchListByDispatchListId,
  apiDeleteDispatchListByDispatchListId,
  apiPutDispatchDomesticInvoiceByInvoiceId,
} from "../../../../../../services/SuperAdmin/Invoice/DispatchServices";

export const getDomesticInvoiceDetailsByInvoiceId = createAsyncThunk(
  "edit/domestic/invoice/data/details",
  async (data) => {
    try {
      const response = await apiGetDispatchDomesticInvoiceByInvoiceId(data);
      return response;
    } catch (error) {
      return error?.response;
    }
  }
);

export const putDomesticInvoiceDetailsByInvoiceId = createAsyncThunk(
  "edit/domestic/invoice/data/update/charges",
  async (data) => {
    try {
      const response = await apiPutDispatchDomesticInvoiceByInvoiceId(data);
      return response;
    } catch (error) {
      return error?.response;
    }
  }
);

export const updateDispatchListByDispatchListId = createAsyncThunk(
  "edit/domestic/invoice/data/list/update",
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
  "edit/domestic/invoice/data/list/delete",
  async (data) => {
    try {
      const response = await apiDeleteDispatchListByDispatchListId(data);
      return response;
    } catch (error) {
      return error?.response;
    }
  }
);

const dataSlice = createSlice({
  name: "edit/domestic/invoice/data",
  initialState: {
    invoiceDetails: {},
    loading: false,
    poList: [],
  },
  reducers: {},
  extraReducers: {
    [getDomesticInvoiceDetailsByInvoiceId.fulfilled]: (state, action) => {
      state.invoiceDetails = action.payload.data?.data || {};
      state.loading = false;
    },
    [getDomesticInvoiceDetailsByInvoiceId.pending]: (state) => {
      state.invoiceDetails = {};
      state.loading = true;
    },
    [updateDispatchListByDispatchListId.fulfilled]: (state, action) => {},
    [deleteDispatchListByDispatchListId.fulfilled]: (state, action) => {},
    [putDomesticInvoiceDetailsByInvoiceId.fulfilled]: (state, action) => {},
  },
});

export default dataSlice.reducer;
