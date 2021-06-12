/* eslint-disable import/no-anonymous-default-export */
import { CREATE_DEPARTMENT, DELETE_DEPARTMENT, LIST_DEPARTMENTS, UPDATE_DEPARTMENT } from "../constants/types";

const initialState: any[] = [];

/**
 * Reducer to execute action type and load new state of departments
 * @param state
 * @param action 
 * @returns 
 */
export default function (state = initialState, action: any) {
    const { type, payload } = action;

    switch (type) {
        case LIST_DEPARTMENTS:
            return payload;
        case DELETE_DEPARTMENT:
            return state.filter(({ id }) => id !== payload.id);
        case CREATE_DEPARTMENT:
            return state;
        case UPDATE_DEPARTMENT:
            return state;
        default:
            return state;
    }
}