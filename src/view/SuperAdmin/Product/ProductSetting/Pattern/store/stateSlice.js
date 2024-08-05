import { createSlice } from '@reduxjs/toolkit'

const stateSlice = createSlice({
    name: 'product/setting/pattern/state',
    initialState: {
        newPatternDialog: false,
        deletePatternDialog: false,
        editPatternDialog: false,
        selectedPattern: {}
    },
    reducers: {
        toggleNewPatternDialog: (state, action) => {
            state.newPatternDialog = action.payload
        },
        toggleDeletePatternDialog: (state, action) => {
            state.deletePatternDialog = action.payload
        },
        toggleEditPatternDialog: (state, action) => {
            state.editPatternDialog = action.payload
        },
        setSelectedPattern: (state, action) => {
            state.selectedPattern = action.payload
        },
    },
})

export const { toggleNewPatternDialog, setSelectedPattern, toggleEditPatternDialog, toggleDeletePatternDialog } =
    stateSlice.actions

export default stateSlice.reducer
