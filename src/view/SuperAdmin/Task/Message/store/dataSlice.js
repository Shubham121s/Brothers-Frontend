import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import {
  apiGetChatByTaskId,
  apiPostChat,
  apiGetUserStatus,
} from "../../../../../services/SuperAdmin/Task/TaskService";

export const getChatByTaskId = createAsyncThunk(
  "task/data/get/chatById",
  async (data) => {
    try {
      const response = await apiGetChatByTaskId(data);
      return response;
    } catch (error) {
      return error?.response;
    }
  }
);

export const getUserStatus = createAsyncThunk(
  "task/data/get/user/status",
  async (data) => {
    try {
      const response = await apiGetUserStatus(data);
      return response;
    } catch (error) {
      return error?.response;
    }
  }
);

export const postChat = createAsyncThunk(
  "task/data/post/chat",
  async (data) => {
    try {
      const response = await apiPostChat(data);
      return response;
    } catch (error) {
      return error?.response;
    }
  }
);

export const initialTableData = {
  total: 0,
  pageIndex: 1,
  pageSize: 10,
  query: "",
};

const dataSlice = createSlice({
  name: "chat/data",
  initialState: {
    loading: false,
    chatByIdList: [],
    userStatus: "Offline",
    tableData: initialTableData,
  },
  reducers: {
    setTableData: (state, action) => {
      state.tableData = action.payload;
    },
  },
  extraReducers: {
    [getChatByTaskId.fulfilled]: (state, action) => {
      state.chatByIdList = action.payload.data?.data || [];
      state.tableData.total = action.payload.data.total || 0;
      state.loading = false;
    },
    [getChatByTaskId.pending]: (state, action) => {
      state.loading = true;
    },
    [postChat.fulfilled]: (state, action) => {},
    [getUserStatus.fulfilled]: (state, action) => {
      state.userStatus = action.payload.data.data || "Offline";
    },
  },
});

export const { setTableData, setFilterData } = dataSlice.actions;

export default dataSlice.reducer;
