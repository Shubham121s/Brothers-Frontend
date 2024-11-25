import { combineReducers } from "@reduxjs/toolkit";
import data from "./dataSlice";
import state from "./stateSlice";
const taskFormReducer = combineReducers({
  data,
  state,
});

export default taskFormReducer;
