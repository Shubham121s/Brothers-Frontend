import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  apiGetAllFinishGoods,
  apiUpdateFinishGoods,
  apiPostNewFinishGoods,
} from "../../../../../services/SuperAdmin/Store/FinishGodsService";

export const getAllFinishGoods = createAsyncThunk(
  "goods/data/all",
  async (data) => {
    try {
      const response = await apiGetAllFinishGoods(data);
      return response;
    } catch (error) {
      return error?.response || error.toString();
    }
  }
);

export const postFinishGoods = createAsyncThunk(
  "goods/data/post",
  async (data) => {
    try {
      const response = await apiPostNewFinishGoods(data);
      return response;
    } catch (error) {
      return error?.response || error.toString();
    }
  }
);

export const updateFinishGoods = createAsyncThunk(
  "goods/data/update",
  async (data) => {
    try {
      const response = await apiUpdateFinishGoods(data);
      return response;
    } catch (error) {
      return error?.response || error.toString();
    }
  }
);

export const initialTableData = {
  query: "",
  pageIndex: 1,
  pageSize: 10,
  total: 0,
};

export const initialFilterData = { status: "" };

const dataSlice = createSlice({
  name: "finishGoods/data",
  initialState: {
    loading: true,
    finishGoods: [],
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
    [getAllFinishGoods.fulfilled]: (state, action) => {
      state.finishGoods = action.payload.data?.data || [];
      state.tableData.total = action.payload?.data?.total;
      state.loading = false;
    },
    [getAllFinishGoods.pending]: (state) => {
      state.loading = true;
    },
    [postFinishGoods.pending]: (state) => {},
    [updateFinishGoods.pending]: (state) => {},
  },
});

export const { setTableData, setFilterData } = dataSlice.actions;

export default dataSlice.reducer;
