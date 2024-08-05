import { createSlice } from '@reduxjs/toolkit'

const stateSlice = createSlice({
    name: 'annualList/state',
    initialState: {
        deleteConfirmation: false,
        selectedAnnual: '',
        newDialog: false,
    },
    reducers: {
        toggleDeleteConfirmation: (state, action) => {
            state.deleteConfirmation = action.payload
        },
        setSelectedAnnual: (state, action) => {
            state.selectedAnnual = action.payload
        },
        toggleNewDialog: (state, action) => {
            state.newDialog = action.payload
        },
    },
})

export const { toggleDeleteConfirmation, setSelectedAnnual,toggleNewDialog } =
    stateSlice.actions

export default stateSlice.reducer
