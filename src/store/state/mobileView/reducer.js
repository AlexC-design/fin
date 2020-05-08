import { SET_MOBILE_VIEW } from "./index";

const initialState = false;

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_MOBILE_VIEW:
      return action.payload;

    default:
      return state;
  }
};
