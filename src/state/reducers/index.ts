import { combineReducers } from "redux";
import signinReducer from "./signinReducer";
import pageReducer from "./pageReducer";
import totalReducer from "./totalReducer";

const reducers = combineReducers({
  signedIn: signinReducer,
  totalPages: totalReducer,
  currentPage: pageReducer,
});

export default reducers;

export type State = ReturnType<typeof reducers>;
