import { createSlice } from '@reduxjs/toolkit'

export const initialState = {
  _id: '',
  name: '',
  avatar: '',
  username: '',
  email: '',
  authority: [],
  navigationConfigs: [],
  entryPath: ''
}

export const userSlice = createSlice({
  name: 'auth/user',
  initialState,
  reducers: {
    setUser: (_, action) => action.payload,
    setUserConfigs: (state, action) => {
      state.navigationConfigs = action.payload.navigationConfigs || []
      state.entryPath = action.payload.entryPath || ''
    },
    userLoggedOut: () => initialState
  }
})

export const { setUser, setUserConfigs } = userSlice.actions

export default userSlice.reducer
