import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  apiGetCustomerStatisticData,
  apiGetCustomersWithPagination,
  apiDeleteCustomer,
} from "../../../../../services/SuperAdmin/Customer/CustomerService";

export const getCustomersWithPagination = createAsyncThunk(
  "customers/data/getCustomers",
  async (data) => {
    try {
      const response = await apiGetCustomersWithPagination(data);
      return response;
    } catch (error) {}
  }
);

export const getCustomerStatistic = createAsyncThunk(
  "customers/data/statistic",
  async () => {
    try {
      const response = await apiGetCustomerStatisticData();
      return response;
    } catch (error) {}
  }
);

export const deleteCustomer = createAsyncThunk(
  "customers/data/delete",
  async (data) => {
    try {
      const response = await apiDeleteCustomer(data);
      return response;
    } catch (error) {}
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
  name: "customers/data",
  initialState: {
    loading: false,
    customerList: [],
    statisticData: {},
    statisticLoading: false,
    tableData: initialTableData,
    filterData: initialFilterData,
  },
  reducers: {
    setTableData: (state, action) => {
      state.tableData = action.payload;
    },
    setCustomerList: (state, action) => {
      state.customerList = action.payload;
    },
    setFilterData: (state, action) => {
      state.filterData = action.payload;
    },
  },
  extraReducers: {
    [getCustomersWithPagination.fulfilled]: (state, action) => {
      state.customerList = action.payload.data?.data;
      state.tableData.total = action.payload?.data?.total;
      state.loading = false;
    },
    [getCustomersWithPagination.pending]: (state) => {
      state.loading = true;
    },
    [getCustomerStatistic.fulfilled]: (state, action) => {
      state.statisticLoading = false;
      state.statisticData = action.payload?.data?.data || {};
    },
    [getCustomerStatistic.pending]: (state) => {
      state.statisticLoading = true;
    },
    [deleteCustomer.fulfilled]: (state) => {},
  },
});

export const { setTableData, setCustomerList, setFilterData } =
  dataSlice.actions;

export default dataSlice.reducer;
