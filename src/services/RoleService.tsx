import axios from 'axios';

import { ROLE_API_BASE_URL } from '../constants/http-constant'
import { IRole } from '../interfaces/IRole';
import authHeader from './auth-header';

/**
 * RolesService
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
class RolesService {

    /**
     * Get roles service
     * @returns axios get API
     */
    getRoles() {
        return axios.get(ROLE_API_BASE_URL, { headers: authHeader() });
    }

    /**
     * Create role service
     * @param role contains create information
     * @returns axios post API
     */
    createRoles(role: IRole) {
        return axios.post(ROLE_API_BASE_URL, role, { headers: authHeader() });
    }

    /**
     * Get role by id service
     * @param roleId to get role
     * @returns axios get API
     */
    getRoleById(roleId: number) {
        return axios.get(ROLE_API_BASE_URL + '/' + roleId, { headers: authHeader() });
    }

    /**
     * Update role service
     * @param role contains update information
     * @param roleId to update role
     * @returns axios put API
     */
    updateRole(role: any, roleId: number) {
        return axios.put(ROLE_API_BASE_URL + '/' + roleId, role, { headers: authHeader() });
    }

    /**
     * Delete role service
     * @param roleId to delete role
     * @returns axios delete API
     */
    deleteRole(roleId: number) {
        return axios.delete(ROLE_API_BASE_URL + '/' + roleId, { headers: authHeader() });
    }

    /**
     * Search roles service
     * @param keyword to search roles
     * @returns axios get API
     */
    searchRoles(keyword: string) {
        return axios.get(ROLE_API_BASE_URL + '/search-roles/' + keyword, { headers: authHeader() });
    }

}

export default new RolesService();