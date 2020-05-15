import { SET_THEME } from "./index";

const initialState = "light";

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_THEME:
      return action.payload;

    default:
      return state;
  }
};
