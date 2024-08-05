import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { apiGetAllInward } from "../../../../../services/SuperAdmin/PruchaseOrder/InwardService";

export const getAllInward = createAsyncThunk(
  "po/data/list/all",
  async (data) => {
    try {
      const response = await apiGetAllInward(data);
      return response;
    } catch (error) {
      return error.response;
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
  name: "inward/data/list",
  initialState: {
    loading: false,
    inwardList: [],
    tableData: initialTableData,
    filterData: initialFilterData,
  },
  reducers: {
    setTableData: (state, action) => {
      state.tableData = action.payload;
    },
    setFilterData: (state, action) => {
      state.filterData = action.payload;
    },
  },
  extraReducers: {
    [getAllInward.fulfilled]: (state, action) => {
      state.inwardList = action.payload.data?.data || [];
      state.tableData.table = action.payload.data.total || 0;
      state.loading = false;
    },
    [getAllInward.pending]: (state, action) => {
      state.loading = true;
    },
  },
});

export const { setTableData, setFilterData } = dataSlice.actions;

export default dataSlice.reducer;
