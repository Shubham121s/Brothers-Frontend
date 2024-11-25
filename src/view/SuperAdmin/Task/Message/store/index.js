import { combineReducers } from "@reduxjs/toolkit";
import data from "./dataSlice";
import state from "./stateSlice";
const chatReducer = combineReducers({
  data,
  state,
});

export default chatReducer;
