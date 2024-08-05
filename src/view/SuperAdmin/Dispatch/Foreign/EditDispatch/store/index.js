import { combineReducers } from '@reduxjs/toolkit'
import data from './dataSlice'
import state from './stateSlice'
const EditDispatchForeignReducer = combineReducers({
    data,
    state
})

export default EditDispatchForeignReducer
