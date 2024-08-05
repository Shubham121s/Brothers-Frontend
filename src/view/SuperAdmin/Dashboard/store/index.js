import { combineReducers } from '@reduxjs/toolkit'
import data from './dataSlice'

const dashboardReducer = combineReducers({
    data
})

export default dashboardReducer
