import { createSlice } from '@reduxjs/toolkit'

const stateSlice = createSlice({
  name: 'instruments/data',
  initialState: {
    deleteConfirmation: false,
    addDialog: false,
    editDialog: false,
    selectedInstrument: {}
  },
  reducers: {
    togglDeleteConfirmationDialog: (state, action) => {
      state.deleteConfirmation = action.payload
    },
    togglAddDialog: (state, action) => {
      state.addDialog = action.payload
    },
    togglEditDialog: (state, action) => {
      state.editDialog = action.payload
    },
    setSelectedInstrument: (state, action) => {
      state.selectedInstrument = action.payload
    }
  }
})

export const {
  setSelectedInstrument,
  togglDeleteConfirmationDialog,
  togglAddDialog,
  togglEditDialog
} = stateSlice.actions

export default stateSlice.reducer
