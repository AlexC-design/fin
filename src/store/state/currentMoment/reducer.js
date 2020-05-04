import { SET_MOMENT } from "./index";

const initialState = {
  moment: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_MOMENT:
      return {
        ...state,
        moment: action.payload
      };

    default:
      return state;
  }
};
