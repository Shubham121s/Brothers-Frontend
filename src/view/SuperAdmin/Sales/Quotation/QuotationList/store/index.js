import { combineReducers } from "@reduxjs/toolkit";
import data from "./dataSlice";
import state from "./stateSlice";
const quotationReducer = combineReducers({
  data,
  state,
});

export default quotationReducer;
