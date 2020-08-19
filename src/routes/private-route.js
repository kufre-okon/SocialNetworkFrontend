
import React from "react";
import { Route, Redirect } from "react-router-dom";
import authService from '../services/auth.service'

const PrivateRoute = ({ component: Component, ...rest }) => {
    return (
        // props means components passed down to this predicate route component
        <Route  {...rest} render={props => (
            authService.isAuthenticated() ? (
                <Component {...props} />
            ) : (
                    <Redirect to={{
                        pathname: "/signin",
                        state: { from: props.location }
                    }}
                    />
                )
        )}
        />
    );
}

export default PrivateRoute;