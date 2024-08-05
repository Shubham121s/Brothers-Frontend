import { combineReducers } from "@reduxjs/toolkit";
import data from "./dataSlice";
const editProductReducer = combineReducers({
  data,
});

export default editProductReducer;
