export const SET_POPUP_TYPE = "SET_POPUP_TYPE";
export const SET_SUCCESS_MESSAGE = "SET_SUCCESS_MESSAGE";

export const setPopupType = type => ({
  type: SET_POPUP_TYPE,
  payload: type
});

export const setSuccessMessage = message => ({
  type: SET_SUCCESS_MESSAGE,
  payload: message
});
