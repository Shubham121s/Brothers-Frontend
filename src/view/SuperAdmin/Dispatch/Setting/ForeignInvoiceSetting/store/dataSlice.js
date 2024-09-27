import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import {
  apiNewConditionRegister,
  apiGetAllCondition,
  apiUpdateCondition,
  apiDeleteCondition
} from '../../../../../../services/SuperAdmin/Po/Note.Service'

export const getAllConditions = createAsyncThunk(
  'invoice/condition/setting/data/all',
  async (data) => {
    try {
      const response = await apiGetAllCondition(data)
      return response
    } catch (error) {
      return error?.response
    }
  }
)
export const postNewCondition = createAsyncThunk(
  'invoice/condition/setting/data/new',
  async (data) => {
    try {
      const response = await apiNewConditionRegister(data)
      return response
    } catch (error) {
      return error?.response
    }
  }
)
export const updateCondition = createAsyncThunk(
  'invoice/condition/setting/data/update',
  async (data) => {
    try {
      const response = await apiUpdateCondition(data)
      return response
    } catch (error) {
      return error?.response
    }
  }
)

export const deleteCondition = createAsyncThunk(
  'invoice/condition/setting/data/delete',
  async (data) => {
    try {
      const response = await apiDeleteCondition(data)
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
  status: ''
}

const dataSlice = createSlice({
  name: 'invoice/condition/setting/data',
  initialState: {
    loading: false,
    conditionList: [],
    tableData: initialTableData,
    filterData: initialFilterData
  },
  reducers: {
    setTableData: (state, action) => {
      state.tableData = action.payload
    },
    setCategoryList: (state, action) => {
      state.categoryList = action.payload
    },
    setFilterData: (state, action) => {
      state.filterData = action.payload
    }
  },
  extraReducers: {
    [getAllConditions.fulfilled]: (state, action) => {
      state.conditionList = action.payload.data?.data || []
      state.tableData.total = action.payload.data?.total
      state.loading = false
    },
    [getAllConditions.pending]: (state) => {
      state.loading = true
    },
    [updateCondition.fulfilled]: (state, action) => {},
    [postNewCondition.fulfilled]: (state, action) => {},
    [deleteCondition.fulfilled]: (state, action) => {}
  }
})

export const { setTableData, setCategoryList, setFilterData } =
  dataSlice.actions

export default dataSlice.reducer
