import { combineReducers } from '@reduxjs/toolkit'
import data from './dataSlice'
import state from './stateSlice'
const newPoReducer = combineReducers({
    data,
    state
})

export default newPoReducer
