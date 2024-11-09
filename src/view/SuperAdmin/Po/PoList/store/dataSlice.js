import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import {
  apiGetAllPoWithPagination,
  apiDeletePo,
  apiGetPoNumber,
  apiGetAllPoNumberOption,
  apiGetAllPOAOption,
  apiGetAllPoYears,
  apiGetAllPoMonths,
  apiGetAllPoDateFromMonthAndYear
} from '../../../../../services/SuperAdmin/Po/PoService'

export const getAllPoWithPagination = createAsyncThunk(
  'po/data/list/all',
  async (data) => {
    try {
      const response = await apiGetAllPoWithPagination(data)
      return response
    } catch (error) {
      return error.response
    }
  }
)

export const deletePo = createAsyncThunk(
  'po/data/list/delete',
  async (data) => {
    try {
      const response = await apiDeletePo(data)
      return response
    } catch (error) {
      return error.response
    }
  }
)

export const getAllPoYears = createAsyncThunk(
  'po/data/list/po/years',
  async () => {
    try {
      const response = await apiGetAllPoYears()
      return response
    } catch (error) {
      return error.response
    }
  }
)

export const getAllPoMonths = createAsyncThunk(
  'po/data/list/po/months',
  async (data) => {
    try {
      const response = await apiGetAllPoMonths(data)
      return response
    } catch (error) {
      return error.response
    }
  }
)

export const getAllPoDates = createAsyncThunk(
  'po/data/list/po/dates',
  async (data) => {
    try {
      const response = await apiGetAllPoDateFromMonthAndYear(data)
      return response
    } catch (error) {
      return error.response
    }
  }
)

export const getAllPoNumber = createAsyncThunk(
  'po/data/list/po/number',
  async (data) => {
    try {
      const response = await apiGetAllPoNumberOption(data)
      return response
    } catch (error) {
      return error.response
    }
  }
)

export const getAllPOANumber = createAsyncThunk(
  'po/data/list/poa/number',
  async (data) => {
    try {
      const response = await apiGetAllPOAOption(data)
      return response
    } catch (error) {
      return error.response
    }
  }
)

export const initialTableData = {
  total: 0,
  pageIndex: 1,
  pageSize: 10,
  query: '',
  poNumber: '',
  poaNumber: '',
  startDate: '',
  endDate: '',
  months: '',
  year: '',
  date: ''
}

export const initialFilterData = {
  status: ''
}

const dataSlice = createSlice({
  name: 'po/data/list',
  initialState: {
    loading: false,
    poList: [],
    years: [],
    dates: [],
    months: [],
    poNumbers: [],
    poaNumbers: [],
    tableData: initialTableData,
    filterData: initialFilterData
  },
  reducers: {
    setTableData: (state, action) => {
      state.tableData = action.payload
    },
    setFilterData: (state, action) => {
      state.filterData = action.payload
    },
    setStartDate: (state, action) => {
      state.tableData.startDate = action.payload
    },
    setEndDate: (state, action) => {
      state.tableData.endDate = action.payload
    }
  },
  extraReducers: {
    [getAllPoWithPagination.fulfilled]: (state, action) => {
      state.poList = action.payload.data?.data || []
      state.tableData.total = action.payload.data.total || 0
      state.loading = false
    },
    [getAllPoWithPagination.pending]: (state, action) => {
      state.loading = true
    },
    [getAllPoNumber.fulfilled]: (state, action) => {
      state.poNumbers = action.payload.data?.data || []
    },
    [getAllPOANumber.fulfilled]: (state, action) => {
      state.poaNumbers = action.payload.data?.data || []
    },
    [getAllPoYears.fulfilled]: (state, action) => {
      state.years = action.payload.data?.data || []
    },
    [getAllPoMonths.fulfilled]: (state, action) => {
      state.months = action.payload.data?.data || []
    },
    [getAllPoDates.fulfilled]: (state, action) => {
      state.dates = action.payload.data?.data || []
    },
    [deletePo.fulfilled]: (state, action) => {}
  }
})

export const { setTableData, setFilterData, setStartDate, setEndDate } =
  dataSlice.actions

export default dataSlice.reducer
