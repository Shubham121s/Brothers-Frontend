import { combineReducers } from '@reduxjs/toolkit'
import data from './dataSlice'
const newProductReducer = combineReducers({
    data,
})

export default newProductReducer
