import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  apiGetMachine,
  apiDeleteMachine,
  apiPostMachine,
  apiUpdateMachine,
  apiPostMachineBreakDown,
} from "../../../../services/SuperAdmin/machine/MachineService";

export const getMachine = createAsyncThunk(
  "machine/data/getMachine",
  async (data) => {
    const response = await apiGetMachine(data);
    return response.data;
  }
);
export const postMachine = createAsyncThunk(
  "machine/data/postMachine",
  async (data) => {
    const response = await apiPostMachine(data);
    return response;
  }
);
export const updateMachine = createAsyncThunk(
  "machine/data/updateMachine",
  async (data) => {
    const response = await apiUpdateMachine(data);
    return response;
  }
);
export const postByBreakdownId = createAsyncThunk(
  "machine/data/postByBreakdownId",
  async (data) => {
    const response = await apiPostMachineBreakDown(data);
    return response;
  }
);
export const deleteMachine = createAsyncThunk(
  "machine/data/deleteMachine",
  async (data) => {
    const response = await apiDeleteMachine(data);
    return response.data;
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
  name: "machineList/data",
  initialState: {
    loading: false,
    machineList: [],
    tableData: initialTableData,
    filterData: initialFilterData,
  },
  reducers: {
    updateProductList: (state, action) => {
      state.machineList = action.payload;
    },
    setTableData: (state, action) => {
      state.tableData = action.payload;
    },
    setFilterData: (state, action) => {
      state.filterData = action.payload;
    },
  },
  extraReducers: {
    [getMachine.fulfilled]: (state, action) => {
      state.machineList = action.payload.data || [];
      state.tableData.total = action.payload.total || 0;
      state.loading = false;
    },
    [getMachine.pending]: (state) => {
      state.loading = true;
    },
    [postMachine.fulfilled]: (state, action) => {},
    [updateMachine.fulfilled]: (state, action) => {},
  },
});

export const { updateProductList, setTableData, setFilterData } =
  dataSlice.actions;

export default dataSlice.reducer;
