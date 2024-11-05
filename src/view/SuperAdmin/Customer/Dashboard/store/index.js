import { combineReducers } from '@reduxjs/toolkit'
import data from './dataSlice'

const customerDashboardReducer = combineReducers({
  data
})

export default customerDashboardReducer
