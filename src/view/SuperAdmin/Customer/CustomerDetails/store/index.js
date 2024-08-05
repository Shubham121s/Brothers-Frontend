import { combineReducers } from '@reduxjs/toolkit'
import data from './dataSlice'
import state from './stateSlice'
const customerDetailsReducer = combineReducers({
    data,
    state
})

export default customerDetailsReducer
