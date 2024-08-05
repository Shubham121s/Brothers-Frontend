import { combineReducers } from "@reduxjs/toolkit";
import data from "./dataSlice";
import state from "./stateSlice";
const rawMaterialReducer = combineReducers({
  data,
  state,
});

export default rawMaterialReducer;
