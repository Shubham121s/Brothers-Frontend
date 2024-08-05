import { combineReducers } from '@reduxjs/toolkit'
import data from './dataSlice'
import state from './stateSlice'
const productDetailsReducer = combineReducers({
    data,
    state
})

export default productDetailsReducer
