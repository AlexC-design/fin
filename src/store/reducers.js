import { combineReducers } from "redux";
import hovered from "./state/hovered/reducer";
import currentMoment from "./state/currentMoment/reducer";

const reducers = () =>
  combineReducers({
    hovered,
    currentMoment
  });

export default reducers;
