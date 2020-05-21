import { SET_POPUP_TYPE, SET_SUCCESS_MESSAGE, SET_RECIPIENT } from "./index";

const initialState = {
  type: null,
  message: ""
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_POPUP_TYPE:
      return {
        ...state,
        type: action.payload
      };

    case SET_SUCCESS_MESSAGE:
      return {
        ...state,
        message: action.payload
      };

    case SET_RECIPIENT:
      return {
        ...state,
        recipient: action.payload
      };

    default:
      return state;
  }
};
