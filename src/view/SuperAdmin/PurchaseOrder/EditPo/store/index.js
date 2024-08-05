import { combineReducers } from "@reduxjs/toolkit";
import data from "./dataSlice";
import state from "./stateSlice";
const editPorderReducer = combineReducers({
  data,
  state,
});

export default editPorderReducer;
