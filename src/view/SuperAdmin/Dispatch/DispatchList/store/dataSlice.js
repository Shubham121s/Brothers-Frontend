import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  apiGetAllDispatchInvoiceWithPagination,
  apiAddInvoiceDetails,
} from "../../../../../services/SuperAdmin/Invoice/DispatchServices";

export const getDispatchInvoiceWithPagination = createAsyncThunk(
  "dispatch/invoice/data/all",
  async (data) => {
    try {
      const response = await apiGetAllDispatchInvoiceWithPagination(data);
      return response;
    } catch (error) {
      return error?.response;
    }
  }
);

export const addDetails = createAsyncThunk(
  "dispatch/invoice/details/add",
  async (data) => {
    try {
      const response = await apiAddInvoiceDetails(data);
      return response;
    } catch (error) {
      return error?.response;
    }
  }
);

export const initialTableData = {
  total: 0,
  pageIndex: 1,
  pageSize: 10,
  query: "",
};

export const initialFilterData = {
  type: "",
};

const dataSlice = createSlice({
  name: "dispatch/invoice/data",
  initialState: {
    loading: false,
    dispatchInvoiceList: [],
    tableData: initialTableData,
    filterData: initialFilterData,
  },
  reducers: {
    setTableData: (state, action) => {
      state.tableData = action.payload;
    },
    setDispatchInvoiceList: (state, action) => {
      state.dispatchInvoiceList = action.payload;
    },
    setFilterData: (state, action) => {
      state.filterData = action.payload;
    },
  },
  extraReducers: {
    [getDispatchInvoiceWithPagination.fulfilled]: (state, action) => {
      state.dispatchInvoiceList = action.payload.data?.data;
      state.tableData.total = action.payload?.data?.total;
      state.loading = false;
    },
    [getDispatchInvoiceWithPagination.pending]: (state) => {
      state.loading = true;
    },
    [addDetails.fulfilled]: (state) => {},
  },
});

export const { setTableData, setDispatchInvoiceList, setFilterData } =
  dataSlice.actions;

export default dataSlice.reducer;
