import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import {
  apiPayLedgerAmountByWorkerId,
  apiGetAllLedgerByWorkerId,
  apiGetWorkerDetailsByWorkerId,
} from "../../../../../services/SuperAdmin/worker/WorkerService";

export const getAllLedgerListByWorkerId = createAsyncThunk(
  "serviceDetail/data/ledger/get",
  async (data) => {
    try {
      const response = await apiGetAllLedgerByWorkerId(data);
      return response;
    } catch (error) {
      return error?.response || error.toString();
    }
  }
);

export const getWorkerDetailsByWorkerId = createAsyncThunk(
  "serviceDetail/retailer/get",
  async (data) => {
    try {
      const response = await apiGetWorkerDetailsByWorkerId(data);
      return response;
    } catch (error) {
      return error?.response || error.toString();
    }
  }
);

export const postPayLedgerAmountByWorkerId = createAsyncThunk(
  "serviceDetail/data/details/ledger/debit",
  async (data) => {
    try {
      const response = await apiPayLedgerAmountByWorkerId(data);
      return response;
    } catch (error) {
      return error?.response || error.toString();
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
  status: "",
};

const dataSlice = createSlice({
  name: "ledgerDetail/data",
  initialState: {
    loading: false,
    message: "",
    workerLedgerList: [],
    tableData: initialTableData,
    filterData: initialFilterData,

    workerDetailsLoading: false,
    workerDetails: {},
    workerMessage: "",
    workerPendingAmount: 0,
  },
  reducers: {
    setTableData: (state, action) => {
      state.tableData = action.payload;
    },
    setWorkerLedgerList: (state, action) => {
      state.workerLedgerList = action.payload;
    },
    setFilterData: (state, action) => {
      state.filterData = action.payload;
    },
  },
  extraReducers: {
    [getAllLedgerListByWorkerId.fulfilled]: (state, action) => {
      state.workerLedgerList = action.payload?.data?.data || [];
      state.tableData.total = action.payload?.data?.total;
      if (action.meta.arg?.pageIndex === 1) {
        state.workerPendingAmount =
          action.payload?.data?.data?.length > 0
            ? action.payload?.data?.data[0].balance
            : 0;
      }
      state.loading = false;
    },
    [getAllLedgerListByWorkerId.pending]: (state) => {
      state.loading = true;
    },
    [getAllLedgerListByWorkerId.rejected]: (state) => {
      state.loading = false;
      state.workerLedgerList = [];
      state.tableData.total = 0;
    },
    [getWorkerDetailsByWorkerId.fulfilled]: (state, action) => {
      state.workerDetailsLoading = false;
      state.workerDetails = action.payload?.data?.data || {};
    },
    [getWorkerDetailsByWorkerId.pending]: (state) => {
      state.workerDetailsLoading = true;
    },
    [getWorkerDetailsByWorkerId.rejected]: (state) => {
      state.workerDetails = {};
      state.workerDetailsLoading = true;
    },
    [postPayLedgerAmountByWorkerId.fulfilled]: (state) => {},
  },
});

export const { setTableData, setRetailerLedgerList, setFilterData } =
  dataSlice.actions;

export default dataSlice.reducer;
