import { createSlice } from '@reduxjs/toolkit'

export const initialState = {
  _id: '',
  name: '',
  avatar: '',
  username: '',
  email: '',
  authority: [],
  navigationConfigs: []
}

export const userSlice = createSlice({
  name: 'auth/user',
  initialState,
  reducers: {
    setUser: (_, action) => action.payload,
    userLoggedOut: () => initialState
  }
})

export const { setUser } = userSlice.actions

export default userSlice.reducer
