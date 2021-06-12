import axios from 'axios';

import { SALARY_API_BASE_URL } from '../constants/http-constant'
import { IEmployeeSalary } from '../interfaces/IEmployeeSalary';
import authHeader from './auth-header';

/**
 * SalaryService
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
class SalaryService {

    /**
     * Get salaries service
     * @returns axios get API
     */
    getSalaries() {
        return axios.get(SALARY_API_BASE_URL, { headers: authHeader() });
    }

    /**
     * Get Salaries by email service
     * @param email to get salaries
     * @returns axios get API
     */
    getSalariesByEmail(email: string) {
        return axios.get(SALARY_API_BASE_URL + `/employees/${email}`, { headers: authHeader() });
    }

    /**
     * Create salary service
     * @param email to create salary
     * @param salary contains create information
     * @returns axios post API
     */
    createSalaries(email: string, salary: any) {
        return axios.post(SALARY_API_BASE_URL + "/" + email, salary , { headers: authHeader() });
    }

    /**
     * Delete salary service
     * @param email to delete salary
     * @param createdDate to delete salary
     * @returns axios delete API
     */
    deleteSalary(email: string, createdDate: string) {
        return axios.delete(SALARY_API_BASE_URL + `/${email}/${createdDate}` , { headers: authHeader() });
    }

    /**
     * Get salary by id
     * @param id to get salary
     * @returns axios get API
     */
    getSalaryById(id: number) {
        return axios.get(SALARY_API_BASE_URL + "/" + id , { headers: authHeader() });
    }

    /**
     * Update salary service
     * @param salary contains update information
     * @param email to update salary
     * @param createdDate to update salary
     * @returns axios put API
     */
    updateSalary(salary: IEmployeeSalary, email: string, createdDate: string) {
        return axios.put(SALARY_API_BASE_URL + `/${email}/${createdDate}` , salary, { headers: authHeader() });
    }

    /**
     * Get salaries by id service
     * @param id get salaries by id
     * @returns axios get API
     */
    getSalariesByEmployeeId(id: number) {
        return axios.get(SALARY_API_BASE_URL + "/employee/" + id );
    }

    /**
     * Check exist salary by email and created date service
     * @param email to check exist salary
     * @param createdDate to check exist salary
     * @returns axios get API
     */
    isSalaryExistByEmployeeEmailAndCreatedDate(email: string, createdDate: string) {
        return axios.get(SALARY_API_BASE_URL + `/${email}/${createdDate}` , { headers: authHeader() });
    }

    /**
     * Get salary exist by email and created date service
     * @param email to get salary
     * @param createdDate to get salary
     * @returns axios get API
     */
    getSalaryExistByEmployeeEmailAndCreatedDate(email: string, createdDate: string) {
        return axios.get(SALARY_API_BASE_URL + `/employee/${email}/${createdDate}` , { headers: authHeader() });
    }

}

export default new SalaryService();