import React from 'react'
import { ChangePasswordComponent } from '../components/ChangePassword/ChangePasswordComponent';
import { CreateDepartmentComponent } from '../features/Departments/CreateDepartment/CreateDepartmentComponent';
import { ListDepartmentsComponent } from '../features/Departments/ListDepartment/ListDepartmentComponent';
import { UpdateDepartmentComponent } from '../features/Departments/UpdateDepartment/UpdateDepartmentComponent';
import { CreateEmployeeComponent } from '../features/Employees/CreateEmployee/CreateEmployeeComponent';
import { ListEmployeesComponent } from '../features/Employees/ListEmployees/ListEmployeesComponent';
import { ListEmployeesRoleAndDepartmentComponent } from '../features/Employees/ListEmployees/ListEmployeesRoleAndDepartment';
import { UpdateEmployeeComponent } from '../features/Employees/UpdateEmployee/UpdateEmployeeComponent';
import { UpdateEmployeesRoleAndDepartment } from '../features/Employees/UpdateEmployee/UpdateEmployeeRoleAndDepartmentComponent';
import { ViewEmployeeComponent } from '../features/Employees/ViewEmployee/ViewEmployeeComponent';
import { CreateRoleComponent } from '../features/Roles/CreateRoles/CreateRoleComponent';
import { ListRolesComponent } from '../features/Roles/ListRoles/ListRolesComponent';
import { UpdateRoleComponent } from '../features/Roles/UpdateRole/UpdateRoleComponent';
import { CreateSalaryComponent } from '../features/Salary/CreateSalaryComponent';
import { ListSalaryComponent } from '../features/Salary/ListSalaryComponent';
import { UpdateSalaryComponent } from '../features/Salary/UpdateSalaryComponent';
import { ProfilePage } from '../pages/USER/ProfilePage';
import { IndividualSalariesList } from '../pages/USER/SalaryList';
import AdminRoute from './AdminRouter';

/**
 * Admin component child routes
 */
const routes = [
    //Admin profile page
    {
        path: "/admin/profile",
        exact: true,
        main: () => <ProfilePage/>,
    },
    //Admin update employee component
    {
        path: "/admin/employees/update/:id",
        exact: true,
        main: () => <UpdateEmployeeComponent/>,
    },
    //Admin individual salary list
    {
        path: "/admin/salary/employee/:id",
        exact: true,
        main: () => <IndividualSalariesList/>,
    },
    //List employee component
    {
        path: "/admin/employees",
        exact: true,
        main: () => <ListEmployeesComponent/>,
    },
    //Create employee component
    {
        path: "/admin/employees/add",
        exact: true,
        main: () => <CreateEmployeeComponent/>,
    },
    //View employee component
    {
        path: "/admin/employees/view/:id",
        main: () => <ViewEmployeeComponent/>,
    },
    //List role and department component
    {
        path: "/admin/employees/role-and-department",
        exact: true,
        main: () => <ListEmployeesRoleAndDepartmentComponent/>,
    },
    //Update role and department component
    {
        path: "/admin/employees/update/role-and-department/:email",
        main: () => <UpdateEmployeesRoleAndDepartment/>,
    },
    //List role component
    {
        path: "/admin/roles",
        exact: true,
        main: () => <ListRolesComponent/>,
    },
    //Create role component
    {
        path: "/admin/roles/add",
        exact: true,
        main: () => <CreateRoleComponent/>,
    },
    //Update role component
    {
        path: "/admin/roles/update/:id",
        exact: true,
        main: () => <UpdateRoleComponent/>,
    },
    //List department component
    {
        path: "/admin/departments",
        exact: true,
        main: () => <ListDepartmentsComponent/>,
    },
    //Create department component
    {
        path: "/admin/departments/add",
        main: () => <CreateDepartmentComponent/>,
    },
    //Update department component
    {
        path: "/admin/departments/update/:id",
        exact: true,
        main: () => <UpdateDepartmentComponent/>,
    },
    //List salary component
    {
        path: "/admin/salary",
        exact: true,
        main: () => <ListSalaryComponent/>,
    },
    //Create salary component
    {
        path: "/admin/salary/add/",
        main: () => <CreateSalaryComponent/>,
    },
    //Update salary component
    {
        path: "/admin/salary/update/:email/:createdDate",
        exact: true,
        main: () => <UpdateSalaryComponent/>,
    },
    //Change password component
    {
        path: "/admin/change_password",
        exact: true,
        main: () => <ChangePasswordComponent/>,
    }
];

/**
 * Admin Route contains component that only admin can access
 * @returns Admin Routes contain all components that only admin can access
 */
export const AdminChildComponents = () => {

    var result = null;

    //Create all Admin component child route to route to App.tsx
    result = routes.map((route, index) => {
        return (
            <AdminRoute
                key={index}
                path={route.path}
                exact={route.exact}
                component={route.main}
            />
        );
    });

    return result;
}
