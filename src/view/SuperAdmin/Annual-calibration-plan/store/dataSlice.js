import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  apiGetCalibration,
  apiDeleteCalibration,
  apiPostCalibration,
  apiUpdateCalibration,
} from "../../../../services/SuperAdmin/machine/CalibrationService";

export const getAnnual = createAsyncThunk(
  "calibration/data/getCalibration",
  async (data) => {
    const response = await apiGetCalibration(data);
    return response;
  }
);
export const postAnnual = createAsyncThunk(
  "calibration/data/postCalibration",
  async (data) => {
    const response = await apiPostCalibration(data);
    return response;
  }
);
export const updateAnnual = createAsyncThunk(
  "calibration/data/updateCalibration",
  async (data) => {
    const response = await apiUpdateCalibration(data);
    return response;
  }
);
export const deleteAnnual = createAsyncThunk(
  "calibration/data/deleteCalibration",
  async (data) => {
    const response = await apiDeleteCalibration(data);
    return response;
  }
);

export const initialTableData = {
  total: 0,
  pageIndex: 1,
  pageSize: 10,
  query: "",
  sort: {
    order: "",
    key: "",
  },
};

export const initialFilterData = {
  name: "",
  category: ["bags", "cloths", "devices", "shoes", "watches"],
  status: [0, 1, 2],
  productStatus: 0,
};

const dataSlice = createSlice({
  name: "annualList/data",
  initialState: {
    loading: false,
    annualList: [],
    tableData: initialTableData,
    filterData: initialFilterData,
  },
  reducers: {
    updateProductList: (state, action) => {
      state.annualList = action.payload;
    },
    setTableData: (state, action) => {
      state.tableData = action.payload;
    },
    setFilterData: (state, action) => {
      state.filterData = action.payload;
    },
  },
  extraReducers: {
    [getAnnual.fulfilled]: (state, action) => {
      state.annualList = action.payload.data?.data || [];
      state.tableData.total = action.payload.data?.total || 0;
      state.loading = false;
    },
    [getAnnual.pending]: (state) => {
      state.loading = true;
    },
    [postAnnual.fulfilled]: (state, action) => {},
    [updateAnnual.fulfilled]: (state, action) => {},
    [deleteAnnual.fulfilled]: (state, action) => {},
  },
});

export const { updateProductList, setTableData, setFilterData } =
  dataSlice.actions;

export default dataSlice.reducer;
