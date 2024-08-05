import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  apiGetAllProductCodeOption,
  apiGetAllStock,
  apiDeleteStock,
  apiPostStock,
  apiPutStock,
} from "../../../../services/SuperAdmin/Stock/StockService";

export const getAllStock = createAsyncThunk("stock/data/all", async (data) => {
  try {
    const response = await apiGetAllStock(data);
    return response;
  } catch (error) {
    return error?.response || error.toString();
  }
});

export const getAllProductCodeOption = createAsyncThunk(
  "stock/product/code/option",
  async () => {
    try {
      const response = await apiGetAllProductCodeOption();
      return response;
    } catch (error) {
      return error?.response || error.toString();
    }
  }
);

export const putStock = createAsyncThunk("stock/data/put", async (data) => {
  try {
    const response = await apiPutStock(data);
    return response;
  } catch (error) {
    return error?.response || error.toString();
  }
});

export const postStock = createAsyncThunk("stock/data/post", async (data) => {
  try {
    const response = await apiPostStock(data);
    return response;
  } catch (error) {
    return error?.response || error.toString();
  }
});

export const deleteStock = createAsyncThunk(
  "Stock/data/delete",
  async (data) => {
    try {
      const response = await apiDeleteStock(data);
      return response;
    } catch (error) {
      return error?.response || error.toString();
    }
  }
);

export const initialTableData = {
  query: "",
  pageIndex: 1,
  pageSize: 10,
  total: 0,
};

export const initialFilterData = { status: "" };

const dataSlice = createSlice({
  name: "stock/data",
  initialState: {
    loading: true,
    stock: [],
    productCodes: [],
    tableData: initialTableData,
    filterData: initialFilterData,
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
    [getAllProductCodeOption.fulfilled]: (state, action) => {
      state.productCodes = action.payload.data?.data || [];
    },
    [getAllStock.fulfilled]: (state, action) => {
      state.stock = action.payload.data?.data || [];
      state.tableData.total = action?.payload?.data?.total || 0;
      state.loading = false;
    },
    [getAllProductCodeOption.pending]: (state) => {
      state.loading = true;
    },
    [postStock.fulfilled]: (state) => {},
    [deleteStock.fulfilled]: (state) => {},
    [putStock.fulfilled]: (state) => {},
  },
});

export const { setTableData, setFilterData } = dataSlice.actions;

export default dataSlice.reducer;
