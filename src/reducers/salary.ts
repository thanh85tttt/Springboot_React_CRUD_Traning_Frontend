/* eslint-disable import/no-anonymous-default-export */
import {
    LIST_SALARIES,
    DELETE_SALARY,
    CREATE_SALARY,
    UPDATE_SALARY
} from "../constants/types";
import { IEmployeeSalary } from "../interfaces/IEmployeeSalary";

const initialState: any[] = [];

/**
 * Reducer to execute action type and load new state of salary
 * @param state
 * @param action 
 * @returns 
 */
export default function (state = initialState, action: any) {
    const { type, payload } = action;

    switch (type) {
        case LIST_SALARIES:
            return payload;
        case DELETE_SALARY:
            var salaries: IEmployeeSalary[] = state;
            var salariesLength = salaries.length;
            for (let i = 0; i < salariesLength; i++) {
                if (salaries[i].email == payload.email &&
                    salaries[i].createdDate == payload.createdDate) {
                    salaries.splice(i, 1);
                }
            }
            return salaries;
        case CREATE_SALARY:
            return state;
        case UPDATE_SALARY:
            return state;
        default:
            return state;
    }
}