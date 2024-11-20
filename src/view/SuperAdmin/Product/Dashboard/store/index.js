import { combineReducers } from "@reduxjs/toolkit";
import data from "./dataSlice";

const ProductDashboardReducer = combineReducers({
  data,
});

export default ProductDashboardReducer;
