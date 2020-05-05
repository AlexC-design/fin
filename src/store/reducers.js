import { combineReducers } from "redux";
import hovered from "./state/hovered/reducer";
import currentMoment from "./state/currentMoment/reducer";
import mockData from "./state/mockData/reducer";

const reducers = () =>
  combineReducers({
    hovered,
    currentMoment,
    mockData
  });

export default reducers;
