import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  apiGetPoDetailsByPoId,
  apiUpdatePOListByPOListId,
} from "../../../../../services/SuperAdmin/Po/PoService";
import { apiGetReviewById } from "../../../../../services/SuperAdmin/Enquiry/enquiry";
import {
  apiGetQuotationDetailById,
  apiUpdateQuotationStatus,
  apiUpdateQuotationById,
} from "../../../../../services/SuperAdmin/quotation/quotationService";

export const getQutotaionDetailsByQuotationId = createAsyncThunk(
  "quotaion/details/data/details",
  async (data) => {
    try {
      const response = await apiGetQuotationDetailById(data);
      return response;
    } catch (error) {
      return error.response;
    }
  }
);

export const updateQuotationById = createAsyncThunk(
  "quotaion/details/data/details/update",
  async (data) => {
    try {
      const response = await apiUpdateQuotationById(data);
      return response;
    } catch (error) {
      return error.response;
    }
  }
);

export const UpdateQuotationStatus = createAsyncThunk(
  "po/details/data/list/update",
  async (data) => {
    try {
      const response = await apiUpdateQuotationStatus(data);
      return response;
    } catch (error) {
      return error.response;
    }
  }
);

export const getReviewByEnquiryListId = createAsyncThunk(
  "po/details/data/list/Review",
  async (data) => {
    try {
      const response = await apiGetReviewById(data);
      return response;
    } catch (error) {
      return error.response;
    }
  }
);

const dataSlice = createSlice({
  name: "quotation/details/data",
  initialState: {
    quotationDetails: {},
    quotationList: [],
    reviewDetails: {},
    loading: false,
  },
  reducers: {
    setSelectedEditQuotation: (state, action) => {
      const updatedQuotationList = state.quotationList.map((quotation) => {
        if (quotation.enquiry_list_id === action.payload.enquiry_list_id) {
          return action.payload;
        } else {
          return quotation;
        }
      });
      state.quotationList = updatedQuotationList;
    },
  },
  extraReducers: {
    [getQutotaionDetailsByQuotationId.fulfilled]: (state, action) => {
      state.loading = false;
      state.quotationDetails = action.payload.data?.data || {};
      const extractObjects = (str) => {
        try {
          return JSON.parse(str);
        } catch (error) {
          console.error("Error parsing JSON:", error);
          return [];
        }
      };

      // Extract objects from stringified arrays
      const circleObjects = extractObjects(state.quotationDetails.circle);
      const ringObjects = extractObjects(state.quotationDetails.ring);
      const squareObjects = extractObjects(state.quotationDetails.square);
      const profileObjects = extractObjects(state.quotationDetails.profile);
      const fabricationObjects = extractObjects(
        state.quotationDetails.fabrication
      );

      // Merge all objects into a single array
      state.quotationList = [
        ...circleObjects,
        ...ringObjects,
        ...squareObjects,
        ...profileObjects,
        ...fabricationObjects,
      ];
    },
    [getQutotaionDetailsByQuotationId.pending]: (state, action) => {
      state.loading = true;
    },
    // [updatePOListByPOListId.fulfilled]: (state, action) => {
    //     if (action.payload?.status === 200) {
    //         state.poDetails = {
    //             ...state.poDetails,
    //             PoLists: state.poDetails?.PoLists.map((list) => {
    //                 if (list.po_list_id === action.meta.arg.po_list_id) {
    //                     const { list_status, accept_description, accept_delivery_date } = action.meta.arg
    //                     return { ...list, list_status, accept_description, accept_delivery_date }
    //                 }
    //                 return { ...list }
    //             })
    //         }
    //     }
    // },
    [UpdateQuotationStatus.fulfilled]: (state, action) => {},
    [updateQuotationById.fulfilled]: (state, action) => {},
    [getReviewByEnquiryListId.fulfilled]: (state, action) => {
      state.reviewDetails = action.payload?.data?.data || {};
    },
  },
});

export const { setSelectedEditQuotation } = dataSlice.actions;

export default dataSlice.reducer;
