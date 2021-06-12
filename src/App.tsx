import React from 'react';
import { BrowserRouter, BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom'
import './App.css';
import 'antd/dist/antd.css';
import { HomePage } from './pages/HomePage';
import { PageNotFoundComponent } from './components/PageNotFound/PageNotFoundComponent';
import { LoginPage } from './pages/AUTH/LoginPage';
import { ProfilePage } from './pages/USER/ProfilePage';
import { AdminChildComponents } from './routers/AdminChildRoutes';
import { UpdateEmployeeComponent } from './features/Employees/UpdateEmployee/UpdateEmployeeComponent';
import { IndividualSalariesList } from './pages/USER/SalaryList';
import MainDashboard from './pages/ADMIN/MainDashboard';
import { ForgotPasswordPage } from './pages/AUTH/ForgotPasswordPage';
import { ResetPasswordPage } from './pages/AUTH/ResetPasswordPage';
import { ChangePasswordComponent } from './components/ChangePassword/ChangePasswordComponent';
import UserRoute from './routers/UserRouter';

/**
 * App
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
function App() {

    return (
        <div className="App">
            <BrowserRouter>
                <Switch>

                    <Route path='/' exact component={HomePage} />

                    <Route path='/signin' exact component={LoginPage} />
                    <Route path='/signin/:msg' exact component={LoginPage} />
                    <Route path='/forgot_password' exact component={ForgotPasswordPage} />
                    <Route path='/employees/update/:id' exact component={UpdateEmployeeComponent} />
                    <Route path='/reset_password/:token' exact component={ResetPasswordPage} />
                    <UserRoute path='/change_password' exact component={ChangePasswordComponent} />
                    <UserRoute path='/profile' exact component={ProfilePage} />
                    <UserRoute path='/salary/employee/:email' exact component={IndividualSalariesList} />
                   

                    <MainDashboard>
                        {AdminChildComponents()}
                    </MainDashboard>   

                    <Route component={PageNotFoundComponent}/> 

                </Switch>

            </BrowserRouter>
        </div>
    );
}

export default App;
