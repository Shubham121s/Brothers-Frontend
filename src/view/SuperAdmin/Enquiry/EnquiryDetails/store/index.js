import { combineReducers } from "@reduxjs/toolkit";
import data from "./dataSlice";
import state from "./stateSlice";
const enquiryDetailReducer = combineReducers({
  data,
  state,
});

export default enquiryDetailReducer;
