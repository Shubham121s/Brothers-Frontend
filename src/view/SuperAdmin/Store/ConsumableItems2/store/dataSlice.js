import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  apiGetAllConsumableItem,
  apiPostConsumableItem,
  apiUpdateConsumableItem,
} from "../../../../../services/SuperAdmin/Store/ConsumableItemService";

export const getAllConsumableItem = createAsyncThunk(
  "consumable/item/data/all",
  async (data) => {
    try {
      const response = await apiGetAllConsumableItem(data);
      return response;
    } catch (error) {
      return error?.response || error.toString();
    }
  }
);

export const postConsumableItem = createAsyncThunk(
  "consumable/item/data/post",
  async (data) => {
    try {
      const response = await apiPostConsumableItem(data);
      return response;
    } catch (error) {
      return error?.response || error.toString();
    }
  }
);

export const updateConsumableItem = createAsyncThunk(
  "consumable/item/data/update",
  async (data) => {
    try {
      const response = await apiUpdateConsumableItem(data);
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
  name: "consumableItem/data",
  initialState: {
    loading: true,
    consumableItems: [],
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
    [getAllConsumableItem.fulfilled]: (state, action) => {
      state.consumableItems = action.payload.data?.data || [];
      state.tableData.total = action.payload?.data?.total;
      state.loading = false;
    },
    [getAllConsumableItem.pending]: (state) => {
      state.loading = true;
    },
    [postConsumableItem.fulfilled]: (state) => {},
    [updateConsumableItem.fulfilled]: (state) => {},
  },
});

export const { setTableData, setFilterData } = dataSlice.actions;

export default dataSlice.reducer;
