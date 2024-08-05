import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { apiGetAllCustomers } from "../../../../../services/SuperAdmin/Customer/CustomerService";
import { apiGetAllProductsWithDrawing } from "../../../../../services/SuperAdmin/Product/IndexService";
import { apiUpdatePo } from "../../../../../services/SuperAdmin/Po/PoService";
import { apiGetPoDetailsByPoId } from "../../../../../services/SuperAdmin/Po/PoService";
import { apiGetPurchaseOrderDetailsByPurchaseORderId } from "../../../../../services/SuperAdmin/PruchaseOrder/PurchaseOrderService";
import { apiGetAllCategories } from "../../../../../services/SuperAdmin/Product/CategoryService";
import { apiUpdatePurchaseOrder } from "../../../../../services/SuperAdmin/Stock/StockService";
export const getPoDetailsByPoId = createAsyncThunk(
  "po/details/data/details",
  async (data) => {
    try {
      const response = await apiGetPurchaseOrderDetailsByPurchaseORderId(data);
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

export const getAllCategories = createAsyncThunk(
  "edit/po/data/po/category/all",
  async (data) => {
    try {
      const response = await apiGetAllCategories(data);
      return response;
    } catch (error) {
      return error?.response;
    }
  }
);

export const postUpdatePurchaseOrder = createAsyncThunk(
  "edit/po/data/po/update",
  async (data) => {
    try {
      const response = await apiUpdatePurchaseOrder(data);
      return response;
    } catch (error) {
      return error?.response;
    }
  }
);

const dataSlice = createSlice({
  name: "edit/porder/data",
  initialState: {
    customers: [],
    products: [],
    categoryList: [],
    poDetails: {},
  },
  extraReducers: {
    [getPoDetailsByPoId.fulfilled]: (state, action) => {
      state.poDetails = {
        ...action.payload.data.data,
        PurchaseOrderLists: action.payload.data.data.PurchaseOrderLists.map(
          (f) => {
            return {
              ...f,
              revision_number: f.Product.Drawings[0].revision_number,
            };
          }
        ),
      };
    },
    [getAllCustomers.fulfilled]: (state, action) => {
      state.customers = action.payload.data?.data || [];
    },
    [postUpdatePurchaseOrder.fulfilled]: (state) => {},
    [getAllProductsWithDrawing.fulfilled]: (state, action) => {
      state.products = action.payload.data?.data || [];
    },
    [getAllCategories.fulfilled]: (state, action) => {
      state.categoryList = action.payload?.data?.data || [];
    },
  },
});

export default dataSlice.reducer;
