import {
    IS_SUCCESS,
    CLEAR_STATE,
} from "../constants/types";

const initialState: any = null;

/**
 * Reducer to execute action type and load new state when receive success message
 * @param state
 * @param action 
 * @returns 
 */
function tutorialReducer(success = initialState, action: any) {
    const { type, payload } = action;

    switch (type) {
        case IS_SUCCESS:
            return payload;
        case CLEAR_STATE:
            return null;
        default:
            return success;
    }
}

export default tutorialReducer;

