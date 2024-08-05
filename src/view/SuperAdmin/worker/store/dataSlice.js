import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  apiDeleteWorker,
  apiGetAllWorker,
  apiPostAddWorker,
  apiPutPasswordWorker,
  apiPutUpdateWorker,
} from "../../../../services/SuperAdmin/worker/WorkerService";

export const getAllWorker = createAsyncThunk(
  "worker/data/all",
  async (data) => {
    try {
      const response = await apiGetAllWorker(data);
      return response;
    } catch (error) {
      return error?.response || error.toString();
    }
  }
);
export const postAddWorker = createAsyncThunk(
  "worker/data/add",
  async (data) => {
    try {
      const response = await apiPostAddWorker(data);
      return response;
    } catch (error) {
      return error?.response || error.toString();
    }
  }
);
export const putUpdateWorker = createAsyncThunk(
  "worker/data/update",
  async (data) => {
    try {
      const response = await apiPutUpdateWorker(data);
      return response;
    } catch (error) {
      return error?.response || error.toString();
    }
  }
);
export const deleteWorker = createAsyncThunk(
  "worker/data/delete",
  async (data) => {
    try {
      const response = await apiDeleteWorker(data);
      return response;
    } catch (error) {
      return error?.response || error.toString();
    }
  }
);
export const putPasswordRetailer = createAsyncThunk(
  "worker/data/password",
  async (data) => {
    try {
      // const response = await apiPutPasswordRetailer(data)
      const response = "";
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
  name: "worker/data",
  initialState: {
    loading: true,
    worker: [],
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
    [getAllWorker.fulfilled]: (state, action) => {
      state.worker = action.payload.data?.data || [];
      state.tableData.total = action.payload?.data?.total;
      state.loading = false;
    },
    [getAllWorker.pending]: (state) => {
      state.loading = true;
    },
    [postAddWorker.fulfilled]: (state, action) => {
      if (action.payload.status === 201) {
        if (state.worker.length < state.tableData.pageSize) {
          state.worker.push(action.payload?.data?.data);
        }
        state.tableData.total = state.tableData.total + 1;
      }
    },
    [putUpdateWorker.fulfilled]: (state, action) => {
      if (action.payload.status === 200) {
        state.worker = state.worker.map((worker) => {
          if (action.meta.arg.worker_id === worker.worker_id) {
            return { ...worker, ...action.meta.arg };
          }
          return { ...worker };
        });
      }
    },
    [deleteWorker.fulfilled]: (state, action) => {
      if (action.payload.status === 200) {
        state.worker = state.worker.filter(
          (worker) => action.meta.arg.worker_id != worker.worker_id
        );
        if (state.worker.length > 0) {
          state.tableData.total = state.tableData.total - 1;
        }
      }
    },
    [putPasswordRetailer.fulfilled]: () => {},
  },
});

export const { setTableData, setFilterData } = dataSlice.actions;

export default dataSlice.reducer;
