import {
    CREATE_DEPARTMENT,
    DELETE_DEPARTMENT,
    IS_FAIL,
    IS_SUCCESS,
    LIST_DEPARTMENTS,
    UPDATE_DEPARTMENT
} from "../constants/types";

import { AxiosError } from "axios";
import DepartmentService from "../services/DepartmentService";
import { IDepartment } from "../interfaces/IDepartment";
import { UNDEFINED } from "../constants/common-message";

/**
 * Get list departments action
 * @returns getDepartments API
 */
export const listDepartments = () => (dispatch: any) => {
    return DepartmentService.getDepartments().then(
        (response) => {
            var departments: IDepartment[] = response.data

            dispatch({
                type: LIST_DEPARTMENTS,
                payload: departments
            });

            Promise.resolve();
        }
    );
};

/**
 * Process delete department by id action
 * @param id to delete employee 
 * @returns deleteDepartment API
 */
export const deleteDepartment = (id: number) => (dispatch: any) => {
    return DepartmentService.deleteDepartment(id).then(
        (response) => {
            dispatch({
                type: DELETE_DEPARTMENT,
                payload: { id }
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
 * Process create new department action
 * @param department contain create information
 * @returns createDepartments API
 */
export const createDepartment = (department: any) => (dispatch: any) => {
    return DepartmentService.createDepartments(department).then(
        (response) => {
            dispatch({
                type: CREATE_DEPARTMENT,
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
 * Process update department action
 * @param department contains update information
 * @param id to update department
 * @returns updateDepartment API
 */
export const updateDepartment = (department: any, id: number) => (dispatch: any) => {
    return DepartmentService.updateDepartment(department, id).then(
        (response) => {
            dispatch({
                type: UPDATE_DEPARTMENT,
                payload: { id }
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
 * Process search departments action
 * @param keyword to search departments
 * @returns searchDepartments API
 */
export const searchDepartments = (keyword: any) => (dispatch: any) => {

    var regex = /^[\W\s]*$/;
    if (!regex.test(keyword)) {
        return (DepartmentService.searchDepartments(keyword).then((res) => {

            var departments: IDepartment[] = res.data

            for (let i = 0; i < departments.length; i++) {
                if (!departments[i].department) {
                    departments[i].department = UNDEFINED;
                }
                if (!departments[i].fullName) {
                    departments[i].fullName = UNDEFINED;
                }
            }

            dispatch({
                type: LIST_DEPARTMENTS,
                payload: departments
            });

            Promise.resolve();
        })
        );
    } else {
        return (DepartmentService.getDepartments().then((res) => {

            var departments: IDepartment[] = res.data

            for (let i = 0; i < departments.length; i++) {
                if (!departments[i].department) {
                    departments[i].department = UNDEFINED;
                }
                if (!departments[i].fullName) {
                    departments[i].fullName = UNDEFINED;
                }
            }
            dispatch({
                type: LIST_DEPARTMENTS,
                payload: departments
            });

            Promise.resolve();
        })
        );
    }
};

