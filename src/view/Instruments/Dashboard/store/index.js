import { combineReducers } from '@reduxjs/toolkit'
import data from './dataSlice'

const instrumentDashboardReducer = combineReducers({
  data
})

export default instrumentDashboardReducer
