import { combineReducers } from "@reduxjs/toolkit";
import data from "./dataSlice";
import state from "./stateSlice";
const newEnquiryReducer = combineReducers({
  state,
  data,
});

export default newEnquiryReducer;
