import { combineReducers } from "@reduxjs/toolkit";
import data from "./dataSlice";

const attendanceDetailReducer = combineReducers({
  data,
});

export default attendanceDetailReducer;
