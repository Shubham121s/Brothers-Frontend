import { createSlice } from '@reduxjs/toolkit'

const stateSlice = createSlice({
  name: 'po/accept/state',
  initialState: {
    deletePoItemDialog: false,
    editPoItemDialog: false,
    viewPoItemDialog: false,
    selectedPoItem: {}
  },
  reducers: {
    toggleDeletePoItemDialog: (state, action) => {
      state.deletePoItemDialog = action.payload
    },
    toggleEditPoItemDialog: (state, action) => {
      state.editPoItemDialog = action.payload
    },
    toggleViewPoItemDialog: (state, action) => {
      state.viewPoItemDialog = action.payload
    },
    setSelectedPoItem: (state, action) => {
      state.selectedPoItem = action.payload
    }
  }
})

export const {
  setSelectedPoItem,
  toggleEditPoItemDialog,
  toggleDeletePoItemDialog,
  toggleViewPoItemDialog
} = stateSlice.actions

export default stateSlice.reducer
