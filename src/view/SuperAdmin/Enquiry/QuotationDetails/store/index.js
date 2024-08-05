import { combineReducers } from "@reduxjs/toolkit";
import data from "./dataSlice";
import state from "./stateSlice";
const quotationDetailReducer = combineReducers({
  data,
  state,
});

export default quotationDetailReducer;
