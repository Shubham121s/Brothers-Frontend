import { combineReducers } from "@reduxjs/toolkit";
import data from "./dataSlice";
// import state from './stateSlice'
const EnquiryReducer = combineReducers({
  data,
});

export default EnquiryReducer;
