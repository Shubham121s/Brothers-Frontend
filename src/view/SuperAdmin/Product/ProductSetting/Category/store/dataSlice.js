import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { apiGetAllCategories, apiPostNewCategory, apiUpdateCategory } from '../../../../../../services/SuperAdmin/Product/CategoryService'

export const getAllCategories = createAsyncThunk(
    'product/setting/category/data/all',
    async (data) => {
        try {
            const response = await apiGetAllCategories(data)
            return response
        } catch (error) {
            return error?.response
        }
    }
)
export const postNewCategory = createAsyncThunk(
    'product/setting/category/data/new',
    async (data) => {
        try {
            const response = await apiPostNewCategory(data)
            return response
        } catch (error) {
            return error?.response
        }
    }
)
export const updateCategory = createAsyncThunk(
    'product/setting/category/data/update',
    async (data) => {
        try {
            const response = await apiUpdateCategory(data)
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
    status: '',
}

const dataSlice = createSlice({
    name: 'product/setting/category/data',
    initialState: {
        loading: false,
        categoryList: [],
        tableData: initialTableData,
        filterData: initialFilterData,
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
        },
    },
    extraReducers: {
        [getAllCategories.fulfilled]: (state, action) => {
            state.categoryList = action.payload.data?.data || []
            state.tableData.total = action.payload.data?.total
            state.loading = false
        },
        [getAllCategories.pending]: (state) => {
            state.loading = true
        },
        [updateCategory.fulfilled]: (state, action) => {
            state.categoryList = state.categoryList.map((category) => {
                if (category.category_id === action.meta.arg.category_id) {
                    return { ...category, ...action.meta.arg }
                }
                return category
            })
        },
    },
})

export const { setTableData, setCategoryList, setFilterData } =
    dataSlice.actions

export default dataSlice.reducer
