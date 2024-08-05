import { combineReducers } from '@reduxjs/toolkit'
import data from './dataSlice'
import state from './stateSlice'
const patternReducer = combineReducers({
    data,
    state
})

export default patternReducer
