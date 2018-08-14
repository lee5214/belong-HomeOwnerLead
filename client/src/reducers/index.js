import { combineReducers } from "redux";
import reducer_History from "./reducer_History";

export default combineReducers({
  history: reducer_History
});
