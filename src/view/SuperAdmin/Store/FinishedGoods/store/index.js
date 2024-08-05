import { combineReducers } from "@reduxjs/toolkit";
import data from "./dataSlice";
import state from "./stateSlice";
const finishGoodsReducer = combineReducers({
  data,
  state,
});

export default finishGoodsReducer;
