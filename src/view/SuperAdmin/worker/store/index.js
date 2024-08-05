import { combineReducers } from '@reduxjs/toolkit'
import data from './dataSlice'
import state from './stateSlice'
const workerReducer = combineReducers({
    data,
    state
})

export default workerReducer
