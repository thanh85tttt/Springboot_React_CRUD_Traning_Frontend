/* eslint-disable import/no-anonymous-default-export */
import {
    CREATE_EMPLOYEE,
    DELETE_EMPLOYEE,
    LIST_EMPLOYEES,
    UPDATE_EMPLOYEE
} from "../constants/types";

const initialState: any[] = [];

/**
 * Reducer to execute action type and load new state of employees
 * @param state
 * @param action 
 * @returns 
 */
export default function (state = initialState, action: any) {
    const { type, payload } = action;

    switch (type) {
        case LIST_EMPLOYEES:
            return payload;
        case DELETE_EMPLOYEE:
            return state.filter(({ id }) => id !== payload.id);
        case UPDATE_EMPLOYEE:
            return state;
        case CREATE_EMPLOYEE:
            return state;
        default:
            return state;
    }
}