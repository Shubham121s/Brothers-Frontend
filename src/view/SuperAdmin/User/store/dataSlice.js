import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import {
  apiGetAllUserWithPagination,
  apiPostNewUserRegister,
  apiUpdateUserDetails,
  apiGetAllForms,
  apiUpdateFormDetail
} from '../../../../services/SuperAdmin/UserService'

export const getAllUsers = createAsyncThunk(
  'user/data/getUsers',
  async (data) => {
    try {
      const response = await apiGetAllUserWithPagination(data)
      return response
    } catch (error) {
      return error?.response
    }
  }
)
export const newUserRegister = createAsyncThunk(
  'user/data/new',
  async (data) => {
    try {
      const response = await apiPostNewUserRegister(data)
      return response
    } catch (error) {
      return error?.response
    }
  }
)
export const updateUserDetails = createAsyncThunk(
  'user/data/update',
  async (data) => {
    try {
      const response = await apiUpdateUserDetails(data)
      return response
    } catch (error) {
      return error?.response
    }
  }
)

export const getFormModule = createAsyncThunk(
  'user/data/forms',
  async (data) => {
    try {
      const response = await apiGetAllForms(data)
      return response
    } catch (error) {
      return error?.response
    }
  }
)

export const updateFormDetail = createAsyncThunk(
  'user/data/forms/detail',
  async (data) => {
    try {
      const response = await apiUpdateFormDetail(data)
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

export const initialFormTableData = {
  total: 0,
  pageIndex: 1,
  pageSize: 10,
  query: ''
}

export const initialFilterData = {
  type: ''
}

const dataSlice = createSlice({
  name: 'user/data',
  initialState: {
    loading: false,
    formloading: false,
    userList: [],
    formList: [],
    tableData: initialTableData,
    filterData: initialFilterData,
    tableFormData: initialFormTableData
  },
  reducers: {
    setTableData: (state, action) => {
      state.tableData = action.payload
    },
    setFormTableData: (state, action) => {
      state.tableFormData = action.payload
    },
    setUserList: (state, action) => {
      state.userList = action.payload
    },
    setFilterData: (state, action) => {
      state.filterData = action.payload
    },
    setShowInMenu: (state, action) => {
      state.formList = state.formList.map((item) =>
        item.module_id === action.payload.module_id
          ? { ...item, show_in_menu: action.payload.status }
          : item
      )
    }
  },
  extraReducers: {
    [getAllUsers.fulfilled]: (state, action) => {
      state.userList = action.payload.data?.data || []
      state.tableData.total = action.payload.data?.total
      state.loading = false
    },
    [getAllUsers.pending]: (state) => {
      state.loading = true
    },
    [getFormModule.fulfilled]: (state, action) => {
      state.formList = action.payload.data?.data || []
      state.tableFormData.total = action.payload.data?.total
      state.formloading = false
    },
    [getFormModule.pending]: (state) => {
      state.formloading = true
    },
    [newUserRegister.fulfilled]: (state) => {},
    [updateUserDetails.fulfilled]: (state, action) => {
      state.userList = state.userList.map((user) => {
        if (user.user_id === action.meta.arg.user_id) {
          return { ...user, ...action.meta.arg }
        }
        return user
      })
    },
    [updateFormDetail.pending]: (state) => {}
  }
})

export const {
  setTableData,
  setUserList,
  setFilterData,
  setFormTableData,
  setShowInMenu
} = dataSlice.actions

export default dataSlice.reducer
