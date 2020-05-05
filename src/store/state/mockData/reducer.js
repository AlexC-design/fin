import { SET_CATEGORIES } from "./index";

const initialState = {
  categories: [],
  total: null
};

export default (state = initialState, action) => {
  console.log(action);
  switch (action.type) {
    case SET_CATEGORIES:
      return {
        ...state,
        categories: action.payload.categories,
        total: action.payload.total
      };

    default:
      return state;
  }
};
