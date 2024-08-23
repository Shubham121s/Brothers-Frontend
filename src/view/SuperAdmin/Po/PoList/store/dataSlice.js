import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  apiGetAllPoWithPagination,
  apiDeletePo,
} from "../../../../../services/SuperAdmin/Po/PoService";

export const getAllPoWithPagination = createAsyncThunk(
  "po/data/list/all",
  async (data) => {
    try {
      const response = await apiGetAllPoWithPagination(data);
      return response;
    } catch (error) {
      return error.response;
    }
  }
);

export const deletePo = createAsyncThunk(
  "po/data/list/delete",
  async (data) => {
    try {
      const response = await apiDeletePo(data);
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
  name: "po/data/list",
  initialState: {
    loading: false,
    poList: [],
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
    [getAllPoWithPagination.fulfilled]: (state, action) => {
      state.poList = action.payload.data?.data || [];
      state.tableData.total = action.payload.data.total || 0;
      state.loading = false;
    },
    [getAllPoWithPagination.pending]: (state, action) => {
      state.loading = true;
    },
    [deletePo.fulfilled]: (state, action) => {},
  },
});

export const { setTableData, setFilterData } = dataSlice.actions;

export default dataSlice.reducer;
