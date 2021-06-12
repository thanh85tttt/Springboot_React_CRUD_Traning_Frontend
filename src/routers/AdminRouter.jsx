import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { isAuth } from '../helpers/auth';

/**
 * Custom AdminRoute to authorize all router that only admin can use 
 */
const AdminRoute = ({ component: Component, ...rest }) => (
    <Route
        {...rest}
        render={props =>
            isAuth() && isAuth().roles[0] === 'ROLE_ADMIN' ? (
                <Component {...props} />
            ) : (
                <Redirect
                    to={{
                        pathname: `/signin/${"You do not have admin permission!"}`,
                        state: { from: props.location }
                    }}
                />
            )
        }
    ></Route>
);

export default AdminRoute;