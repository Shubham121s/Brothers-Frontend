import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { apiGetCustomerDetailsByCustomerId } from '../../../../../services/SuperAdmin/Customer/CustomerService'
import { apiDeleteCustomerShippingAddressByShippingAddressId, apiPostNewCustomerShippingAddressByCustomerId, apiUpdateCustomerShippingAddressByShippingAddressId } from '../../../../../services/SuperAdmin/Customer/ShippingAddressService'
import { apiDeleteCustomerShippingDetailsByShippingDetailsId, apiPostNewCustomerShippingDetailsByCustomerId, apiUpdateCustomerShippingDetailsByShippingDetailsId } from '../../../../../services/SuperAdmin/Customer/ShippingDetailsService'


export const getCustomerDetailsByCustomerId = createAsyncThunk(
    'customer_details/data/details',
    async (data) => {
        try {
            const response = await apiGetCustomerDetailsByCustomerId(data)
            return response
        } catch (error) {
            return error?.response
        }
    }
)


// SHIPPING ADDRESS


export const postCustomerNewShippingAddress = createAsyncThunk(
    'customer_details/data/shipping/address/register',
    async (data) => {
        try {
            const response = await apiPostNewCustomerShippingAddressByCustomerId(data)
            return response
        } catch (error) {
            return error?.response
        }
    }
)

export const updateCustomerShippingAddress = createAsyncThunk(
    'customer_details/data/shipping/address/update',
    async (data) => {
        try {
            const response = await apiUpdateCustomerShippingAddressByShippingAddressId(data)
            return response
        } catch (error) {
            return error?.response
        }
    }
)
export const deleteCustomerShippingAddress = createAsyncThunk(
    'customer_details/data/shipping/address/delete',
    async (data) => {
        try {
            const response = await apiDeleteCustomerShippingAddressByShippingAddressId(data)
            return response
        } catch (error) {
            return error?.response
        }
    }
)

// SHIPPING DETAILS

export const postCustomerNewShippingDetails = createAsyncThunk(
    'customer_details/data/shipping/details/register',
    async (data) => {
        try {
            const response = await apiPostNewCustomerShippingDetailsByCustomerId(data)
            return response
        } catch (error) {
            return error?.response
        }
    }
)

export const updateCustomerShippingDetails = createAsyncThunk(
    'customer_details/data/shipping/details/update',
    async (data) => {
        try {
            const response = await apiUpdateCustomerShippingDetailsByShippingDetailsId(data)
            return response
        } catch (error) {
            return error?.response
        }
    }
)
export const deleteCustomerShippingDetails = createAsyncThunk(
    'customer_details/data/shipping/details/delete',
    async (data) => {
        try {
            const response = await apiDeleteCustomerShippingDetailsByShippingDetailsId(data)
            return response
        } catch (error) {
            return error?.response
        }
    }
)

const dataSlice = createSlice({
    name: 'customer_details/data',
    initialState: {
        loading: false,
        customerDetails: {},
    },
    reducers: {},
    extraReducers: {
        [getCustomerDetailsByCustomerId.fulfilled]: (state, action) => {
            state.customerDetails = action.payload.data?.data || {}
            state.loading = false
        },
        [getCustomerDetailsByCustomerId.pending]: (state) => {
            state.loading = true
        },

        // Shipping Address

        [postCustomerNewShippingAddress.fulfilled]: (state, action) => {
            if (action.payload?.status === 201) {
                state.customerDetails = { ...state.customerDetails, CustomerShippingAddresses: [...state.customerDetails?.CustomerShippingAddresses, action.payload.data?.data] }
            }
            state.addressLoading = false
        },
        [postCustomerNewShippingAddress.pending]: (state) => {
            state.addressLoading = true
        },
        [updateCustomerShippingAddress.fulfilled]: (state, action) => {
            if (action.payload?.status === 200) {
                state.customerDetails = {
                    ...state.customerDetails, CustomerShippingAddresses: state.customerDetails?.CustomerShippingAddresses.map((shipping_address) => {
                        if (shipping_address.shipping_address_id === action.meta.arg.shipping_address_id) {
                            return { ...shipping_address, ...action.meta.arg }
                        }
                        return shipping_address
                    })
                }
            }
        },
        [deleteCustomerShippingAddress.fulfilled]: (state, action) => {
            if (action.payload?.status === 200) {
                state.customerDetails = {
                    ...state.customerDetails, CustomerShippingAddresses: state.customerDetails?.CustomerShippingAddresses.filter((shipping_address) => shipping_address.shipping_address_id !== action.meta.arg.shipping_address_id)
                }
            }
        },


        // Shipping Details

        [postCustomerNewShippingDetails.fulfilled]: (state, action) => {
            if (action.payload?.status === 201) {
                state.customerDetails = { ...state.customerDetails, CustomerShippingDetails: [...state.customerDetails?.CustomerShippingDetails, action.payload.data?.data] }
            }
            state.shippingAddressLoading = false
        },

        [postCustomerNewShippingDetails.pending]: (state) => {
            state.shippingAddressLoading = true
        },
        [updateCustomerShippingDetails.fulfilled]: (state, action) => {
            if (action.payload?.status === 200) {
                state.customerDetails = {
                    ...state.customerDetails, CustomerShippingDetails: state.customerDetails?.CustomerShippingDetails.map((shipping_details) => {
                        if (shipping_details.shipping_details_id === action.meta.arg.shipping_details_id) {
                            return { ...shipping_details, ...action.meta.arg }
                        }
                        return shipping_details
                    })
                }
            }
        },
        [deleteCustomerShippingDetails.fulfilled]: (state, action) => {
            if (action.payload?.status === 200) {
                state.customerDetails = {
                    ...state.customerDetails, CustomerShippingDetails: state.customerDetails?.CustomerShippingDetails.filter((shipping_details) => shipping_details.shipping_details_id !== action.meta.arg.shipping_details_id)
                }
            }
        },
    },
})

export const { setTableData, setUserList, setFilterData } =
    dataSlice.actions

export default dataSlice.reducer
