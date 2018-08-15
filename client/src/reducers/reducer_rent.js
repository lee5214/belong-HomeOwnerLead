import { FETCH_RENT_ZESTIMATE } from "../actions";

export default (state = [], action) => {
  switch (action.type) {
    case FETCH_RENT_ZESTIMATE:
      console.log("reducer", action.payload);
      return action.payload;
    default:
      return state;
  }
};
