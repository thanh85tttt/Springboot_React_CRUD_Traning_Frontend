import {
    IS_FAIL,
    IS_SUCCESS,
    LIST_SALARIES,
    DELETE_SALARY,
    UPDATE_SALARY,
    CREATE_SALARY
} from "../constants/types";

import { AxiosError } from "axios";
import SalaryService from "../services/SalaryService";

/**
 * Get list salaries action
 * @returns getSalaries API
 */
export const listSalaries = () => (dispatch: any) => {
    return SalaryService.getSalaries().then(
        (response) => {
            var salaries: any = response.data

            dispatch({
                type: LIST_SALARIES,
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
export const deleteSalary = (email: string, createdDate: string) => (dispatch: any) => {
    return SalaryService.deleteSalary(email, createdDate).then(
        (response) => {
            dispatch({
                type: DELETE_SALARY,
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
 * Process create salary action
 * @param email to create salary
 * @param salary contains create information
 * @returns createSalaries API
 */
export const createSalary = (email:string, salary: any) => (dispatch: any) => {
    return SalaryService.createSalaries(email, salary).then(
        (response) => {
            dispatch({
                type: CREATE_SALARY,
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

/**
 * Process update salary action
 * @param salary contains update information
 * @param email to update salary
 * @param createdDate to update salary
 * @returns updateSalary API
 */
export const updateSalary = (salary: any, email: string, createdDate: string) => (dispatch: any) => {
    return SalaryService.updateSalary(salary, email, createdDate).then(
        (response) => {
            dispatch({
                type: UPDATE_SALARY,
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

