import { combineReducers } from "@reduxjs/toolkit";
import data from "./dataSlice";
const poListReducer = combineReducers({
  data,
});

export default poListReducer;
