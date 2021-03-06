export const SET_CATEGORIES = "SET_CATEGORIES";
export const SET_DAYS = "SET_DAYS";

export const setCategories = (categories, total) => ({
  type: SET_CATEGORIES,
  payload: { categories, total }
});


export const setDays = days => ({
  type: SET_DAYS,
  payload: days
});
