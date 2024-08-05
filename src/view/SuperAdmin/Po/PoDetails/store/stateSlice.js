import { createSlice } from '@reduxjs/toolkit'

const stateSlice = createSlice({
    name: 'po/accept/state',
    initialState: {
        deletePoItemDialog: false,
        editPoItemDialog: false,
        selectedPoItem: {}
    },
    reducers: {
        toggleDeletePoItemDialog: (state, action) => {
            state.deletePoItemDialog = action.payload
        },
        toggleEditPoItemDialog: (state, action) => {
            state.editPoItemDialog = action.payload
        },
        setSelectedPoItem: (state, action) => {
            state.selectedPoItem = action.payload
        },
    },
})

export const { setSelectedPoItem, toggleEditPoItemDialog, toggleDeletePoItemDialog } =
    stateSlice.actions

export default stateSlice.reducer
