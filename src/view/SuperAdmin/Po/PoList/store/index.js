import { combineReducers } from '@reduxjs/toolkit'
import data from './dataSlice'
const poReducer = combineReducers({
    data,
})

export default poReducer
