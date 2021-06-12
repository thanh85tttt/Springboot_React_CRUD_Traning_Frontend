/* eslint-disable import/no-anonymous-default-export */
import {
    LIST_ROLE_DEPARTMENT, UPDATE_ROLE_DEPARTMENT,
} from "../constants/types";

const initialState: any[] = [];

/**
 * Reducer to execute action type and load new state about current role and department of an employee
 * @param state
 * @param action 
 * @returns 
 */
export default function (state = initialState, action: any) {
    const { type, payload } = action;

    switch (type) {
        case LIST_ROLE_DEPARTMENT:
            return payload;
        case UPDATE_ROLE_DEPARTMENT:
            return state;
        default:
            return state;
    }
}