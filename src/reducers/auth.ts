/* eslint-disable import/no-anonymous-default-export */
import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    CLEAR_STATE,
} from "../constants/types";

const user = JSON.parse(localStorage.getItem("user") || 'null');

const initialState = user
    ? { isLoggedIn: true, user }
    : { isLoggedIn: false, user: null };

/**
 * Reducer to execute action type and load new state of authentication
 * @param state
 * @param action 
 * @returns 
 */
export default function (state = initialState, action: any) {
    const { type, payload } = action;

    switch (type) {
        case REGISTER_SUCCESS:
            return {
                ...state,
                isLoggedIn: false,
            };
        case REGISTER_FAIL:
            return {
                ...state,
                isLoggedIn: false,
            };
        case LOGIN_SUCCESS:
            return {
                ...state,
                isLoggedIn: true,
                user: payload.user,
            };
        case LOGIN_FAIL:
            return {
                ...state,
                isLoggedIn: false,
                user: null,
            };
        case LOGOUT:
            return {
                ...state,
                isLoggedIn: false,
                user: null,
            };
        default:
            return state;
    }
}

/**
 * Reducer to execute clear message error or success
 */
export const clearState = () => async (dispatch: any) => {
    dispatch({
      type: CLEAR_STATE,
      payload: null,
    });
  };