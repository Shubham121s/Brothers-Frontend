import { combineReducers } from '@reduxjs/toolkit'
import data from './dataSlice'
import state from './stateSlice'
const NewDispatchForeignReducer = combineReducers({
    data,
    state
})

export default NewDispatchForeignReducer
