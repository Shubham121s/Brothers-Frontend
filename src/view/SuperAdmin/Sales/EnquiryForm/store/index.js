import { combineReducers } from "@reduxjs/toolkit";
import state from "./StateSlice";
const EnquiryFormReducer = combineReducers({
  state,
});

export default EnquiryFormReducer;
