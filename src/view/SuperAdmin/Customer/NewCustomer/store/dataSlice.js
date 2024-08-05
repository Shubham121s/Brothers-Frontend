import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { apiPostRegisterNewCustomer } from '../../../../../services/SuperAdmin/Customer/CustomerService'

export const postRegisterNewCustomer = createAsyncThunk(
    'customer/new/data/customer',
    async (data) => {
        try {
            const response = await apiPostRegisterNewCustomer(data)
            return response
        } catch (error) {
            return error?.response
        }
    }
)

const dataSlice = createSlice({
    name: 'customer/new/data',
    initialState: {},
    reducers: {},
    extraReducers: {
        [postRegisterNewCustomer.fulfilled]: (state) => { },
    },
})

export default dataSlice.reducer
