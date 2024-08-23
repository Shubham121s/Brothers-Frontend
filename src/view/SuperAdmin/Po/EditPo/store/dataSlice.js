import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { apiGetAllCustomers } from "../../../../../services/SuperAdmin/Customer/CustomerService";
import { apiGetAllProductsWithDrawing } from "../../../../../services/SuperAdmin/Product/IndexService";
import { apiUpdatePo } from "../../../../../services/SuperAdmin/Po/PoService";
import { apiGetPoDetailsByPoId } from "../../../../../services/SuperAdmin/Po/PoService";
import {
  apiGetAllNotesWithOutPagination,
  apiGetAllConditionWithOutPagination,
} from "../../../../../services/SuperAdmin/Po/Note.Service";

export const getPoDetailsByPoId = createAsyncThunk(
  "po/details/data/details",
  async (data) => {
    try {
      const response = await apiGetPoDetailsByPoId(data);
      return response;
    } catch (error) {
      return error.response;
    }
  }
);

export const getAllCustomers = createAsyncThunk(
  "edit/po/data/customer/all",
  async () => {
    try {
      const response = await apiGetAllCustomers();
      return response;
    } catch (error) {
      return error?.response;
    }
  }
);

export const getAllProductsWithDrawing = createAsyncThunk(
  "edit/po/data/product/all",
  async () => {
    try {
      const response = await apiGetAllProductsWithDrawing();
      return response;
    } catch (error) {
      return error?.response;
    }
  }
);

export const postUpdatePo = createAsyncThunk(
  "edit/po/data/po/update",
  async (data) => {
    try {
      const response = await apiUpdatePo(data);
      return response;
    } catch (error) {
      return error?.response;
    }
  }
);

export const getAllNotes = createAsyncThunk(
  "edit/po/data/notes/all",
  async () => {
    try {
      const response = await apiGetAllNotesWithOutPagination();
      return response;
    } catch (error) {
      return error?.response;
    }
  }
);

export const getAllCondition = createAsyncThunk(
  "edit/po/data/condition/all",
  async () => {
    try {
      const response = await apiGetAllConditionWithOutPagination();
      return response;
    } catch (error) {
      return error?.response;
    }
  }
);

const dataSlice = createSlice({
  name: "edit/po/data",
  initialState: {
    loading: {
      getAllCustomers: false,
      getUniquePoNumber: false,
      getAllProductsWithDrawing: false,
      getAllNotes: false,
      getAllCondition: false,
      getPoDetailsByPoId: false,
    },
    customers: [],
    products: [],
    poDetails: {},
  },
  extraReducers: {
    [getPoDetailsByPoId.pending]: (state) => {
      state.loading.getPoDetailsByPoId = true;
    },
    [getAllCustomers.pending]: (state) => {
      state.loading.getAllCustomers = true;
    },
    [getAllProductsWithDrawing.pending]: (state) => {
      state.loading.getAllProductsWithDrawing = true;
    },

    [getAllNotes.pending]: (state) => {
      state.loading.getAllNotes = true;
    },
    [getAllCondition.pending]: (state) => {
      state.loading.getAllCondition = true;
    },

    [getPoDetailsByPoId.fulfilled]: (state, action) => {
      state.loading.getPoDetailsByPoId = false;
      state.poDetails = {
        ...action.payload.data.data,
        PoLists: action.payload.data.data.PoLists.map((f) => {
          return { ...f, revision_number: f.Drawing.revision_number };
        }),
      };
    },
    [getAllCustomers.fulfilled]: (state, action) => {
      state.loading.getAllCustomers = false;
      state.customers = action.payload.data?.data || [];
    },
    [postUpdatePo.fulfilled]: (state) => {},
    [getAllProductsWithDrawing.fulfilled]: (state, action) => {
      state.loading.getAllProductsWithDrawing = false;
      state.products = action.payload.data?.data || [];
    },

    [getAllNotes.fulfilled]: (state, action) => {
      state.loading.getAllNotes = false;
      state.notes = action.payload.data?.data || [];
    },
    [getAllCondition.fulfilled]: (state, action) => {
      state.loading.getAllCondition = false;
      state.condition = action.payload.data?.data || [];
    },

    [getPoDetailsByPoId.rejected]: (state) => {
      state.loading.getPoDetailsByPoId = false;
    },
    [getAllCustomers.rejected]: (state) => {
      state.loading.getAllCustomers = false;
    },
    [postUpdatePo.rejected]: (state) => {},
    [getAllProductsWithDrawing.rejected]: (state) => {
      state.loading.getAllProductsWithDrawing = false;
    },
    [getAllNotes.rejected]: (state) => {
      state.loading.getAllNotes = false;
    },
    [getAllCondition.rejected]: (state) => {
      state.loading.getAllCondition = false;
    },
  },
});

export default dataSlice.reducer;
