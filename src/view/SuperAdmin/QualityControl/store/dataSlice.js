import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  apiGetProductsByCustomerId,
  apiGetQualityControl,
} from "../../../../services/SuperAdmin/QualityControl/QualityControlService";
import { apiGetAllCustomers } from "../../../../services/SuperAdmin/Customer/CustomerService";

export const getQualityControl = createAsyncThunk(
  "quality/lists/data/",
  async (data) => {
    try {
      const response = await apiGetQualityControl(data);
      return response;
    } catch (error) {
      return error.response;
    }
  }
);

export const getAllCustomers = createAsyncThunk(
  "quality/lists/data/customer",
  async (data) => {
    try {
      const response = await apiGetAllCustomers(data);
      return response;
    } catch (error) {
      return error?.response;
    }
  }
);

export const getProductsByCustomerId = createAsyncThunk(
  "quality/product/data/customer/id",
  async (data) => {
    try {
      const response = await apiGetProductsByCustomerId(data);
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
  customer: "",
};

export const initialFilterData = {
  status: "",
};

const dataSlice = createSlice({
  name: "po/lists/data",
  initialState: {
    customersList: [],
    qualityLists: [],
    productsList: [],
    loading: false,
    tableData: initialTableData,
    filterData: initialFilterData,
    attachmentDialog: false,
    viewDialog: false,
    selectedQuality: {},
  },
  reducers: {
    setTableData: (state, action) => {
      state.tableData = action.payload;
    },
    setFilterData: (state, action) => {
      state.filterData = action.payload;
    },
    toggleAttachmentDialog: (state, action) => {
      state.attachmentDialog = action.payload;
    },
    toggleViewDialog: (state, action) => {
      state.viewDialog = action.payload;
    },
    setSelectedQuality: (state, action) => {
      state.selectedQuality = action.payload;
    },
    setAllFilterData: (state, action) => {
      state.customers = [];
    },
  },
  extraReducers: {
    [getQualityControl.fulfilled]: (state, action) => {
      state.tableData.total = action.payload.data.total || 0;
      state.loading = false;
      state.qualityLists = action.payload.data?.data || [];
    },
    [getQualityControl.pending]: (state, action) => {
      state.loading = true;
    },

    [getAllCustomers.fulfilled]: (state, action) => {
      state.tableData.total = action.payload.data.total || 0;
      state.loading = false;
      state.customersList = action.payload.data?.data || [];
    },
    [getAllCustomers.pending]: (state, action) => {
      state.loading = true;
    },

    [getProductsByCustomerId.fulfilled]: (state, action) => {
      state.tableData.total = action.payload.data.total || 0;
      state.loading = false;
      state.productsList = action.payload.data?.data || [];
    },
    [getProductsByCustomerId.pending]: (state, action) => {
      state.loading = true;
    },
  },
});

export const {
  setFilterData,
  setTableData,
  toggleAttachmentDialog,
  setSelectedPoList,
  toggleViewDialog,
  setAllFilterData,
} = dataSlice.actions;

export default dataSlice.reducer;
