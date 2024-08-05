import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import {
  apiAttandanceById,
  apiPostAttandanceById,
  apiTotalAttandanceById,
  apiMonthlyAttandanceById,
} from "../../../../../services/SuperAdmin/worker/WorkerService";
import dayjs from "dayjs";

export const getAttendanceById = createAsyncThunk(
  "attendanceDetail/data/get",
  async (data) => {
    try {
      const response = await apiAttandanceById(data);
      return response.data;
    } catch (error) {
      return error?.response || error.toString();
    }
  }
);

export const getTotalAttendanceById = createAsyncThunk(
  "attendanceDetail/data/total/get",
  async (data) => {
    try {
      const response = await apiTotalAttandanceById(data);
      return response.data;
    } catch (error) {
      return error?.response || error.toString();
    }
  }
);

export const getMonthlyAttendanceById = createAsyncThunk(
  "attendanceDetail/data/monthly/get",
  async (data) => {
    try {
      const response = await apiMonthlyAttandanceById(data);
      return response.data;
    } catch (error) {
      return error?.response || error.toString();
    }
  }
);

export const PostAttendanceById = createAsyncThunk(
  "attendanceDetail/data/post",
  async (data) => {
    try {
      const response = await apiPostAttandanceById(data);
      return response.data;
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
  month: dayjs().format("YYYY-MM-DD"),
};

const dataSlice = createSlice({
  name: "attendanceDetail/data",
  initialState: {
    loading: false,
    message: "",
    attendanceList: [],
    totalAttendance: 0,
    monthlyAttendance: 0,
    tableData: initialTableData,
    filterData: initialFilterData,
  },
  reducers: {
    setTableData: (state, action) => {
      state.tableData = action.payload;
    },
    setAttendanceList: (state, action) => {
      state.attendanceList = action.payload;
    },
    setFilterData: (state, action) => {
      state.filterData = action.payload;
    },
  },
  extraReducers: {
    [getAttendanceById.fulfilled]: (state, action) => {
      state.loading = false;
      state.attendanceList = action.payload?.data || [];
      state.tableData.total = action.payload?.total || 0;
    },
    [getAttendanceById.pending]: (state) => {
      state.loading = true;
    },
    [getAttendanceById.rejected]: (state) => {
      state.loading = false;
      state.attendanceList = [];
      state.tableData.total = 0;
    },
    [getTotalAttendanceById.fulfilled]: (state, action) => {
      state.totalAttendance = action.payload?.data || 0;
      state.loading = false;
    },
    [getTotalAttendanceById.rejected]: (state) => {
      state.totalAttendance = 0;
      state.loading = false;
    },
    [getMonthlyAttendanceById.fulfilled]: (state, action) => {
      state.monthlyAttendance = action.payload?.data || 0;
      state.loading = false;
    },
    [getMonthlyAttendanceById.rejected]: (state) => {
      state.monthlyAttendance = 0;
      state.loading = false;
    },
    [PostAttendanceById.fulfilled]: (state) => {},
  },
});

export const { setTableData, setAttendanceList, setFilterData } =
  dataSlice.actions;

export default dataSlice.reducer;
