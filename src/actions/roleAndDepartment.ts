import {
    IS_FAIL,
    IS_SUCCESS,
    LIST_ROLE_DEPARTMENT,
    UPDATE_ROLE_DEPARTMENT
} from "../constants/types";

import EmployeeService from "../services/EmployeeService";
import { AxiosError } from "axios";
import { IEmployeeRoleAndDepartment } from "../interfaces/IEmployeeRoleAndDepartment";
import { UNDEFINED } from "../constants/common-message";

/**
 * Get list roles and departments action
 * @returns getEmployeesRoleAndDepartment API
 */
export const listRoleAndDepartment = () => (dispatch: any) => {
    return EmployeeService.getEmployeesRoleAndDepartment().then(
        (response) => {
            var roleAndDepartments: IEmployeeRoleAndDepartment = response.data;
            dispatch({
                type: LIST_ROLE_DEPARTMENT,
                payload: roleAndDepartments
            });
            
            Promise.resolve();
        }
    );
};

/**
 * Process update role and department action
 * @param employee contains update information
 * @param email to update role and department
 * @returns updateEmployeesRoleAndDepartment API
 */
export const updateRoleAndDepartment = (employee: IEmployeeRoleAndDepartment, email: string) => (dispatch: any) => {
    return EmployeeService.updateEmployeesRoleAndDepartment(employee, email).then(
        (response) => {
            dispatch({
                type: UPDATE_ROLE_DEPARTMENT,
                payload: { email }
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
 * Process search role and department action
 * @param keyword to search roles and departments
 * @returns searchEmployeeRoleAndDepartment API
 */
export const searchEmployeeRoleAndDepartment = (keyword: any) => (dispatch: any) => {

    var regex = /^[\W\s]*$/;
    if (!regex.test(keyword)) {
        return (EmployeeService.searchEmployeeRoleAndDepartment(keyword).then((res) => {

            var employees: IEmployeeRoleAndDepartment[] = res.data

            for (let i = 0; i < employees.length; i++) {
                if (!employees[i].role) {
                    employees[i].role = UNDEFINED;
                }
                if (!employees[i].department) {
                    employees[i].department = UNDEFINED;
                }
            }

            dispatch({
                type: LIST_ROLE_DEPARTMENT,
                payload: employees
            });

            Promise.resolve();
        })
        );
    } else {
        return (EmployeeService.getEmployeesRoleAndDepartment().then((res) => {

            var employees: IEmployeeRoleAndDepartment[] = res.data

            for (let i = 0; i < employees.length; i++) {
                if (!employees[i].role) {
                    employees[i].role = UNDEFINED;
                }
                if (!employees[i].department) {
                    employees[i].department = UNDEFINED;
                }
            }
            dispatch({
                type: LIST_ROLE_DEPARTMENT,
                payload: employees
            });

            Promise.resolve();
        })
        );
    }
};