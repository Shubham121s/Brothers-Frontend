import { combineReducers } from '@reduxjs/toolkit'
import data from './dataSlice'
import state from './stateSlice'

const dispatchInvoiceReducer = combineReducers({
    data,
    state
})

export default dispatchInvoiceReducer
