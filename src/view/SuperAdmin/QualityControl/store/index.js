import { combineReducers } from "@reduxjs/toolkit";
import data from "./dataSlice";
const qualityReducer = combineReducers({
  data,
});

export default qualityReducer;
