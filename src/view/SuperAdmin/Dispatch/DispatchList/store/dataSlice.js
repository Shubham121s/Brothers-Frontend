import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  apiGetAllDispatchInvoiceWithPagination,
  apiAddInvoiceDetails,
  apiDeleteInvoice,
  apiGetAllInvoiceNumber,
  apiGetAllCustomersOption,
  apiGetAllInvoiceDates,
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

export const deleteInvoice = createAsyncThunk(
  "dispatch/invoice/details/delete",
  async (data) => {
    try {
      const response = await apiDeleteInvoice(data);
      return response;
    } catch (error) {
      return error?.response;
    }
  }
);

export const getAllInvoiceNumber = createAsyncThunk(
  "dispatch/invoice/details/invoice/number",
  async (data) => {
    try {
      const response = await apiGetAllInvoiceNumber(data);
      return response;
    } catch (error) {
      return error?.response;
    }
  }
);

export const getAllCustomerName = createAsyncThunk(
  "dispatch/invoice/details/invoice/number",
  async (data) => {
    try {
      const response = await apiGetAllInvoiceNumber(data);
      return response;
    } catch (error) {
      return error?.response;
    }
  }
);

export const getAllCustomerOption = createAsyncThunk(
  "dispatch/invoice/details/customer/option",
  async (data) => {
    try {
      const response = await apiGetAllCustomersOption(data);
      return response;
    } catch (error) {
      return error?.response;
    }
  }
);

export const getAllInvoiceDate = createAsyncThunk(
  "dispatch/invoice/details/invoice/dates",
  async (data) => {
    try {
      const response = await apiGetAllInvoiceDates(data);
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
  customer: "",
  invoiceNumber: "",
};

export const initialFilterData = {
  type: "",
};

const dataSlice = createSlice({
  name: "dispatch/invoice/data",
  initialState: {
    loading: false,
    dispatchInvoiceList: [],
    invoiceNumberList: [],
    invoiceDateList: [],
    customerOption: [],
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

    [getAllInvoiceNumber.fulfilled]: (state, action) => {
      state.invoiceNumberList = action.payload.data?.data;
      state.tableData.total = action.payload?.data?.total;
      state.loading = false;
    },
    [getAllInvoiceNumber.pending]: (state) => {
      state.loading = true;
    },
    [getAllCustomerOption.fulfilled]: (state, action) => {
      state.customerOption = action.payload.data?.data;
      state.tableData.total = action.payload?.data?.total;
      state.loading = false;
    },
    [getAllCustomerOption.pending]: (state) => {
      state.loading = true;
    },

    [getAllInvoiceDate.fulfilled]: (state, action) => {
      state.invoiceDateList = action.payload.data?.data;
      state.tableData.total = action.payload?.data?.total;
      state.loading = false;
    },
    [getAllInvoiceDate.pending]: (state) => {
      state.loading = true;
    },

    [addDetails.fulfilled]: (state) => {},
    [deleteInvoice.fulfilled]: (state) => {},
  },
});

export const { setTableData, setDispatchInvoiceList, setFilterData } =
  dataSlice.actions;

export default dataSlice.reducer;
