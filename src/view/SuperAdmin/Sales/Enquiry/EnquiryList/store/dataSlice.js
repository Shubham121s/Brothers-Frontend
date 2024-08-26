import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  apiGetAllEnquiry,
  apiDeleteEnquiry,
} from "../../../../../../services/SuperAdmin/Sales/enquiry";

export const getAllEnquiry = createAsyncThunk(
  "enquiry/data/all/enquiry",
  async (data) => {
    try {
      const response = await apiGetAllEnquiry(data);
      return response;
    } catch (error) {
      return error?.response;
    }
  }
);

export const deleteEnquiry = createAsyncThunk(
  "enquiry/data/delete/enquiry",
  async (data) => {
    try {
      const response = await apiDeleteEnquiry(data);
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
  name: "enquiry/data",
  initialState: {
    loading: false,
    enquiryList: [],
    tableData: initialTableData,
  },
  reducers: {
    setTableData: (state, action) => {
      state.tableData = action.payload;
    },
  },
  extraReducers: {
    [getAllEnquiry.fulfilled]: (state, action) => {
      state.enquiryList = action.payload?.data?.data || [];
      state.tableData.total = action.payload?.data?.total || 0;
      state.loading = false;
    },
    [getAllEnquiry.pending]: (state, action) => {
      state.loading = true;
    },
    [getAllEnquiry.rejected]: (state, action) => {
      state.enquiryList = [];
      state.tableData.total = 0;
      state.loading = false;
    },
    [deleteEnquiry.fulfilled]: (state, action) => {},
  },
});

export const { setTableData, setFilterData } = dataSlice.actions;

export default dataSlice.reducer;
