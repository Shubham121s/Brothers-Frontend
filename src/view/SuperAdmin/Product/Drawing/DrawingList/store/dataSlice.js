import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { apiDeleteDrawingByDrawingId, apiGetAllDrawingByProductId } from '../../../../../../services/SuperAdmin/Product/DrawingService'

export const getAllDrawingsByProductId = createAsyncThunk(
    'product/details/data/drawing/list',
    async (data) => {
        try {
            const response = await apiGetAllDrawingByProductId(data)
            return response
        } catch (error) {
            return error?.response
        }
    }
)
export const deleteDrawingByDrawingId = createAsyncThunk(
    'product/details/data/drawing/delete',
    async (data) => {
        try {
            const response = await apiDeleteDrawingByDrawingId(data)
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
    status: ''
}

const dataSlice = createSlice({
    name: 'product/details/data',
    initialState: {
        loading: false,
        drawingList: {},
        tableData: initialTableData,
        filterData: initialFilterData,
    },
    reducers: {
        setTableData: (state, action) => {
            state.tableData = action.payload
        },
        setDrawingList: (state, action) => {
            state.drawingList = action.payload
        },
        setFilterData: (state, action) => {
            state.filterData = action.payload
        },
    },
    extraReducers: {
        [getAllDrawingsByProductId.fulfilled]: (state, action) => {
            state.drawingList = action.payload.data?.data || []
            state.loading = false
        },
        [getAllDrawingsByProductId.pending]: (state, action) => {
            state.loading = true
        },
        [deleteDrawingByDrawingId.fulfilled]: (state, action) => {
            if (action.payload?.status === 200) {
                state.drawingList = {
                    ...state.drawingList,
                    Drawings: state.drawingList?.Drawings?.filter(drawing => drawing?.drawing_id !== action.meta.arg?.drawing_id)
                }
            }
        }
    },
})

export const { setTableData, setFilterData, setDrawingList } =
    dataSlice.actions

export default dataSlice.reducer
