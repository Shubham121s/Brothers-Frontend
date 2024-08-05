import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  apiGetPoDetailsByPoId,
  apiUpdatePOListByPOListId,
} from "../../../../../services/SuperAdmin/Po/PoService";
import {
  apiGetEnquiryDetailsByEnquiryId,
  apiGetReviewById,
} from "../../../../../services/SuperAdmin/Enquiry/enquiry";
import { apiPostNewQuotation } from "../../../../../services/SuperAdmin/quotation/quotationService";
import { apiGwtAllQuotationProfileData } from "../../../../../services/SuperAdmin/quotation/quotationProfileService";

export const getEnquiryDetailsByEnquiryId = createAsyncThunk(
  "enquiry/details/data/details",
  async (data) => {
    try {
      const response = await apiGetEnquiryDetailsByEnquiryId(data);
      return response;
    } catch (error) {
      return error.response;
    }
  }
);

export const getProfileProduct = createAsyncThunk(
  "enquiry/details/data/profileProduct",
  async (data) => {
    try {
      const response = await apiGwtAllQuotationProfileData(data);
      return response;
    } catch (error) {
      return error.response;
    }
  }
);

export const PostQuotation = createAsyncThunk(
  "quotation/data/post",
  async (data) => {
    try {
      const response = await apiPostNewQuotation(data);
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
  name: "enquiry/details/data",
  initialState: {
    EnquiryDetails: [],
    reviewDetails: {},
    quotationProfile: [],
    loading: false,
  },
  reducers: {
    setQuantityQuotationProfile: (state, action) => {
      state.quotationProfile = state.quotationProfile.map((profile) => {
        if (
          profile.quotation_profile_id === action.payload.quotation_profile_id
        ) {
          return { ...profile, quantity: Number(action.payload.quantity) };
        }
        return profile;
      });
    },

    setQuantityQuotationProfileToZero: (state, action) => {
      state.quotationProfile = state.quotationProfile.map((profile) => {
        return { ...profile, quantity: 0 };
      });
    },
  },
  extraReducers: {
    [getEnquiryDetailsByEnquiryId.fulfilled]: (state, action) => {
      state.loading = false;
      state.EnquiryDetails = action.payload.data?.data || [];
    },
    [getEnquiryDetailsByEnquiryId.pending]: (state, action) => {
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
    [PostQuotation.fulfilled]: (state, action) => {},
    [getReviewByEnquiryListId.fulfilled]: (state, action) => {
      state.reviewDetails = action.payload?.data?.data || {};
    },
    [getProfileProduct.fulfilled]: (state, action) => {
      state.quotationProfile = action.payload?.data?.data || [];
    },
  },
});

export const {
  setQuantityQuotationProfile,
  setQuantityQuotationProfileToZero,
} = dataSlice.actions;

export default dataSlice.reducer;
