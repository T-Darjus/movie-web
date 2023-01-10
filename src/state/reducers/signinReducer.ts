import { Action } from "../actions/index";
import { ActionType } from "../action-types";

const reducer = (state: boolean = false, action: Action) => {
  switch (action.type) {
    case ActionType.SIGNED_IN:
      return action.payload;
    default:
      return state;
  }
};

export default reducer;
