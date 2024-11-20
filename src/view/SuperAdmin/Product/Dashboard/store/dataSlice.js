import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  apiGetProductYearlySalesQuantity,
  apiGetProductMonthlySalesQuantity,
  apiGetAllProductsOption,
  apiGetYears,
  apiGetAllProductByYearMonth,
} from "../../../../../services/SuperAdmin/Product/DashboardService";

export const getProductYearlySalesQuantity = createAsyncThunk(
  "super-admin/product/dashboard/data/getProductYearlySalesQuantity",
  async (data) => {
    try {
      const response = await apiGetProductYearlySalesQuantity(data);
      return response;
    } catch (error) {
      return error?.response;
    }
  }
);

export const getProductMonthlySalesQuantity = createAsyncThunk(
  "super-admin/product/dashboard/data/getProductMonthlySalesQuantity",
  async (data) => {
    try {
      const response = await apiGetProductMonthlySalesQuantity(data);
      return response;
    } catch (error) {
      return error?.response;
    }
  }
);

export const getAllProductOption = createAsyncThunk(
  "super-admin/product/dashboard/data/getAllProductOption",
  async (data) => {
    try {
      const response = await apiGetAllProductsOption();
      return response;
    } catch (error) {
      return error?.response;
    }
  }
);

export const getAllYears = createAsyncThunk(
  "super-admin/product/dashboard/data/getYears",
  async (data) => {
    try {
      const response = await apiGetYears();
      return response;
    } catch (error) {
      return error?.response;
    }
  }
);

export const getAllProductByYearMonth = createAsyncThunk(
  "super-admin/product/dashboard/data/getAllProductByYearMonth",
  async (data) => {
    try {
      const response = await apiGetAllProductByYearMonth(data);
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
  product_id: "",
  months: "",
  year: "",
};

const dataSlice = createSlice({
  name: "super-admin/dashboard/data",
  initialState: {
    loading: true,
    productYearlySalesList: [],
    productMonthlySalesList: [],
    productList: [],
    yearsList: [],
    productByYearMonthList: [],
    tableData: initialTableData,
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
    [getProductYearlySalesQuantity.fulfilled]: (state, action) => {
      state.productYearlySalesList = action.payload?.data?.data || {};
      state.loading = false;
    },
    [getProductYearlySalesQuantity.pending]: (state) => {
      state.loading = true;
    },
    [getProductMonthlySalesQuantity.fulfilled]: (state, action) => {
      state.productMonthlySalesList = action.payload?.data?.data || {};
      state.loading = false;
    },
    [getProductMonthlySalesQuantity.pending]: (state) => {
      state.loading = true;
    },
    [getAllProductOption.fulfilled]: (state, action) => {
      state.productList = action.payload?.data?.data || {};
      state.loading = false;
    },
    [getAllProductOption.pending]: (state) => {
      state.loading = true;
    },
    [getAllYears.fulfilled]: (state, action) => {
      state.yearsList = action.payload?.data?.data || {};
      state.loading = false;
    },
    [getAllYears.pending]: (state) => {
      state.loading = true;
    },
    [getAllProductByYearMonth.fulfilled]: (state, action) => {
      state.productByYearMonthList = action.payload?.data?.data || {};
      state.loading = false;
    },
    [getAllProductByYearMonth.pending]: (state) => {
      state.loading = true;
    },
  },
});

export const { setTableData, setFilterData } = dataSlice.actions;

export default dataSlice.reducer;
