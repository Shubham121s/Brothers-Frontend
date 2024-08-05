import { createSlice } from '@reduxjs/toolkit'

const stateSlice = createSlice({
    name: 'product/setting/material/state',
    initialState: {
        newMaterialDialog: false,
        deleteMaterialDialog: false,
        editMaterialDialog: false,
        selectedMaterial: {}
    },
    reducers: {
        toggleNewMaterialDialog: (state, action) => {
            state.newMaterialDialog = action.payload
        },
        toggleDeleteMaterialDialog: (state, action) => {
            state.deleteMaterialDialog = action.payload
        },
        toggleEditMaterialDialog: (state, action) => {
            state.editMaterialDialog = action.payload
        },
        setSelectedMaterial: (state, action) => {
            state.selectedMaterial = action.payload
        },
    },
})

export const { toggleNewMaterialDialog, setSelectedMaterial, toggleEditMaterialDialog, toggleDeleteMaterialDialog } =
    stateSlice.actions

export default stateSlice.reducer
