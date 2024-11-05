import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import {
  apiDynamicDashboardData,
  apiGetYears,
  apiMonthlySalesData,
  apiYearlySalesData
} from '../../../../../services/SuperAdmin/Customer/CustomerdashboardService'
import { apiGetAllCustomersOption } from '../../../../../services/SuperAdmin/Customer/CustomerService'
export const getDynamicDashboardData = createAsyncThunk(
  'customer/dashboard/data/dynamic',
  async (data) => {
    try {
      const response = await apiDynamicDashboardData(data)
      return response
    } catch (error) {
      return error?.response
    }
  }
)

export const getAllCustomerOption = createAsyncThunk(
  'customer/dashboard/data/option/customer',
  async (data) => {
    try {
      const response = await apiGetAllCustomersOption()
      return response
    } catch (error) {
      return error?.response
    }
  }
)

export const getAllYears = createAsyncThunk(
  'customer/dashboard/data/option/years',
  async (data) => {
    try {
      const response = await apiGetYears()
      return response
    } catch (error) {
      return error?.response
    }
  }
)

export const getMonthlySales = createAsyncThunk(
  'customer/dashboard/data/month',
  async (data) => {
    try {
      const response = await apiMonthlySalesData(data)
      return response
    } catch (error) {
      return error?.response
    }
  }
)

export const getYarlySales = createAsyncThunk(
  'customer/dashboard/data/yearly',
  async (data) => {
    try {
      const response = await apiYearlySalesData(data)
      return response
    } catch (error) {
      return error?.response
    }
  }
)

export const initialTableData = {
  total: 0,
  pageIndex: 1,
  pageSize: 10,
  customer_id: '',
  year: '',
  month: ''
}

export const initialFilterData = {
  type: ''
}

const dataSlice = createSlice({
  name: 'customer/dashboard/data',
  initialState: {
    loading: false,
    customers: [],
    years: [],
    customerData: [],
    monthlySales: {},
    yearlySales: {},
    tableData: initialTableData,
    filterData: initialFilterData
  },
  reducers: {
    setTableData: (state, action) => {
      state.tableData = action.payload
    },
    setFilterData: (state, action) => {
      state.filterData = action.payload
    }
  },
  extraReducers: {
    [getDynamicDashboardData.fulfilled]: (state, action) => {
      state.customerData = action.payload.data?.data || []
      state.tableData.total = action.payload?.data?.total || 1
      state.loading = false
    },
    [getDynamicDashboardData.pending]: (state) => {
      state.loading = true
    },
    [getAllCustomerOption.fulfilled]: (state, action) => {
      state.customers = action.payload.data?.data || []
    },
    [getAllYears.fulfilled]: (state, action) => {
      state.years = action.payload.data?.data || []
    },
    [getMonthlySales.fulfilled]: (state, action) => {
      state.monthlySales = action.payload.data?.data || {}
    },
    [getYarlySales.fulfilled]: (state, action) => {
      state.yearlySales = action.payload.data?.data || {}
    }
  }
})

export const { setTableData, setFilterData } = dataSlice.actions

export default dataSlice.reducer
