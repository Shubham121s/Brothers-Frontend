import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { apiGetAllEnquiry } from "../../../../../services/SuperAdmin/Enquiry/enquiry";
import { apiGetQuotation } from "../../../../../services/SuperAdmin/quotation/quotationService";

export const getAllEnquiry = createAsyncThunk(
  "quotation/data/all/quotation",
  async (data) => {
    try {
      const response = await apiGetQuotation(data);
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
  name: "quotation/data",
  initialState: {
    loading: false,
    quotationList: [],
    tableData: initialTableData,
  },
  reducers: {
    setTableData: (state, action) => {
      state.tableData = action.payload;
    },
  },
  extraReducers: {
    [getAllEnquiry.fulfilled]: (state, action) => {
      state.quotationList = action.payload.data?.data || [];
      state.tableData.table = action.payload.data.total || 0;
      state.loading = false;
    },
    [getAllEnquiry.pending]: (state, action) => {
      state.loading = true;
    },
  },
});

export const { setTableData, setFilterData } = dataSlice.actions;

export default dataSlice.reducer;
