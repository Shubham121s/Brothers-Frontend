import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  apiPostNewEnquiryreview,
  apiDeleteSelectedMaterial,
} from "../../../../../services/SuperAdmin/Enquiry/enquiry";
import { apiGetAllCustomersOption } from "../../../../../services/SuperAdmin/Customer/CustomerService";
import { apiGetMaterialGradesOption } from "../../../../../services/SuperAdmin/Product/MaterialGradeService";
import { apiGwtAllQuotationProfileData } from "../../../../../services/SuperAdmin/quotation/quotationProfileService";
export const postNewEnquiryreview = createAsyncThunk(
  "enquiry/review/data/post",
  async (data) => {
    try {
      const response = await apiPostNewEnquiryreview(data);
      return response;
    } catch (error) {
      return error?.response;
    }
  }
);

export const getCustomerAsOption = createAsyncThunk(
  "enquiry/customer/data/get",
  async (data) => {
    try {
      const response = await apiGetAllCustomersOption(data);
      return response;
    } catch (error) {
      return error?.response;
    }
  }
);

export const getProductsProfile = createAsyncThunk(
  "enquiry/product/data/get",
  async (data) => {
    try {
      const response = await apiGwtAllQuotationProfileData(data);
      return response;
    } catch (error) {
      return error?.response;
    }
  }
);

export const getMaterialGradeAsOption = createAsyncThunk(
  "enquiry/material/data/get",
  async (data) => {
    try {
      const response = await apiGetMaterialGradesOption();
      return response;
    } catch (error) {
      return error?.response;
    }
  }
);

export const deleteSelectedProduct = createAsyncThunk(
  "enquiry/material/data/delete",
  async (data) => {
    try {
      const response = await apiDeleteSelectedMaterial(data);
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

const dataSlice = createSlice({
  name: "enquiryReview/data",
  initialState: {
    loading: false,
    tableData: initialTableData,
    customers: [],
    material_grade: [],
    products: [],
  },
  reducers: {
    setTableData: (state, action) => {
      state.tableData = action.payload;
    },
  },
  extraReducers: {
    [postNewEnquiryreview.fulfilled]: (state, action) => {
      //   state.enquiryList = action.payload.data?.data || [];
      //   state.tableData.table = action.payload.data.total || 0;
      //   state.loading = false;
    },
    // [getAllEnquiry.pending]: (state, action) => {
    //   state.loading = true;
    // },
    [getCustomerAsOption.fulfilled]: (state, action) => {
      state.customers = action.payload.data?.data || [];
    },
    [getProductsProfile.fulfilled]: (state, action) => {
      state.products = action.payload.data?.data || [];
    },
    [getMaterialGradeAsOption.fulfilled]: (state, action) => {
      state.material_grade = action.payload.data?.data || [];
    },
    [deleteSelectedProduct.fulfilled]: (state, action) => {},
  },
});

export const { setTableData, setFilterData } = dataSlice.actions;

export default dataSlice.reducer;
