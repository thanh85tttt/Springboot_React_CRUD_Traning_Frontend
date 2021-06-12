import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  IS_FAIL,
  IS_SUCCESS,
  CLEAR_STATE,
} from "../constants/types";

import AuthService from "../services/AuthService";
import { ISignUpRequest } from "../interfaces/ISignUpRequest";
import { ILoginRequest } from "../interfaces/ILoginRequest";


/**
 * Sign up new user action
 * 
 * @param signUpRequest contains sign up information
 * @returns register API and Promise.reject() if error
 */
export const register = (signUpRequest: ISignUpRequest) => (dispatch: any) => {
  return AuthService.register(signUpRequest).then(
    (response) => {
      dispatch({
        type: REGISTER_SUCCESS,
      });

      dispatch({
        type: IS_SUCCESS,
        payload: response.data.message,
      });

      return Promise.resolve();
    },
    (error) => {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      dispatch({
        type: REGISTER_FAIL,
      });

      dispatch({
        type: IS_FAIL,
        payload: message,
      });

      return Promise.reject();
    }
  );
};

/**
 * Process login action
 * 
 * @param loginRequest contains login information
 * @returns login API and Promise.reject() if error
 */
export const login = (loginRequest: ILoginRequest) => (dispatch: any) => {
  return AuthService.login(loginRequest).then(
    (data) => {

      dispatch({
        type: LOGIN_SUCCESS,
        payload: { user: data },
      });

      dispatch({
        type: IS_SUCCESS,
        payload: "Login Successfully!",
      });

      return Promise.resolve();
    },
    (error) => {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      dispatch({
        type: LOGIN_FAIL,
      });

      dispatch({
        type: IS_FAIL,
        payload: message,
      });

      return Promise.reject();
    }
  );
};

/**
 * Process logout action
 */
export const logout = () => (dispatch: any) => {
  AuthService.logout();

  dispatch({
    type: LOGOUT,
  });

};

/**
 * Clear state success or error action
 */
export const clearState = () => async (dispatch: any) => {
  dispatch({
    type: CLEAR_STATE,
    payload: null,
  });
};