import { IS_FAIL, CLEAR_STATE } from "../constants/types";

const initialState: any = null;

/**
 * Reducer to execute action type and load new state when receive error message
 * @param state
 * @param action 
 * @returns 
 */
function isErrorReducer(isError = initialState, action: any) {
  const { type, payload } = action;

  switch (type) {
    case IS_FAIL:
      return payload;
    case CLEAR_STATE:
      return payload;
    default:
      return isError;
  }
}

export default isErrorReducer;