import { combineReducers } from "@reduxjs/toolkit";
import data from "./dataSlice";
const quotationReducer = combineReducers({
  data,
});

export default quotationReducer;
