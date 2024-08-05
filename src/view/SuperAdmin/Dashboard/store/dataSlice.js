import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { apiGetDashboardData } from '../../../../services/SuperAdmin/DashboardService'

export const getSuperAdminDashboardData = createAsyncThunk(
    'super-admin/dashboard/data/getDashboardData',
    async (data) => {
        try {
            const response = await apiGetDashboardData()
            return response
        } catch (error) {
            return error?.response
        }
    }
)

const dataSlice = createSlice({
    name: 'super-admin/dashboard/data',
    initialState: {
        loading: true,
        dashboardData: {},
    },
    reducers: {},
    extraReducers: {
        [getSuperAdminDashboardData.fulfilled]: (state, action) => {
            state.dashboardData = action.payload?.data?.data || {}
            state.loading = false
        },
        [getSuperAdminDashboardData.pending]: (state) => {
            state.loading = true
        },
    },
})

export default dataSlice.reducer
