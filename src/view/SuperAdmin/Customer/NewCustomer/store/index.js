import { combineReducers } from '@reduxjs/toolkit'
import data from './dataSlice'
const newCustomerReducer = combineReducers({
    data,
})

export default newCustomerReducer
