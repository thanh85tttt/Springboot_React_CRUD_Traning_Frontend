import axios from 'axios';

import { DEPARTMENT_API_BASE_URL } from '../constants/http-constant'
import { IDepartment } from '../interfaces/IDepartment';
import authHeader from './auth-header';

/**
 * DepartmentsService
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
class DepartmentsService {

    /**
     * Get department service
     * @returns axios get api
     */
    getDepartments() {
        return axios.get(DEPARTMENT_API_BASE_URL, { headers: authHeader() });
    }

    /**
     * Create department service
     * @param department contains create information
     * @returns axios post API
     */
    createDepartments(department: IDepartment) {
        return axios.post(DEPARTMENT_API_BASE_URL, department, { headers: authHeader() });
    }

    /**
     * Get department by department id service
     * @param departmentId to get department
     * @returns axios get API
     */
    getDepartmentById(departmentId: number) {
        return axios.get(DEPARTMENT_API_BASE_URL + '/' + departmentId, { headers: authHeader() });
    }

    /**
     * Update department service
     * @param department contains update information
     * @param departmentId to update department
     * @returns axios put API
     */
    updateDepartment(department: IDepartment, departmentId: number) {
        return axios.put(DEPARTMENT_API_BASE_URL + '/' + departmentId, department, { headers: authHeader() });
    }

    /**
     * Delete department service
     * @param departmentId to delete department
     * @returns axios delete API
     */
    deleteDepartment(departmentId: number) {
        return axios.delete(DEPARTMENT_API_BASE_URL + '/' + departmentId, { headers: authHeader() });
    }

    /**
     * Search departments service
     * @param keyword to search departments
     * @returns 
     */
    searchDepartments(keyword: string) {
        return axios.get(DEPARTMENT_API_BASE_URL + '/search-departments/' + keyword, { headers: authHeader() });
    }

}

export default new DepartmentsService();