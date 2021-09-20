import React from "react";
import { Route, Redirect } from "react-router-dom"
import auth from "../authentication/auth";

export const Admin = ({component: Component, ...rest}) => {
    return(
        <>
            <Route 
                {...rest}
                render={props => {
                    if (auth.isAuthenticate()) {
                        return <Component {...props} />
                    } else {
                        return <Redirect to="/admin/login/" /> 
                    }
                }}
            />
        </>
    )
}