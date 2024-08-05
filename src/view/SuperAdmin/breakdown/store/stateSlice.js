import { createSlice } from '@reduxjs/toolkit'

const stateSlice = createSlice({
    name: 'breakdownList/state',
    initialState: {
        deleteConfirmation: false,
        selectedBreakdown: '',
        newDialog: false,
    },
    reducers: {
        toggleDeleteConfirmation: (state, action) => {
            state.deleteConfirmation = action.payload
        },
        setSelectedBreakdown: (state, action) => {
            state.selectedBreakdown = action.payload
        },
        toggleNewDialog: (state, action) => {
            state.newDialog = action.payload
        },
    },
})

export const { toggleDeleteConfirmation, setSelectedBreakdown,toggleNewDialog } =
    stateSlice.actions

export default stateSlice.reducer
