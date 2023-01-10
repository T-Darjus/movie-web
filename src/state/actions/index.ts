import { ActionType } from "../action-types";

interface SigninAction {
  type: ActionType.SIGNED_IN;
  payload: boolean;
}
interface PageTotalAction {
  type: ActionType.PAGE_TOTAL;
  payload: number;
}
interface PageCurrentAction {
  type: ActionType.PAGE_CURRENT;
  payload: number;
}

export type Action = SigninAction | PageTotalAction | PageCurrentAction;
