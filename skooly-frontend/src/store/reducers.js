import { combineReducers } from "redux";

import alertReducer from "./alert";
import globalReducer from "./global";
import studentsReducer from "./students";

export default combineReducers({
  alert: alertReducer,
  global: globalReducer,
  students: studentsReducer,
});
