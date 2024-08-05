import { combineReducers } from "@reduxjs/toolkit";
import data from "./dataslice";
import state from "./stateSlice";
const poConditionReducer = combineReducers({
  data,
  state,
});

export default poConditionReducer;
