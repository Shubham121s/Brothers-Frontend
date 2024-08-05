import { combineReducers } from '@reduxjs/toolkit'
import data from './dataSlice'
import state from './stateSlice'
const acceptPoReducer = combineReducers({
    data,
    state
})

export default acceptPoReducer
