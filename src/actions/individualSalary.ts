import {
    DELETE_SALARY_INDIVIDUAL,
    IS_FAIL,
    IS_SUCCESS,
    LIST_SALARIES_BY_EMAIL,
    UPDATE_SALARY_INDIVIDUAL
} from "../constants/types";

import { AxiosError } from "axios";
import SalaryService from "../services/SalaryService";

/**
 * Get list salaries by email action
 * @param email to get list salaries
 * @returns getSalariesByEmail API
 */
export const listSalariesByEmail = (email: string) => (dispatch: any) => {
    return SalaryService.getSalariesByEmail(email).then(
        (response) => {
            var salaries: any = response.data

            dispatch({
                type: LIST_SALARIES_BY_EMAIL,
                payload: salaries
            });

            Promise.resolve();
        }
    );
};

/**
 * Process delete salary action
 * @param email to delete salary
 * @param createdDate to delete salary
 * @returns deleteSalary API
 */
export const deleteSalaryIndividual = (email: string, createdDate: string) => (dispatch: any) => {
    return SalaryService.deleteSalary(email, createdDate).then(
        (response) => {
            dispatch({
                type: DELETE_SALARY_INDIVIDUAL,
                payload: { email, createdDate }
            });

            dispatch({
                type: IS_SUCCESS,
                payload: response.data.message
                    ? response.data.message
                    : response.data,
            });

            return Promise.resolve();
        }
    ).catch((error: AxiosError) => {
        const message = error.response?.data.message
            ? error.response?.data.message
            : error.response?.data;

        dispatch({
            type: IS_FAIL,
            payload: message,
        });

        return Promise.reject();
    });
};

/**
 * Process update salary action
 * @param salary contains update information
 * @param email to update salary
 * @param createdDate to update salary
 * @returns 
 */
export const updateSalaryIndividual = (salary: any, email: string, createdDate: string) => (dispatch: any) => {
    return SalaryService.updateSalary(salary, email, createdDate).then(
        (response) => {
            dispatch({
                type: UPDATE_SALARY_INDIVIDUAL,
                payload: { email, createdDate }
            });

            dispatch({
                type: IS_SUCCESS,
                payload: response.data.message
                    ? response.data.message
                    : response.data,
            });

            return Promise.resolve();
        }
    ).catch((error: AxiosError) => {
        const message = error.response?.data.message
            ? error.response?.data.message
            : error.response?.data;

        dispatch({
            type: IS_FAIL,
            payload: message,
        });

        return Promise.reject();
    });;
};

