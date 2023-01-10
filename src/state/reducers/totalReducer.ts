import { Action } from "../actions/index";
import { ActionType } from "../action-types";

const totalReducer = (state: number = 1, action: Action) => {
  switch (action.type) {
    case ActionType.PAGE_TOTAL:
      return action.payload;
    default:
      return state;
  }
};

export default totalReducer;
