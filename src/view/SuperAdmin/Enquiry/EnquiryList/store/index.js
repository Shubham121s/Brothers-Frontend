import { combineReducers } from "@reduxjs/toolkit";
import data from "./dataSlice";
const enquiryReducer = combineReducers({
  data,
});

export default enquiryReducer;
