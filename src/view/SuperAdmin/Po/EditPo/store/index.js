import { combineReducers } from "@reduxjs/toolkit";
import data from "./dataSlice";
import state from "./stateSlice";
const editPoReducer = combineReducers({
  data,
  state,
});

export default editPoReducer;
