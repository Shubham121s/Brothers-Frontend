import { combineReducers } from "@reduxjs/toolkit";
import data from "./dataSlice";
import state from "./stateSlice";
const consumableItemReducer = combineReducers({
  data,
  state,
});

export default consumableItemReducer;
