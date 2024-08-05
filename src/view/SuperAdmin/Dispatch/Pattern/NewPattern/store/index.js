import { combineReducers } from "@reduxjs/toolkit";
import data from "./dataSlice";
import state from "./stateSlice";
const NewDispatchPatternReducer = combineReducers({
  data,
  state,
});

export default NewDispatchPatternReducer;
