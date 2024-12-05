import { combineReducers } from "redux";
import auth from "./auth";
import theme from "./theme/themeSlice";
import base from "./base";
import locale from "./locale/localeSlice";
import socket from "./socket/socketSlice";

const rootReducer = (asyncReducers) => (state, action) => {
  const combinedReducer = combineReducers({
    auth,
    theme,
    base,
    locale,
    socket,
    ...asyncReducers,
  });
  return combinedReducer(state, action);
};

export default rootReducer;
