import { combineReducers } from "redux";

import reducer_history from "./reducer_history";
import reducer_rent from "./reducer_rent";

export default combineReducers({
  history: reducer_history,
  rent: reducer_rent
});
