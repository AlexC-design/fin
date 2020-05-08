export const SET_CATEGORIES = "SET_CATEGORIES";
export const SET_VENDORS = "SET_VENDORS";

export const setCategories = (categories, total) => ({
  type: SET_CATEGORIES,
  payload: { categories, total }
});

export const setVendors = vendors => ({
  type: SET_VENDORS,
  payload: vendors
});
