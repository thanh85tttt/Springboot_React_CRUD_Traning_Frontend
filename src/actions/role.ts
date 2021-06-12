import {
    CREATE_ROLE,
    DELETE_ROLE,
    IS_FAIL,
    IS_SUCCESS,
    LIST_ROLES,
    UPDATE_ROLE
} from "../constants/types";

import { AxiosError } from "axios";
import RoleService from "../services/RoleService";
import { IRole } from "../interfaces/IRole";
import { UNDEFINED } from "../constants/common-message";

/**
 * Get list roles action
 * @returns getRoles API
 */
export const listRoles = () => (dispatch: any) => {
    return RoleService.getRoles().then(
        (response) => {
            var roles: IRole[] = response.data

            dispatch({
                type: LIST_ROLES,
                payload: roles
            });

            Promise.resolve();
        }
    );
};

/**
 * Process delete role action
 * @param id to delete role
 * @returns deleteRole API
 */
export const deleteRole = (id: number) => (dispatch: any) => {
    return RoleService.deleteRole(id).then(
        (response) => {
            dispatch({
                type: DELETE_ROLE,
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
 * Process create role action
 * @param role contains create information
 * @returns createRoles API
 */
export const createRole = (role: any) => (dispatch: any) => {
    return RoleService.createRoles(role).then(
        (response) => {
            dispatch({
                type: CREATE_ROLE,
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
 * Process update role action
 * @param role contains update information
 * @param id to update role
 * @returns updateRole API
 */
export const updateRole = (role: any, id: number) => (dispatch: any) => {
    return RoleService.updateRole(role, id).then(
        (response) => {
            dispatch({
                type: UPDATE_ROLE,
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
 * Process search roles action
 * @param keyword to search roles
 * @returns searchRoles API
 */
export const searchRoles = (keyword: any) => (dispatch: any) => {

    var regex = /^[\W\s]*$/;
    if (!regex.test(keyword)) {
        return (RoleService.searchRoles(keyword).then((res) => {

            var roles: IRole[] = res.data

            for (let i = 0; i < roles.length; i++) {
                if (!roles[i].role) {
                    roles[i].role = UNDEFINED;
                }
            }

            dispatch({
                type: LIST_ROLES,
                payload: roles
            });

            Promise.resolve();
        })
        );
    } else {
        return (RoleService.getRoles().then((res) => {

            var roles: IRole[] = res.data

            for (let i = 0; i < roles.length; i++) {
                if (!roles[i].role) {
                    roles[i].role = UNDEFINED;
                }

            }
            dispatch({
                type: LIST_ROLES,
                payload: roles
            });

            Promise.resolve();
        })
        );
    }
};


