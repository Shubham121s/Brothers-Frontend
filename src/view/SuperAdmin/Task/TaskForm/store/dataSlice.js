import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import {
  apiPostTaskList,
  apiGetUserList,
} from "../../../../../services/SuperAdmin/Task/TaskService";

export const postTask = createAsyncThunk("task/data/post", async (data) => {
  try {
    const response = await apiPostTaskList(data);
    return response;
  } catch (error) {
    return error?.response;
  }
});

export const getUser = createAsyncThunk("task/data/get/user", async (data) => {
  try {
    const response = await apiGetUserList(data);
    return response;
  } catch (error) {
    return error?.response;
  }
});

export const initialTableData = {
  total: 0,
  pageIndex: 1,
  pageSize: 10,
  query: "",
};

const dataSlice = createSlice({
  name: "task/data",
  initialState: {
    loading: false,
    userList: [],
    tableData: initialTableData,
  },
  reducers: {
    setTableData: (state, action) => {
      state.tableData = action.payload;
    },
  },
  extraReducers: {
    [getUser.fulfilled]: (state, action) => {
      state.userList = action.payload.data?.data || [];
      state.tableData.total = action.payload.data.total || 0;
      state.loading = false;
    },
    [getUser.pending]: (state, action) => {
      state.loading = true;
    },
    [postTask.fulfilled]: (state, action) => {},
  },
});

export const { setTableData, setFilterData } = dataSlice.actions;

export default dataSlice.reducer;
