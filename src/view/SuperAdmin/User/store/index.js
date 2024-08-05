import { combineReducers } from '@reduxjs/toolkit'
import data from './dataSlice'
import state from './stateSlice'
const userReducer = combineReducers({
    data,
    state
})

export default userReducer
