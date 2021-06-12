/* eslint-disable import/no-anonymous-default-export */
import {
    CREATE_ROLE,
    DELETE_ROLE,
    LIST_ROLES,
    UPDATE_ROLE
} from "../constants/types";

const initialState: any[] = [];

/**
 * Reducer to execute action type and load new state of roles
 * @param state
 * @param action 
 * @returns 
 */
export default function (state = initialState, action: any) {
    const { type, payload } = action;

    switch (type) {
        case LIST_ROLES:
            return payload;
        case DELETE_ROLE:
            return state.filter(({ id }) => id !== payload.id);
        case CREATE_ROLE:
            return state;
        case UPDATE_ROLE:
            return state;
        default:
            return state;
    }
}