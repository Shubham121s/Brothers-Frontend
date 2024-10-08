import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { apiGetInstrumentDashboardData } from '../../../../services/SuperAdmin/DashboardService'

export const getInstrumentCalibrationNearToMonth = createAsyncThunk(
  'instrument/dashboard/data/CalibrationNearToMonth',
  async (data) => {
    try {
      const response = await apiGetInstrumentDashboardData(data)
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
  name: 'instrument/dashboard/data',
  initialState: {
    loading: false,
    calibrationNearToDate: [],
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
    [getInstrumentCalibrationNearToMonth.fulfilled]: (state, action) => {
      state.calibrationNearToDate = action.payload.data?.data || []
      state.tableData.total = action.payload?.data?.total || 0
      state.loading = false
    },
    [getInstrumentCalibrationNearToMonth.pending]: (state) => {
      state.loading = true
    }
  }
})

export const { setTableData, setFilterData } = dataSlice.actions

export default dataSlice.reducer
