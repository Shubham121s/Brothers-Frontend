import { combineReducers } from "@reduxjs/toolkit";
import data from "./dataSlice";
import state from "./stateSlice";

const patternInvoiceReducer = combineReducers({
  data,
  state,
});

export default patternInvoiceReducer;
