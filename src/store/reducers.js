import { combineReducers } from "redux";
import hovered from "./state/hovered/reducer";

const reducers = () =>
  combineReducers({
    hovered
  });

export default reducers;
