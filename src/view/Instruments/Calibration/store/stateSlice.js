import { createSlice } from '@reduxjs/toolkit'

const stateSlice = createSlice({
  name: 'annualList/state',
  initialState: {
    deleteConfirmation: false,
    selectedAnnual: '',
    addDialog: false,
    editDialog: false,
    imageDialog: false
  },
  reducers: {
    toggleDeleteConfirmation: (state, action) => {
      state.deleteConfirmation = action.payload
    },
    setSelectedAnnual: (state, action) => {
      state.selectedAnnual = action.payload
    },
    toggleNewDialog: (state, action) => {
      state.addDialog = action.payload
    },
    toggleEditDialog: (state, action) => {
      state.editDialog = action.payload
    },
    toggleImageDialog: (state, action) => {
      state.imageDialog = action.payload
    }
  }
})

export const {
  toggleDeleteConfirmation,
  setSelectedAnnual,
  toggleNewDialog,
  toggleEditDialog,
  toggleImageDialog
} = stateSlice.actions

export default stateSlice.reducer
