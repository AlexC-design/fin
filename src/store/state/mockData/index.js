export const SET_CATEGORIES = "SET_CATEGORIES";

export const setCategories = (categories, total) => ({
  type: SET_CATEGORIES,
  payload: { categories, total }
});
