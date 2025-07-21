import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  apiGetPoDetailsByPoId,
  apiUpdatePOListByPOListId,
} from "../../../../../services/SuperAdmin/Po/PoService";

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

export const updatePOListByPOListId = createAsyncThunk(
  "po/details/data/list/update",
  async (data) => {
    try {
      const response = await apiUpdatePOListByPOListId(data);
      return response;
    } catch (error) {
      return error.response;
    }
  }
);

const dataSlice = createSlice({
  name: "po/details/data",
  initialState: {
    poDetails: {},
    loading: false,
  },
  reducers: {},
  extraReducers: {
    [getPoDetailsByPoId.fulfilled]: (state, action) => {
      state.loading = false;
      state.poDetails = action.payload.data?.data || {};
    },
    [getPoDetailsByPoId.pending]: (state, action) => {
      state.loading = true;
    },
    [updatePOListByPOListId.fulfilled]: (state, action) => {
      if (action.payload?.status === 200) {
        state.poDetails = {
          ...state.poDetails,
          PoLists: state.poDetails?.PoLists.map((list) => {
            if (list.po_list_id === action.meta.arg.po_list_id) {
              const {
                list_status,
                accept_description,
                accept_delivery_date,
                unit_price,
              } = action.meta.arg;
              return {
                ...list,
                list_status,
                accept_description,
                accept_delivery_date,
                unit_price,
              };
            }
            return { ...list };
          }),
        };
      }
    },
  },
});

export const {} = dataSlice.actions;

export default dataSlice.reducer;
