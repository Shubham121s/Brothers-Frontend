import { combineReducers } from '@reduxjs/toolkit'
import data from './dataSlice'
import state from './stateSlice'
const materialReducer = combineReducers({
    data,
    state
})

export default materialReducer
