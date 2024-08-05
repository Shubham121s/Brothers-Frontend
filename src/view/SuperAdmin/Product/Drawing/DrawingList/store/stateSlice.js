import { createSlice } from '@reduxjs/toolkit'

const stateSlice = createSlice({
    name: 'product/details/state',
    initialState: {
        newDrawingDialog: false,
        deleteDrawingDialog: false,
        editDrawingDialog: false,
        selectedDrawing: {}
    },
    reducers: {
        toggleNewDrawingDialog: (state, action) => {
            state.newDrawingDialog = action.payload
        },
        toggleDeleteDrawingDialog: (state, action) => {
            state.deleteDrawingDialog = action.payload
        },
        toggleEditDrawingDialog: (state, action) => {
            state.editDrawingDialog = action.payload
        },
        setSelectedDrawing: (state, action) => {
            state.selectedDrawing = action.payload
        },
    },
})

export const { toggleNewDrawingDialog, setSelectedDrawing, toggleEditDrawingDialog, toggleDeleteDrawingDialog } =
    stateSlice.actions

export default stateSlice.reducer
