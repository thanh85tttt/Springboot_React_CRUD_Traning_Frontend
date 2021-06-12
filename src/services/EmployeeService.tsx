import axios from 'axios';

import { EMPLOYEE_API_BASE_URL, USER_API_BASE_URL } from '../constants/http-constant'
import { IEmployee } from '../interfaces/IEmployee';
import { IEmployeeRoleAndDepartment } from '../interfaces/IEmployeeRoleAndDepartment';
import authHeader from './auth-header';

/**
 * EmployeeService
 * <p>
 * Version 1.0
 * <p>
 * Date: 30-05-2021
 * <p>
 * Copyright By Thanh
 * <p>
 * Modification Logs:
 * DATE             AUTHOR              DESCRIPTION
 * -------------------------------------------------
 * 07-06-2021       ThanhBT11           Create
 */
class EmployeeService {

    /**
     * Get employees service
     * @returns axios get API
     */
    getEmployees() {
        return axios.get(EMPLOYEE_API_BASE_URL, { headers: authHeader() });
    }

    /**
     * Create employee service
     * @param employee contains create information
     * @returns axios post API
     */
    createEmployee(employee: IEmployee) {
        return axios.post(EMPLOYEE_API_BASE_URL, employee, { headers: authHeader() });
    }

    /**
     * Get employee by id service
     * @param employeeId to get employee
     * @returns axios get API
     */
    getEmployeeById(employeeId: number) {
        return axios.get(EMPLOYEE_API_BASE_URL + '/' + employeeId);
    }

    /**
     * Get employee by email service
     * @param email to get employee
     * @returns axios get API
     */
    getEmployeeByEmail(email: string) {
        return axios.get(EMPLOYEE_API_BASE_URL + '/email/' + email);
    }

    /**
     * Update employee service
     * @param employee to update employee
     * @param employeeId to update employee
     * @returns axios put API
     */
    updateEmployee(employee: IEmployee, employeeId: number) {
        return axios.put(EMPLOYEE_API_BASE_URL + '/' + employeeId, employee,
            { headers: authHeader() }
        );
    }

    /**
     * Delete employee by id
     * @param employeeId to delete employee
     * @returns axios delete API
     */
    deleteEmployee(employeeId: number) {
        return axios.delete(EMPLOYEE_API_BASE_URL + '/' + employeeId,
            { headers: authHeader() }
        );
    }

    /**
     * Get employee role and department service
     * @returns axios get API
     */
    getEmployeesRoleAndDepartment() {
        return axios.get(EMPLOYEE_API_BASE_URL + '/employees-role-department', { headers: authHeader() });
    }

    /**
     * Update Role and Department service
     * @param employee contains update information
     * @param email to update role and department
     * @returns axios put API
     */
    updateEmployeesRoleAndDepartment(employee: IEmployeeRoleAndDepartment, email: string) {
        return axios.put(EMPLOYEE_API_BASE_URL + '/employees-role-department/' + email, employee, { headers: authHeader() });
    }

    /**
     * get role and department of an employee by email service
     * @param email to get role and department of an employee
     * @returns axios get API
     */
    getEmployeeRoleAndDepartmentById(email: string) {
        return axios.get(EMPLOYEE_API_BASE_URL + '/employees-role-department/' + email, { headers: authHeader() });
    }

    /**
     * Get distinct addresses service
     * @returns axios get API
     */
    getDistinctAddresses() {
        return axios.get(EMPLOYEE_API_BASE_URL + '/find-distinct-address', { headers: authHeader() });
    }

    /**
     * Search employees service
     * @param keyword to search employees
     * @returns axios get API
     */
    searchEmployees(keyword: string) {
        return axios.get(EMPLOYEE_API_BASE_URL + '/search-employees/' + keyword, { headers: authHeader() });
    }
    
    /**
     * Search role and department of employees service
     * @param keyword to search role and department
     * @returns axios get API
     */
    searchEmployeeRoleAndDepartment(keyword: string) {
        return axios.get(EMPLOYEE_API_BASE_URL + '/search-role-department/' + keyword, { headers: authHeader() });
    }

    /**
     * Get employee by username service
     * @param username to get employee
     * @returns axios get API
     */
    getEmployeeByUsername(username: string) {
        return axios.get(USER_API_BASE_URL + '/' + username, { headers: authHeader() });
    }

    /**
     * Get image of an employee
     * @param image to get image
     * @returns axios get API
     */
    getEmployeeImage(image: string) {
        return axios.get(EMPLOYEE_API_BASE_URL + '/image/' + image, { headers: authHeader() });
    }
}

export default new EmployeeService();