import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { apiGetAllUserWithPagination, apiPostNewUserRegister, apiUpdateUserDetails } from '../../../../services/SuperAdmin/UserService'

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


export const initialTableData = {
    total: 0,
    pageIndex: 1,
    pageSize: 10,
    query: '',
}

export const initialFilterData = {
    type: '',
}

const dataSlice = createSlice({
    name: 'user/data',
    initialState: {
        loading: false,
        userList: [],
        tableData: initialTableData,
        filterData: initialFilterData,
    },
    reducers: {
        setTableData: (state, action) => {
            state.tableData = action.payload
        },
        setUserList: (state, action) => {
            state.userList = action.payload
        },
        setFilterData: (state, action) => {
            state.filterData = action.payload
        },
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
        [newUserRegister.fulfilled]: (state) => { },
        [updateUserDetails.fulfilled]: (state, action) => {
            state.userList = state.userList.map((user) => {
                if (user.user_id === action.meta.arg.user_id) {
                    return { ...user, ...action.meta.arg }
                }
                return user
            })
        },
    },
})

export const { setTableData, setUserList, setFilterData } =
    dataSlice.actions

export default dataSlice.reducer
