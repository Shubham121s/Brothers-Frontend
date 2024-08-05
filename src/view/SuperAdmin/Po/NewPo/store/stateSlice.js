import { createSlice } from '@reduxjs/toolkit'

const stateSlice = createSlice({
    name: 'new/po/state',
    initialState: {
        newPoItemDialog: false,
        deletePoItemDialog: false,
        editPoItemDialog: false,
        selectedPoItem: {}
    },
    reducers: {
        toggleNewPoItemDialog: (state, action) => {
            state.newPoItemDialog = action.payload
        },
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

export const { toggleNewPoItemDialog, setSelectedPoItem, toggleEditPoItemDialog, toggleDeletePoItemDialog } =
    stateSlice.actions

export default stateSlice.reducer
