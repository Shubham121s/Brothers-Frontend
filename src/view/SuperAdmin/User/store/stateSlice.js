import { createSlice } from '@reduxjs/toolkit'

const stateSlice = createSlice({
  name: 'user/state',
  initialState: {
    newUserDialog: false,
    deleteUserDialog: false,
    editUserDialog: false,
    formAssignDialog: false,
    passwordDialog: false,
    selectedUser: {}
  },
  reducers: {
    toggleNewUserDialog: (state, action) => {
      state.newUserDialog = action.payload
    },
    toggleDeleteUserDialog: (state, action) => {
      state.deleteUserDialog = action.payload
    },
    toggleEditUserDialog: (state, action) => {
      state.editUserDialog = action.payload
    },
    toggleFormAssignDialog: (state, action) => {
      state.formAssignDialog = action.payload
    },
    togglePasswordDialog: (state, action) => {
      state.passwordDialog = action.payload
    },
    setSelectedUser: (state, action) => {
      state.selectedUser = action.payload
    }
  }
})

export const {
  toggleNewUserDialog,
  setSelectedUser,
  toggleEditUserDialog,
  toggleDeleteUserDialog,
  toggleFormAssignDialog,
  togglePasswordDialog
} = stateSlice.actions

export default stateSlice.reducer
