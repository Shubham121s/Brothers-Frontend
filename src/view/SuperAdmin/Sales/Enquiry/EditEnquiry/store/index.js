import { combineReducers } from "@reduxjs/toolkit";
import data from "./dataSlice";

const editEnquiryReducer = combineReducers({
  data,
});

export default editEnquiryReducer;
