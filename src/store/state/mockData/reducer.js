import { SET_CATEGORIES, SET_DAYS } from "./index";

const initialState = {
  categories: [],
  total: null,
  days: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_CATEGORIES:
      return {
        ...state,
        categories: action.payload.categories,
        total: action.payload.total
      };

    case SET_DAYS:
      return {
        ...state,
        days: action.payload
      };

    default:
      return state;
  }
};
