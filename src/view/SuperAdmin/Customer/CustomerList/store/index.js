import { combineReducers } from "@reduxjs/toolkit";
import data from "./dataSlice";
import state from "./stateSlice";
const customerReducer = combineReducers({
  data,
  state,
});

export default customerReducer;
