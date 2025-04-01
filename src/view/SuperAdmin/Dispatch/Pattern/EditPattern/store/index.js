import { combineReducers } from "@reduxjs/toolkit";
import data from "./dataSlice";
import state from "./stateSlice";
const EditDispatchPatternReducer = combineReducers({
  data,
  state,
});

export default EditDispatchPatternReducer;
