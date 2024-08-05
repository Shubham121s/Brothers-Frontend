import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { apiRegisterNewDispatchForeignInvoice } from '../../../../../../services/SuperAdmin/Invoice/DispatchServices'
import { apiGetAllCustomers } from '../../../../../../services/SuperAdmin/Customer/CustomerService'
import { apiGetAllPosByCustomerId } from '../../../../../../services/SuperAdmin/Po/PoService'
import { apiGetCustomerShippingAddressByCustomerId } from '../../../../../../services/SuperAdmin/Customer/ShippingAddressService'
import { apiGetCustomerShippingDetailsByCustomerId } from '../../../../../../services/SuperAdmin/Customer/ShippingDetailsService'





export const getAllCustomers = createAsyncThunk(
    'new/foreign/invoice/data/customer',
    async (data) => {
        try {
            const response = await apiGetAllCustomers(data)
            return response
        } catch (error) {
            return error?.response
        }
    }
)

export const getAllShippingAddressByCustomerId = createAsyncThunk(
    'new/foreign/invoice/data/customer/address',
    async (data) => {
        try {
            const response = await apiGetCustomerShippingAddressByCustomerId(data)
            return response
        } catch (error) {
            return error?.response
        }
    }
)
export const getAllShippingDetailsByCustomerId = createAsyncThunk(
    'new/foreign/invoice/data/customer/shipping/address',
    async (data) => {
        try {
            const response = await apiGetCustomerShippingDetailsByCustomerId(data)
            return response
        } catch (error) {
            return error?.response
        }
    }
)


export const getAllPosByCustomerId = createAsyncThunk(
    'new/foreign/invoice/data/po/all',
    async (data) => {
        try {
            const response = await apiGetAllPosByCustomerId(data)
            return response
        } catch (error) {
            return error?.response
        }
    }
)


export const postNewDispatchForeignInvoice = createAsyncThunk(
    'new/foreign/invoice/data/invoice/register',
    async (data) => {
        try {
            const response = await apiRegisterNewDispatchForeignInvoice(data)
            return response
        } catch (error) {
            return error?.response
        }
    }
)


const dataSlice = createSlice({
    name: 'new/foreign/invoice/data',
    initialState: {
        customerList: [],
        poList: [],
        shippingAddressList: [],
        shippingDetailsList: [],
    },
    reducers: {
    },
    extraReducers: {
        [getAllCustomers.fulfilled]: (state, action) => {
            state.customerList = action.payload.data?.data || []
        },
        [getAllCustomers.pending]: (state, action) => {
            state.customerList = []
        },
        [getAllPosByCustomerId.fulfilled]: (state, action) => {
            state.poList = action.payload.data?.data || []
        },
        [getAllPosByCustomerId.pending]: (state, action) => {
            state.poList = []
        },
        [postNewDispatchForeignInvoice.fulfilled]: (state) => { },

        [getAllShippingAddressByCustomerId.fulfilled]: (state, action) => {
            state.shippingAddressList = action.payload.data?.data || []
        },
        [getAllShippingAddressByCustomerId.pending]: (state, action) => {
            state.shippingAddressList = []
        },
        [getAllShippingDetailsByCustomerId.fulfilled]: (state, action) => {
            state.shippingDetailsList = action.payload.data?.data || []
        },
        [getAllShippingDetailsByCustomerId.pending]: (state, action) => {
            state.shippingDetailsList = []
        },
    },
})

export default dataSlice.reducer
