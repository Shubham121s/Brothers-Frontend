import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import {
  apiGetAllTaskList,
  apiPostTaskList,
  apiPutTaskList,
  apiDeleteTaskList,
} from "../../../../../services/SuperAdmin/Task/TaskService";

export const getAllTask = createAsyncThunk(
  "task/data/all/task",
  async (data) => {
    try {
      const response = await apiGetAllTaskList(data);
      return response;
    } catch (error) {
      return error?.response;
    }
  }
);

export const postTask = createAsyncThunk("task/data/post", async (data) => {
  try {
    const response = await apiPostTaskList(data);
    return response;
  } catch (error) {
    return error?.response;
  }
});

export const putTask = createAsyncThunk("task/data/put", async (data) => {
  try {
    const response = await apiPutTaskList(data);
    return response;
  } catch (error) {
    return error?.response;
  }
});

export const deleteTask = createAsyncThunk("task/data/delete", async (data) => {
  try {
    const response = await apiDeleteTaskList(data);
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
    taskList: [],
    tableData: initialTableData,
  },
  reducers: {
    setTableData: (state, action) => {
      state.tableData = action.payload;
    },
  },
  extraReducers: {
    [getAllTask.fulfilled]: (state, action) => {
      state.taskList = action.payload.data?.data || [];
      state.tableData.total = action.payload.data.total || 0;
      state.loading = false;
    },
    [getAllTask.pending]: (state, action) => {
      state.loading = true;
    },
    [postTask.fulfilled]: (state, action) => {},
    [putTask.fulfilled]: (state, action) => {},
    [deleteTask.fulfilled]: (state, action) => {},
  },
});

export const { setTableData, setFilterData } = dataSlice.actions;

export default dataSlice.reducer;
