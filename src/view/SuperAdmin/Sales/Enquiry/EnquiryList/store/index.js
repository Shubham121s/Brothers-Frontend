import { combineReducers } from "@reduxjs/toolkit";
import data from "./dataSlice";
import state from "./stateSlice";
const enquiryReducer = combineReducers({
  data,
  state,
});

export default enquiryReducer;
