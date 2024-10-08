import { combineReducers } from '@reduxjs/toolkit'
import data from './dataSlice'
import state from './stateSlice'
const InstrumentReducer = combineReducers({
  data,
  state
})

export default InstrumentReducer
