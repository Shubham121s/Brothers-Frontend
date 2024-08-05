import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  apiGetBreakdown,
  apiDeleteBreakdown,
  apiPostBreakdown,
  apiUpdateBreakdown,
} from "../../../../services/SuperAdmin/machine/BreakdownService";

export const getBreakdown = createAsyncThunk(
  "breakdown/data/getBreakdown",
  async (data) => {
    const response = await apiGetBreakdown(data);
    return response;
  }
);
export const postBreakdown = createAsyncThunk(
  "breakdown/data/postBreakdown",
  async (data) => {
    const response = await apiPostBreakdown(data);
    return response;
  }
);
export const updateBreakdown = createAsyncThunk(
  "breakdown/data/updateBreakdown",
  async (data) => {
    const response = await apiUpdateBreakdown(data);
    return response;
  }
);
export const deleteBreakdown = createAsyncThunk(
  "breakdown/data/deleteBreakdown",
  async (data) => {
    const response = await apiDeleteBreakdown(data);
    return response.data;
  }
);
export const initialTableData = {
  total: 0,
  pageIndex: 1,
  pageSize: 10,
  query: "",
  sort: {
    order: "",
    key: "",
  },
};

export const initialFilterData = {
  name: "",
  category: ["bags", "cloths", "devices", "shoes", "watches"],
  status: [0, 1, 2],
  productStatus: 0,
};

const dataSlice = createSlice({
  name: "breakdownList/data",
  initialState: {
    loading: false,
    breakdownList: [],
    tableData: initialTableData,
    filterData: initialFilterData,
  },
  reducers: {
    updateProductList: (state, action) => {
      state.breakdownList = action.payload;
    },
    setTableData: (state, action) => {
      state.tableData = action.payload;
    },
    setFilterData: (state, action) => {
      state.filterData = action.payload;
    },
  },
  extraReducers: {
    [getBreakdown.fulfilled]: (state, action) => {
      state.breakdownList = action.payload.data?.data || [];
      state.tableData.total = action.payload.data?.total || 0;
      state.loading = false;
    },
    [getBreakdown.pending]: (state) => {
      state.loading = true;
    },
    [postBreakdown.fulfilled]: (state, action) => {},
    [updateBreakdown.fulfilled]: (state, action) => {},
    [deleteBreakdown.fulfilled]: (state, action) => {},
  },
});

export const { updateProductList, setTableData, setFilterData } =
  dataSlice.actions;

export default dataSlice.reducer;
