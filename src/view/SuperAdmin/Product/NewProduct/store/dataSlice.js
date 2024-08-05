import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { apiGetAllCategories } from '../../../../../services/SuperAdmin/Product/CategoryService'
import { apiGetAllMaterialGrades } from '../../../../../services/SuperAdmin/Product/MaterialGradeService'
import { apiGetAllPatterns } from '../../../../../services/SuperAdmin/Product/PatternService'

export const getAllCategories = createAsyncThunk(
    'product/data/new/all/categories',
    async (data) => {
        try {
            const response = await apiGetAllCategories(data)
            return response
        } catch (error) {
            return error?.response
        }
    }
)

export const getAllMaterialGrades = createAsyncThunk(
    'product/data/new/all/material/grades',
    async (data) => {
        try {
            const response = await apiGetAllMaterialGrades(data)
            return response
        } catch (error) {
            return error?.response
        }
    }
)
export const getAllPatterns = createAsyncThunk(
    'product/data/new/all/patterns',
    async (data) => {
        try {
            const response = await apiGetAllPatterns(data)
            return response
        } catch (error) {
            return error?.response
        }
    }
)


const dataSlice = createSlice({
    name: 'product/data/new',
    initialState: {
        categoryList: [],
        materialGradeList: [],
        patternList: []
    },
    reducers: {
    },
    extraReducers: {
        [getAllCategories.fulfilled]: (state, action) => {
            state.categoryList = action.payload?.data?.data || []
        },
        [getAllMaterialGrades.fulfilled]: (state, action) => {
            state.materialGradeList = action.payload?.data?.data || []
        },
        [getAllPatterns.fulfilled]: (state, action) => {
            state.patternList = action.payload?.data?.data || []
        }
    },
})


export default dataSlice.reducer
