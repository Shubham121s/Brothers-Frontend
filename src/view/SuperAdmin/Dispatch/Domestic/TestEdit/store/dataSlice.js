import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  apiRegisterNewDispatchDomesticInvoice,
  apiGetDispatchDomesticInvoiceByInvoiceIdTest,
} from "../../../../../../services/SuperAdmin/Invoice/DispatchServices";
import { apiGetAllCustomers } from "../../../../../../services/SuperAdmin/Customer/CustomerService";
import { apiGetAllPosByCustomerId } from "../../../../../../services/SuperAdmin/Po/PoService";
import { apiGetCustomerShippingDetailsByCustomerId } from "../../../../../../services/SuperAdmin/Customer/ShippingDetailsService";
import { apiGetCustomerShippingAddressByCustomerId } from "../../../../../../services/SuperAdmin/Customer/ShippingAddressService";

export const getAllCustomers = createAsyncThunk(
  "new/domestic/invoice/data/customer",
  async (data) => {
    try {
      const response = await apiGetAllCustomers(data);
      return response;
    } catch (error) {
      return error?.response;
    }
  }
);

export const getAllShippingAddressByCustomerId = createAsyncThunk(
  "new/domestic/invoice/data/customer/address",
  async (data) => {
    try {
      const response = await apiGetCustomerShippingAddressByCustomerId(data);
      return response;
    } catch (error) {
      return error?.response;
    }
  }
);

export const getAllPosByCustomerId = createAsyncThunk(
  "new/domestic/invoice/data/po/all",
  async (data) => {
    try {
      const response = await apiGetAllPosByCustomerId(data);
      return response;
    } catch (error) {
      return error?.response;
    }
  }
);

export const postNewDispatchDomesticInvoice = createAsyncThunk(
  "new/domestic/invoice/data/invoice/register",
  async (data) => {
    try {
      const response = await apiRegisterNewDispatchDomesticInvoice(data);
      return response;
    } catch (error) {
      return error?.response;
    }
  }
);

export const getDispatchTestEdit = createAsyncThunk(
  "new/domestic/invoice/data/invoice/id",
  async (data) => {
    try {
      const response = await apiGetDispatchDomesticInvoiceByInvoiceIdTest(data);
      return response;
    } catch (error) {
      return error?.response;
    }
  }
);

const dataSlice = createSlice({
  name: "testEdit/domestic/invoice/data",
  initialState: {
    customerList: [],
    poList: [],
    shippingAddressList: [],
    invoice: {},
  },
  reducers: {},
  extraReducers: {
    [getAllCustomers.fulfilled]: (state, action) => {
      state.customerList = action.payload.data?.data || [];
    },
    [getAllCustomers.pending]: (state, action) => {
      state.customerList = [];
    },
    [getAllPosByCustomerId.fulfilled]: (state, action) => {
      state.poList = action.payload.data?.data || [];
    },
    [getAllPosByCustomerId.pending]: (state, action) => {
      state.poList = [];
    },

    [postNewDispatchDomesticInvoice.fulfilled]: (state) => {},

    [getAllShippingAddressByCustomerId.fulfilled]: (state, action) => {
      state.shippingAddressList = action.payload.data?.data || [];
    },
    [getAllShippingAddressByCustomerId.pending]: (state) => {
      state.shippingAddressList = [];
    },

    [getDispatchTestEdit.fulfilled]: (state, action) => {
      state.invoice = action.payload.data.data;
    },
  },
});

export default dataSlice.reducer;
