import { Action } from "../actions/index";
import { ActionType } from "../action-types";

const pageReducer = (state: number = 1, action: Action) => {
  switch (action.type) {
    case ActionType.PAGE_CURRENT:
      return action.payload;
    default:
      return state;
  }
};

export default pageReducer;
