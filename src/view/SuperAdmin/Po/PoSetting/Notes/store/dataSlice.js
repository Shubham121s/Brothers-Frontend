import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  apiGetAllCategories,
  apiPostNewCategory,
  apiUpdateCategory,
} from "../../../../../../services/SuperAdmin/Product/CategoryService";
import {
  apiNewNoteRegister,
  apiGetAllNotes,
  apiUpdateNotes,
} from "../../../../../../services/SuperAdmin/Po/Note.Service";

export const getAllCategories = createAsyncThunk(
  "po/note/setting/data/all",
  async (data) => {
    try {
      const response = await apiGetAllNotes(data);
      return response;
    } catch (error) {
      return error?.response;
    }
  }
);
export const postNewCategory = createAsyncThunk(
  "po/note/setting/data/new",
  async (data) => {
    try {
      const response = await apiNewNoteRegister(data);
      return response;
    } catch (error) {
      return error?.response;
    }
  }
);
export const updateNotes = createAsyncThunk(
  "po/note/setting/data/update",
  async (data) => {
    try {
      const response = await apiUpdateNotes(data);
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
  name: "po/note/setting/data",
  initialState: {
    loading: false,
    categoryList: [],
    tableData: initialTableData,
    filterData: initialFilterData,
  },
  reducers: {
    setTableData: (state, action) => {
      state.tableData = action.payload;
    },
    setCategoryList: (state, action) => {
      state.categoryList = action.payload;
    },
    setFilterData: (state, action) => {
      state.filterData = action.payload;
    },
  },
  extraReducers: {
    [getAllCategories.fulfilled]: (state, action) => {
      state.categoryList = action.payload.data?.data || [];
      state.tableData.total = action.payload.data?.total;
      state.loading = false;
    },
    [getAllCategories.pending]: (state) => {
      state.loading = true;
    },
    [updateNotes.fulfilled]: (state, action) => {},
  },
});

export const { setTableData, setCategoryList, setFilterData } =
  dataSlice.actions;

export default dataSlice.reducer;
