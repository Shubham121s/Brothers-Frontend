import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import {
  apiGetCustomerStatisticData,
  apiGetCustomersWithPagination,
  apiDeleteCustomer
} from '../../../../services/SuperAdmin/Customer/CustomerService'

import {
  apiPostNewInstrument,
  apiDeleteInstrument,
  apiInstrument,
  apiPutEditInstrument
} from '../../../../services/Instrument/InstrumentService'

export const getInstrument = createAsyncThunk(
  'instrument/data/get',
  async (data) => {
    try {
      const response = await apiInstrument(data)
      return response
    } catch (error) {
      return error?.response
    }
  }
)

export const putInstrument = createAsyncThunk(
  'customers/data/statistic',
  async (data) => {
    try {
      const response = await apiPutEditInstrument(data)
      return response
    } catch (error) {
      return error?.response
    }
  }
)

export const deleteInstrument = createAsyncThunk(
  'instrument/data/delete',
  async (data) => {
    try {
      const response = await apiDeleteInstrument(data)
      return response
    } catch (error) {
      return error?.response
    }
  }
)

export const addInstrument = createAsyncThunk(
  'instrument/data/add',
  async (data) => {
    try {
      const response = await apiPostNewInstrument(data)
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
  query: ''
}

export const initialFilterData = {
  type: ''
}

const dataSlice = createSlice({
  name: 'customers/data',
  initialState: {
    loading: false,
    instrumentList: [],
    tableData: initialTableData,
    filterData: initialFilterData
  },
  reducers: {
    setTableData: (state, action) => {
      state.tableData = action.payload
    },
    setCustomerList: (state, action) => {
      state.instrumentList = action.payload
    },
    setFilterData: (state, action) => {
      state.filterData = action.payload
    }
  },
  extraReducers: {
    [getInstrument.fulfilled]: (state, action) => {
      state.instrumentList = action.payload.data?.data
      state.tableData.total = action.payload?.data?.total
      state.loading = false
    },
    [getInstrument.pending]: (state) => {
      state.loading = true
    },
    [putInstrument.fulfilled]: (state) => {},
    [addInstrument.fulfilled]: (state) => {},
    [addInstrument.fulfilled]: (state) => {}
  }
})

export const { setTableData, setCustomerList, setFilterData } =
  dataSlice.actions

export default dataSlice.reducer
