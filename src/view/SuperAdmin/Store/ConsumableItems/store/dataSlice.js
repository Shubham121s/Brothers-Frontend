import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  apiGetAllUnusedItem,
  apiPostUnusedItem,
  apiUpdateUnusedItem,
} from "../../../../../services/SuperAdmin/Store/UnusedItemService";

export const getAllUnusedItem = createAsyncThunk(
  "consumable/item/data/all",
  async (data) => {
    try {
      const response = await apiGetAllUnusedItem(data);
      return response;
    } catch (error) {
      return error?.response || error.toString();
    }
  }
);

export const postUnusedItem = createAsyncThunk(
  "consumable/item/data/post",
  async (data) => {
    try {
      const response = await apiPostUnusedItem(data);
      return response;
    } catch (error) {
      return error?.response || error.toString();
    }
  }
);

export const updateUnusedItem = createAsyncThunk(
  "consumable/item/data/update",
  async (data) => {
    try {
      const response = await apiUpdateUnusedItem(data);
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
  name: "unusedItem/data",
  initialState: {
    loading: true,
    unusedItem: [],
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
    [getAllUnusedItem.fulfilled]: (state, action) => {
      state.unusedItem = action.payload.data?.data || [];
      state.tableData.total = action.payload?.data?.total;
      state.loading = false;
    },
    [getAllUnusedItem.pending]: (state) => {
      state.loading = true;
    },
    [postUnusedItem.pending]: (state) => {},
    [updateUnusedItem.pending]: (state) => {},
  },
});

export const { setTableData, setFilterData } = dataSlice.actions;

export default dataSlice.reducer;
