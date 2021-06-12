import {
    CREATE_EMPLOYEE,
    DELETE_EMPLOYEE,
    IS_FAIL,
    IS_SUCCESS,
    LIST_EMPLOYEES,
    UPDATE_EMPLOYEE
} from "../constants/types";

import { IEmployee } from "../interfaces/IEmployee";
import { IEmployeeAndPassword } from "../interfaces/IEmployeeAndPassword";
import EmployeeService from "../services/EmployeeService";
import { AxiosError } from "axios";
import { UNDEFINED } from "../constants/common-message";

/**
 * Get list employees action
 * @returns getEmployees API or Promise.reject() if error
 */
export const listEmployees = () => (dispatch: any) => {
    return EmployeeService.getEmployees().then(
        (response) => {
            var employees: IEmployee[] = response.data

            for (let i = 0; i < employees.length; i++) {
                if (!employees[i].address) {
                    employees[i].address = UNDEFINED;
                }
                if (!employees[i].gender) {
                    employees[i].gender = UNDEFINED;
                }
                if (!employees[i].fullName) {
                    employees[i].fullName = UNDEFINED;
                }
                if (!employees[i].email) {
                    employees[i].email = UNDEFINED;
                }
            }

            dispatch({
                type: LIST_EMPLOYEES,
                payload: employees
            });

            Promise.resolve();
        }
    );
};


/**
 * Process search employees action
 * @param keyword to search employees
 * @returns searchEmployees API or Promise.reject() if error
 */
export const searchEmployees = (keyword: any) => (dispatch: any) => {

    var regex = /^[\W\s]*$/;
    if (!regex.test(keyword)) {
        return (EmployeeService.searchEmployees(keyword).then((res) => {

            var employees: IEmployee[] = res.data

            for (let i = 0; i < employees.length; i++) {
                if (!employees[i].address) {
                    employees[i].address = UNDEFINED;
                }
                if (!employees[i].gender) {
                    employees[i].gender = UNDEFINED;
                }
                if (!employees[i].fullName) {
                    employees[i].fullName = UNDEFINED;
                }
                if (!employees[i].email) {
                    employees[i].email = UNDEFINED;
                }
            }

            dispatch({
                type: LIST_EMPLOYEES,
                payload: employees
            });

            Promise.resolve();
        })
        );
    } else {
        return (EmployeeService.getEmployees().then((res) => {

            var employees: IEmployee[] = res.data

            for (let i = 0; i < employees.length; i++) {
                if (!employees[i].address) {
                    employees[i].address = UNDEFINED;
                }
                if (!employees[i].gender) {
                    employees[i].gender = UNDEFINED;
                }
                if (!employees[i].fullName) {
                    employees[i].fullName = UNDEFINED;
                }
                if (!employees[i].email) {
                    employees[i].email = UNDEFINED;
                }
            }
            dispatch({
                type: LIST_EMPLOYEES,
                payload: employees
            });

            Promise.resolve();
        })
        );
    }
};

/**
 * Process delete employee action
 * @param id to delete employee
 * @returns deleteEmployee API or Project.reject() 
 */
export const deleteEmployeeById = (id: number) => (dispatch: any) => {
    return EmployeeService.deleteEmployee(id).then(
        (response) => {
            dispatch({
                type: DELETE_EMPLOYEE,
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
 * Process update employee action
 * @param employee contains update information
 * @param id to update employee
 * @returns updateEmployee API or Promise.reject() if error
 */
export const updateEmployeeById = (employee: IEmployee, id: number) => (dispatch: any) => {
    return EmployeeService.updateEmployee(employee, id).then(
        (response) => {
            dispatch({
                type: UPDATE_EMPLOYEE,
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
    });;
};

/**
 * Process create employee action
 * @param employee contains create information
 * @returns createEmployee API or Promise.reject() if error
 */
export const createEmployee = (employee: IEmployeeAndPassword) => (dispatch: any) => {
    return EmployeeService.createEmployee(employee).then(
        (response) => {
            dispatch({
                type: CREATE_EMPLOYEE,
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



