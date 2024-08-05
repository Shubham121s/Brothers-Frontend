import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  apiGetAllPatternsWithPagination,
  apiPostNewPattern,
  apiUpdatePattern,
} from "../../../../../../services/SuperAdmin/Product/PatternService";
import { apiGetAllCustomersOption } from "../../../../../../services/SuperAdmin/Customer/CustomerService";

export const getAllPatterns = createAsyncThunk(
  "product/setting/pattern/data/all",
  async (data) => {
    try {
      const response = await apiGetAllPatternsWithPagination(data);
      return response;
    } catch (error) {
      return error?.response;
    }
  }
);
export const postNewPattern = createAsyncThunk(
  "product/setting/pattern/data/new",
  async (data) => {
    try {
      const response = await apiPostNewPattern(data);
      return response;
    } catch (error) {
      return error?.response;
    }
  }
);

export const updatePattern = createAsyncThunk(
  "product/setting/pattern/data/update",
  async (data) => {
    try {
      const response = await apiUpdatePattern(data);
      return response;
    } catch (error) {
      return error?.response;
    }
  }
);

export const getAllCustomerOption = createAsyncThunk(
  "product/setting/pattern/data/get/option",
  async () => {
    try {
      const response = await apiGetAllCustomersOption();
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

export const initialFilterData = {
  status: "",
};

const dataSlice = createSlice({
  name: "product/setting/pattern/data",
  initialState: {
    loading: false,
    patternList: [],
    customerOption: [],
    tableData: initialTableData,
    filterData: initialFilterData,
  },
  reducers: {
    setTableData: (state, action) => {
      state.tableData = action.payload;
    },
    setPatternList: (state, action) => {
      state.patternList = action.payload;
    },
    setFilterData: (state, action) => {
      state.filterData = action.payload;
    },
  },
  extraReducers: {
    [getAllPatterns.fulfilled]: (state, action) => {
      state.patternList = action.payload.data?.data || [];
      state.tableData.total = action.payload.data?.total;
      state.loading = false;
    },
    [getAllPatterns.pending]: (state) => {
      state.loading = true;
    },
    [updatePattern.fulfilled]: (state, action) => {
      state.patternList = state.patternList.map((pattern) => {
        if (pattern.pattern_id === action.meta.arg.pattern_id) {
          return { ...pattern, ...action.meta.arg };
        }
        return pattern;
      });
    },
    [getAllCustomerOption.fulfilled]: (state, action) => {
      state.customerOption = action.payload?.data?.data || [];
    },
  },
});

export const { setTableData, setPatternList, setFilterData } =
  dataSlice.actions;

export default dataSlice.reducer;
