import { Dispatch } from "redux";
import { Action } from "../actions/index";
import { ActionType } from "../action-types";

export const signedIn = (state: boolean) => {
  return (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ActionType.SIGNED_IN,
      payload: state,
    });
  };
};

export const pageTotal = (number: number) => {
  return (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ActionType.PAGE_TOTAL,
      payload: number,
    });
  };
};

export const pageCurrent = (number: number) => {
  return (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ActionType.PAGE_CURRENT,
      payload: number,
    });
  };
};
