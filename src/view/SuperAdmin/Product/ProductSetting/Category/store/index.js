import { combineReducers } from '@reduxjs/toolkit'
import data from './dataSlice'
import state from './stateSlice'
const categoryReducer = combineReducers({
    data,
    state
})

export default categoryReducer
