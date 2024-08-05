import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const getAllRawMaterials = createAsyncThunk();
//   "worker/data/all",
//   async (data) => {
//     try {
//       const response = await apiGetAllWorker(data);
//       return response;
//     } catch (error) {
//       return error?.response || error.toString();
//     }
//   }

export const initialTableData = {
  query: "",
  pageIndex: 1,
  pageSize: 10,
  total: 0,
};

export const initialFilterData = { status: "" };

const dataSlice = createSlice({
  name: "rawMaterial/data",
  initialState: {
    loading: true,
    rawMaterials: [],
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
    [getAllRawMaterials.fulfilled]: (state, action) => {
      state.rawMaterials = action.payload.data?.data || [];
      state.tableData.total = action.payload?.data?.total;
      state.loading = false;
    },
    [getAllRawMaterials.pending]: (state) => {
      state.loading = true;
    },
  },
});

export const { setTableData, setFilterData } = dataSlice.actions;

export default dataSlice.reducer;
