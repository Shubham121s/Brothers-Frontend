import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  apiDeleteProduct,
  apiGetAllProductsWithPagination,
} from "../../../../../services/SuperAdmin/Product/IndexService";

export const getAllProducts = createAsyncThunk(
  "product/data/all/product",
  async (data) => {
    try {
      const response = await apiGetAllProductsWithPagination(data);
      return response;
    } catch (error) {
      return error?.response;
    }
  }
);

export const deleteProduct = createAsyncThunk(
  "product/data/delete",
  async (data) => {
    try {
      const response = await apiDeleteProduct(data);
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
  name: "product/data",
  initialState: {
    loading: false,
    productList: [],
    tableData: initialTableData,
  },
  reducers: {
    setTableData: (state, action) => {
      state.tableData = action.payload;
    },
  },
  extraReducers: {
    [getAllProducts.fulfilled]: (state, action) => {
      state.productList = action.payload.data?.data || [];
      state.tableData.total = action.payload.data.total || 0;
      state.loading = false;
    },
    [getAllProducts.pending]: (state, action) => {
      state.loading = true;
    },
    [deleteProduct.fulfilled]: (state, action) => {},
  },
});

export const { setTableData, setFilterData } = dataSlice.actions;

export default dataSlice.reducer;
