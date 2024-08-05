import { combineReducers } from "@reduxjs/toolkit";
import data from "./dataSlice";
import state from "./stateSlice";
const itemsReducer = combineReducers({
  data,
  state,
});

export default itemsReducer;
