import { combineReducers } from '@reduxjs/toolkit'
import state from './stateSlice'
import data from './dataSlice'

const calibrationReducer = combineReducers({
  state,
  data
})

export default calibrationReducer
