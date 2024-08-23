import { combineReducers } from "@reduxjs/toolkit";
import data from "./dataSlice";
// import state from "./stateSlice";
const newQuotationReducer = combineReducers({
  data,
});

export default newQuotationReducer;
