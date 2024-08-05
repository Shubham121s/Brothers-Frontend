import { createSlice } from '@reduxjs/toolkit'

const stateSlice = createSlice({
    name: 'machineList/state',
    initialState: {
        deleteConfirmation: false,
        selectedMachine: {},
        newDialog: false,
        newDialogBreakdown: false,
    },
    reducers: {
        toggleDeleteConfirmation: (state, action) => {
            state.deleteConfirmation = action.payload
        },
        setSelectedMachine: (state, action) => {
            state.selectedMachine = action.payload
        },
        toggleNewDialog: (state, action) => {
            state.newDialog = action.payload
        },
        toggleNewDialogBreakdown: (state, action) => {
            state.newDialogBreakdown = action.payload
        }, 
    },
})

export const { toggleDeleteConfirmation, setSelectedMachine,toggleNewDialog,toggleNewDialogBreakdown } =
    stateSlice.actions

export default stateSlice.reducer
