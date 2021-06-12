/* eslint-disable import/no-anonymous-default-export */
import axios from "axios";
import { ILoginRequest } from "../interfaces/ILoginRequest";
import { ISignUpRequest } from "../interfaces/ISignUpRequest";
import { AUTH_API_BASE_URL } from '../constants/http-constant'

/**
 * Register API
 * @param signUpRequest contains sign up information
 * @returns axios post API
 */
const register = (signUpRequest: ISignUpRequest) => {
  return axios.post(AUTH_API_BASE_URL + "/signup", signUpRequest);
};

/**
 * Login API
 * @param loginRequest contains login information
 * @returns axios post API
 */
const login = (loginRequest: ILoginRequest) => {
  return axios
    .post(AUTH_API_BASE_URL + "/signin", loginRequest)
    .then((response) => {
      if (response.data.accessToken) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }

      return response.data;
    });
};

/**
 * Logout to delete user in localStorage
 */
const logout = () => {
  localStorage.removeItem("user");
};

export default {
  register,
  login,
  logout,
};