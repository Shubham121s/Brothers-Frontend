import { combineReducers } from "@reduxjs/toolkit";
import data from "./dataSlice";
import state from "./stateSlice";
const poSettingReducer = combineReducers({
  data,
  state,
});

export default poSettingReducer;
