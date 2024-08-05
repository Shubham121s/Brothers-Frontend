import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { apiGetIwardById } from "../../../../../services/SuperAdmin/PruchaseOrder/InwardService";

export const getInwardDetailsById = createAsyncThunk(
  "grn/details/data/details",
  async (data) => {
    try {
      const response = await apiGetIwardById(data);
      return response;
    } catch (error) {
      return error.response;
    }
  }
);

// export const postInward = createAsyncThunk(
//   "po/details/data/post",
//   async (data) => {
//     try {
//       const response = await apiPostInward(data);
//       return response;
//     } catch (error) {
//       return error.response;
//     }
//   }
// );

const dataSlice = createSlice({
  name: "inward/data",
  initialState: {
    inwardDetails: {},
    category: "",
    loading: false,
  },
  reducers: {},
  extraReducers: {
    [getInwardDetailsById.fulfilled]: (state, action) => {
      state.loading = false;
      state.inwardDetails =
        {
          ...action.payload.data?.data,
          InWardDetails: action.payload?.data?.data?.InWardDetails?.map((m) => {
            return {
              ...m,
              accepted_quantity: "",
              rejected_quantity: "",
              comments: "",
            };
          }),
        } || {};
      state.category =
        action.payload.data.data?.InWardDetails[0]?.Product?.category;
    },
    [getInwardDetailsById.pending]: (state, action) => {
      state.loading = true;
    },
    // [postInward.fulfilled]: (state, action) => {},
  },
});

export const {} = dataSlice.actions;

export default dataSlice.reducer;
