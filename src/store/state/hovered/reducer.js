import { SET_HOVERED } from "./index";

const initialState = {
  index: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_HOVERED:
      return {
        ...state,
        index: action.payload
      };

    default:
      return state;
  }
};
