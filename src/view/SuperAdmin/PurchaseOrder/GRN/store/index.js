import { combineReducers } from "@reduxjs/toolkit";
import data from "./dataSlice";
import state from "./stateSlice";
const inwardReducer = combineReducers({
  data,
  state,
});

export default inwardReducer;
