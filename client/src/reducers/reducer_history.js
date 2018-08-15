import { ADD_HISTORY } from "../actions";

export default (state = [], action) => {
  switch (action.type) {
    case ADD_HISTORY:
      console.log("reducer", action.payload);
      return [action.payload, ...state];
    default:
      return state;
  }
};
