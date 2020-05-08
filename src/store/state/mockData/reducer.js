import { SET_CATEGORIES, SET_VENDORS } from "./index";

const initialState = {
  categories: [],
  total: null,
  vendors: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_CATEGORIES:
      return {
        ...state,
        categories: action.payload.categories,
        total: action.payload.total
      };

    case SET_VENDORS:
      return {
        ...state,
        vendors: action.payload
      };

    default:
      return state;
  }
};
