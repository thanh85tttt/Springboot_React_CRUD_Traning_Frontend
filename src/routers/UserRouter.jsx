import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { isAuth } from '../helpers/auth';

/**
 * Custom UserRoute require user must login if want to go to these pages
 */
const UserRoute = ({ component: Component, ...rest }) => (
    <Route
        {...rest}
        render={props =>
            isAuth() ? (
                <Component {...props} />
            ) : (
                <Redirect
                    to={{
                        pathname: `/signin/${"You haven't sign in yet!"}`,
                        state: { from: props.location }
                    }}
                />
            )
        }
    ></Route>
);

export default UserRoute;