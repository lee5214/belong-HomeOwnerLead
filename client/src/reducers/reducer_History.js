import { ADD_HISTORY } from "../actions";

export default (state = [], action) => {
  switch (action.type) {
    case ADD_HISTORY:
      return [action.payload, ...state];
    default:
      return state;
  }
};
