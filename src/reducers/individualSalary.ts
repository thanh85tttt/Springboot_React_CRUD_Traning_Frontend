/* eslint-disable import/no-anonymous-default-export */
import {
    LIST_SALARIES_BY_EMAIL,
    DELETE_SALARY_INDIVIDUAL,
    UPDATE_SALARY_INDIVIDUAL
} from "../constants/types";
import { IEmployeeSalary } from "../interfaces/IEmployeeSalary";

const initialState: any[] = [];

/**
 * Reducer to execute action type and load new state of individual salaries of an employee
 * @param state
 * @param action 
 * @returns 
 */
export default function (state = initialState, action: any) {
    const { type, payload } = action;

    switch (type) {
        case LIST_SALARIES_BY_EMAIL:
            return payload;
        case DELETE_SALARY_INDIVIDUAL:
            var salaries: IEmployeeSalary[] = state;

            for (let i = 0; i < salaries.length; i++) {
                if (salaries[i].email == payload.email &&
                    salaries[i].createdDate == payload.createdDate) {
                    salaries.splice(i, 1);
                }
            }
            console.log(salaries);
            return salaries;
        case UPDATE_SALARY_INDIVIDUAL:
            return state;
        default:
            return state;
    }
}