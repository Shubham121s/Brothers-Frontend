import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { apiGetAllMaterialGradesWithPagination, apiPostNewMaterialGrades, apiUpdateMaterialGrades } from '../../../../../../services/SuperAdmin/Product/MaterialGradeService'

export const getAllMaterials = createAsyncThunk(
    'product/setting/material/data/all',
    async (data) => {
        try {
            const response = await apiGetAllMaterialGradesWithPagination(data)
            return response
        } catch (error) {
            return error?.response
        }
    }
)
export const postNewMaterial = createAsyncThunk(
    'product/setting/material/data/new',
    async (data) => {
        try {
            const response = await apiPostNewMaterialGrades(data)
            return response
        } catch (error) {
            return error?.response
        }
    }
)

export const updateMaterial = createAsyncThunk(
    'product/setting/material/data/update',
    async (data) => {
        try {
            const response = await apiUpdateMaterialGrades(data)
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
    name: 'product/setting/material/data',
    initialState: {
        loading: false,
        materialList: [],
        tableData: initialTableData,
        filterData: initialFilterData,
    },
    reducers: {
        setTableData: (state, action) => {
            state.tableData = action.payload
        },
        setMaterialList: (state, action) => {
            state.materialList = action.payload
        },
        setFilterData: (state, action) => {
            state.filterData = action.payload
        },
    },
    extraReducers: {
        [getAllMaterials.fulfilled]: (state, action) => {
            state.materialList = action.payload.data?.data || []
            state.tableData.total = action.payload.data?.total
            state.loading = false
        },
        [getAllMaterials.pending]: (state) => {
            state.loading = true
        },
        [updateMaterial.fulfilled]: (state, action) => {
            state.materialList = state.materialList.map((material) => {
                if (material.material_grade_id === action.meta.arg.material_grade_id) {
                    return { ...material, ...action.meta.arg }
                }
                return material
            })
        },
    },
})

export const { setTableData, setMaterialList, setFilterData } =
    dataSlice.actions

export default dataSlice.reducer
