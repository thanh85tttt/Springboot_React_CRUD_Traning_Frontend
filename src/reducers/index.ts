import { combineReducers } from "redux";
import auth from "./auth";
import isSuccess from "./isSuccess"
import isError from "./isError"
import employees from "./employee"
import roleAndDepartment from './roleAndDepartment'
import roles from './role'
import departments from './department'
import salaries from './salary'
import salariesIndividual from './individualSalary'

/**
 * Root reducer contains all reducers
 */
export default combineReducers({
  auth,
  isSuccess,
  isError,
  employees,
  roleAndDepartment,
  roles,
  departments,
  salaries,
  salariesIndividual
});