import { combineReducers } from "@reduxjs/toolkit";
import data from "./dataSlice";
const EditCustomerReducer = combineReducers({
  data,
});

export default EditCustomerReducer;
