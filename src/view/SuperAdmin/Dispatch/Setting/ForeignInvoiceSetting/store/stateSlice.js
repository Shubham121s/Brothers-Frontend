import { createSlice } from '@reduxjs/toolkit'

const stateSlice = createSlice({
  name: 'invoice/condition/setting/state',
  initialState: {
    newConditionDialog: false,
    deleteConditionDialog: false,
    editConditionDialog: false,
    selectedCondition: {}
  },
  reducers: {
    toggleNewConditionDialog: (state, action) => {
      state.newConditionDialog = action.payload
    },
    toggleDeleteConditionDialog: (state, action) => {
      state.deleteConditionDialog = action.payload
    },
    toggleEditConditionDialog: (state, action) => {
      state.editConditionDialog = action.payload
    },
    setSelectedCondition: (state, action) => {
      state.selectedCondition = action.payload
    }
  }
})

export const {
  toggleNewConditionDialog,
  toggleDeleteConditionDialog,
  toggleEditConditionDialog,
  setSelectedCondition
} = stateSlice.actions

export default stateSlice.reducer
