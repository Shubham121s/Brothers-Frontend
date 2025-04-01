import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  apiGetDispatchDomesticInvoiceByInvoiceId,
  apiUpdateDispatchListByDispatchListId,
  apiDeleteDispatchListByDispatchListId,
  apiPutDispatchDomesticInvoiceByInvoiceId,
  apiUpdateDispatchListAddProduct,
  apiGetDispatchPatterInvoiceByInvoiceId,
  apiAddPatternProductToInvoice,
  apiDeletePatternProductToInvoice,
  updatePatterInvoiceById,
} from "../../../../../../services/SuperAdmin/Invoice/DispatchServices";
import { apiGetAllPosByCustomerId } from "../../../../../../services/SuperAdmin/Po/PoService";

export const getPatternInvoiceDetailsByInvoiceId = createAsyncThunk(
  "edit/pattern/invoice/data/details",
  async (data) => {
    try {
      const response = await apiGetDispatchPatterInvoiceByInvoiceId(data);
      return response;
    } catch (error) {
      return error?.response;
    }
  }
);

export const putPatternInvoiceDetailsByInvoiceId = createAsyncThunk(
  "edit/pattern/invoice/data/update/charges",
  async (data) => {
    try {
      const response = await apiPutDispatchDomesticInvoiceByInvoiceId(data);
      return response;
    } catch (error) {
      return error?.response;
    }
  }
);

export const updatePatternInvoiceById = createAsyncThunk(
  "edit/pattern/invoice/data/update/id",
  async (data) => {
    try {
      const response = await updatePatterInvoiceById(data);
      return response;
    } catch (error) {
      return error?.response;
    }
  }
);

export const updateDispatchListByDispatchListId = createAsyncThunk(
  "edit/pattern/invoice/data/list/update",
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
  "edit/pattern/invoice/data/list/delete",
  async (data) => {
    try {
      const response = await apiDeleteDispatchListByDispatchListId(data);
      return response;
    } catch (error) {
      return error?.response;
    }
  }
);

export const getAllPosByCustomerId = createAsyncThunk(
  "edit/pattern/invoice/data/po/all",
  async (data) => {
    try {
      const response = await apiGetAllPosByCustomerId(data);
      return response;
    } catch (error) {
      return error?.response;
    }
  }
);

export const addProductToInvoice = createAsyncThunk(
  "edit/pattern/invoice/data/add/product",
  async (data) => {
    try {
      const response = await apiUpdateDispatchListAddProduct(data);
      return response;
    } catch (error) {
      return error?.response;
    }
  }
);

export const addPatternProductToInvoice = createAsyncThunk(
  "edit/pattern/invoice/data/add/product",
  async (data) => {
    try {
      const response = await apiAddPatternProductToInvoice(data);
      return response;
    } catch (error) {
      return error?.response;
    }
  }
);

export const deletePatternProductToInvoice = createAsyncThunk(
  "edit/pattern/invoice/data/delete",
  async (data) => {
    try {
      const response = await apiDeletePatternProductToInvoice(data);
      return response;
    } catch (error) {
      return error?.response;
    }
  }
);

const dataSlice = createSlice({
  name: "edit/pattern/invoice/data",
  initialState: {
    invoiceDetails: {},
    loading: false,
    poList: [],
  },
  reducers: {},
  extraReducers: {
    [getPatternInvoiceDetailsByInvoiceId.fulfilled]: (state, action) => {
      state.invoiceDetails = action.payload.data?.data || {};
      state.loading = false;
    },
    [getPatternInvoiceDetailsByInvoiceId.pending]: (state) => {
      state.invoiceDetails = {};
      state.loading = true;
    },
    [updateDispatchListByDispatchListId.fulfilled]: (state, action) => {},
    [deleteDispatchListByDispatchListId.fulfilled]: (state, action) => {},
    [putPatternInvoiceDetailsByInvoiceId.fulfilled]: (state, action) => {},
    [getAllPosByCustomerId.fulfilled]: (state, action) => {
      state.poList = action.payload.data?.data || [];
    },
    [getAllPosByCustomerId.pending]: (state, action) => {
      state.poList = [];
    },
    [addProductToInvoice.fulfilled]: (state, action) => {},
    [updatePatternInvoiceById.fulfilled]: (state, action) => {},
  },
});

export default dataSlice.reducer;
