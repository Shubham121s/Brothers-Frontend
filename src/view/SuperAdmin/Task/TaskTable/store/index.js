import { combineReducers } from "@reduxjs/toolkit";
import data from "./dataSlice";
import state from "./stateSlice";
const taskReducer = combineReducers({
  data,
  state,
});

export default taskReducer;
